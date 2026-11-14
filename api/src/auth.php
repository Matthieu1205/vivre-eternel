<?php
// Connexion au backoffice : jetons aléatoires envoyés dans l'en-tête X-Auth-Token.
// Seule l'empreinte SHA-256 du jeton est stockée en base.
declare(strict_types=1);

const MIN_PASSWORD_LENGTH = 10;

function auth_token(): ?string
{
    $token = $_SERVER['HTTP_X_AUTH_TOKEN'] ?? '';
    return preg_match('/^[a-f0-9]{64}$/', $token) ? $token : null;
}

/** Renvoie l'admin connecté, ou refuse la requête (401). */
function require_admin(): array
{
    $token = auth_token();
    if ($token !== null) {
        $admin = query(
            'SELECT a.id, a.email FROM admin_sessions s JOIN admins a ON a.id = s.admin_id
             WHERE s.token_hash = ? AND s.expires_at > NOW()',
            [hash('sha256', $token)]
        )->fetch();
        if ($admin) {
            return $admin;
        }
    }
    throw new HttpError(401, 'Connexion requise.');
}

function open_session(int $adminId): string
{
    $token = bin2hex(random_bytes(32));
    $days = max(1, (int) (config('session_days') ?? 7));
    query(
        'INSERT INTO admin_sessions (token_hash, admin_id, expires_at) VALUES (?, ?, NOW() + INTERVAL ? DAY)',
        [hash('sha256', $token), $adminId, $days]
    );
    query('DELETE FROM admin_sessions WHERE expires_at < NOW()');
    return $token;
}

function auth_login(): never
{
    rate_limit('login', 8, 900);
    $body = request_body();
    $email = mb_strtolower(trim((string) ($body['email'] ?? '')));
    $password = (string) ($body['password'] ?? '');

    $admin = query('SELECT id, email, password_hash FROM admins WHERE email = ?', [$email])->fetch();
    if (!$admin || !password_verify($password, $admin['password_hash'])) {
        throw new HttpError(401, 'Email ou mot de passe incorrect.');
    }
    if (password_needs_rehash($admin['password_hash'], PASSWORD_DEFAULT)) {
        query('UPDATE admins SET password_hash = ? WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $admin['id']]);
    }
    rate_limit_reset('login');
    send_json(['token' => open_session((int) $admin['id']), 'email' => $admin['email']]);
}

function auth_logout(): never
{
    $token = auth_token();
    if ($token !== null) {
        query('DELETE FROM admin_sessions WHERE token_hash = ?', [hash('sha256', $token)]);
    }
    send_json(['ok' => true]);
}

function auth_me(): never
{
    $admin = require_admin();
    send_json(['email' => $admin['email']]);
}

/** Indique si le premier compte admin reste à créer depuis la page de connexion. */
function auth_status(): never
{
    $noAdmin = (int) query('SELECT COUNT(*) FROM admins')->fetchColumn() === 0;
    send_json(['needs_setup' => $noAdmin && (string) config('setup_token') !== '']);
}

/** Crée le premier admin. Possible une seule fois, avec le code setup_token de config.php. */
function auth_setup(): never
{
    rate_limit('setup', 5, 3600);
    $body = request_body();
    $expected = (string) config('setup_token');
    if ($expected === '' || !hash_equals($expected, (string) ($body['setup_token'] ?? ''))) {
        throw new HttpError(403, 'Code d’installation incorrect.');
    }
    if ((int) query('SELECT COUNT(*) FROM admins')->fetchColumn() > 0) {
        throw new HttpError(409, 'Un compte admin existe déjà.');
    }
    $id = create_admin((string) ($body['email'] ?? ''), (string) ($body['password'] ?? ''));
    send_json(['token' => open_session($id), 'email' => mb_strtolower(trim((string) $body['email']))], 201);
}

/** Crée ou met à jour un compte admin. Utilisé par l'installation et par tools/create-admin.php. */
function create_admin(string $email, string $password): int
{
    $email = mb_strtolower(trim($email));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new HttpError(422, 'Adresse email invalide.');
    }
    if (mb_strlen($password) < MIN_PASSWORD_LENGTH) {
        throw new HttpError(422, 'Le mot de passe doit contenir au moins ' . MIN_PASSWORD_LENGTH . ' caractères.');
    }
    query(
        'INSERT INTO admins (email, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)',
        [$email, password_hash($password, PASSWORD_DEFAULT)]
    );
    return (int) query('SELECT id FROM admins WHERE email = ?', [$email])->fetchColumn();
}

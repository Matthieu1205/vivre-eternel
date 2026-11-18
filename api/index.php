<?php
// ════════════════════════════════════════════════════════════════════
//  API du site Vivre pour l'Éternel — point d'entrée unique.
//
//  Routes publiques
//    GET    /public/{table}                 contenu du site (programmes, enseignements…)
//    GET    /public/contenus                textes des pages modifiés dans le backoffice
//    POST   /forms/{table}                  envoi d'un formulaire
//  Connexion
//    POST   /auth/login | /auth/logout      GET /auth/me | /auth/status   POST /auth/setup
//  Backoffice (en-tête X-Auth-Token)
//    GET    /admin/{table}[?champ=valeur]   GET /admin/{table}/count[?champ=valeur]
//    POST   /admin/{table}                  PUT /admin/{table}/{id}   DELETE /admin/{table}/{id}
//    PUT    /admin/contenus/{clé}           DELETE /admin/contenus/{clé} (rétablir le texte d'origine)
//    GET    /admin/media/{espace}           POST /admin/media/{espace}   DELETE /admin/media/{espace}/{fichier}
// ════════════════════════════════════════════════════════════════════
declare(strict_types=1);

require __DIR__ . '/src/bootstrap.php';
require __DIR__ . '/src/resources.php';
require __DIR__ . '/src/auth.php';
require __DIR__ . '/src/handlers.php';
require __DIR__ . '/src/media.php';

function current_route(): array
{
    // ?route=/public/programmes fonctionne même si la réécriture d'URL est désactivée.
    $path = $_GET['route'] ?? null;
    if ($path === null) {
        $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
        // Dossier de l'API dans l'URL (ex. /api si elle est dans domaine.fr/api/).
        // SCRIPT_NAME n'est fiable que s'il désigne bien index.php.
        $script = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
        $base = str_ends_with($script, '/index.php') ? rtrim(dirname($script), '/') : '';
        if ($base !== '' && str_starts_with($path, $base . '/')) {
            $path = substr($path, strlen($base));
        }
        $path = preg_replace('#^/index\.php#', '', $path);
    }
    $segments = array_values(array_filter(explode('/', rawurldecode((string) $path)), 'strlen'));
    return [$_SERVER['REQUEST_METHOD'] ?? 'GET', $segments];
}

function route(string $method, array $s): never
{
    $id = fn(string $v): int => ctype_digit($v) ? (int) $v : throw new HttpError(404, 'Identifiant invalide.');

    switch (true) {
        case $s === [] && $method === 'GET':
            send_json(['name' => 'API Vivre pour l’Éternel', 'ok' => true]);
        case $s === ['health'] && $method === 'GET':
            db()->query('SELECT 1');
            send_json(['ok' => true, 'database' => 'ok']);

        case $s === ['public', 'contenus'] && $method === 'GET':
            public_contenus();
        case count($s) === 3 && $s[0] === 'admin' && $s[1] === 'contenus' && $method === 'PUT':
            admin_contenu_save($s[2]);
        case count($s) === 3 && $s[0] === 'admin' && $s[1] === 'contenus' && $method === 'DELETE':
            admin_contenu_reset($s[2]);

        case count($s) === 2 && $s[0] === 'public' && $method === 'GET':
            public_list($s[1]);
        case count($s) === 2 && $s[0] === 'forms' && $method === 'POST':
            form_submit($s[1]);

        case $s === ['auth', 'login'] && $method === 'POST':  auth_login();
        case $s === ['auth', 'logout'] && $method === 'POST': auth_logout();
        case $s === ['auth', 'me'] && $method === 'GET':      auth_me();
        case $s === ['auth', 'status'] && $method === 'GET':  auth_status();
        case $s === ['auth', 'setup'] && $method === 'POST':  auth_setup();

        case count($s) === 3 && $s[0] === 'admin' && $s[1] === 'media' && $method === 'GET':
            media_list($s[2]);
        case count($s) === 3 && $s[0] === 'admin' && $s[1] === 'media' && $method === 'POST':
            media_upload($s[2]);
        case count($s) === 4 && $s[0] === 'admin' && $s[1] === 'media' && $method === 'DELETE':
            media_delete($s[2], $s[3]);

        case count($s) === 2 && $s[0] === 'admin' && $method === 'GET':  admin_list($s[1]);
        case count($s) === 2 && $s[0] === 'admin' && $method === 'POST': admin_create($s[1]);
        case count($s) === 3 && $s[0] === 'admin' && $s[2] === 'count' && $method === 'GET':
            admin_count($s[1]);
        case count($s) === 3 && $s[0] === 'admin' && $method === 'PUT':    admin_update($s[1], $id($s[2]));
        case count($s) === 3 && $s[0] === 'admin' && $method === 'DELETE': admin_delete($s[1], $id($s[2]));
    }
    throw new HttpError(404, 'Route inconnue.');
}

try {
    handle_cors();
    [$method, $segments] = current_route();
    route($method, $segments);
} catch (HttpError $e) {
    send_json(['error' => $e->getMessage()], $e->status);
} catch (PDOException $e) {
    error_log('[VPE API] ' . $e->getMessage());
    if (($e->errorInfo[1] ?? null) === 1062) {
        send_json(['error' => 'Cette valeur est déjà utilisée (identifiant d’URL ou email en double).'], 409);
    }
    send_json(['error' => 'Erreur de base de données.'], 500);
} catch (Throwable $e) {
    error_log('[VPE API] ' . $e);
    send_json(['error' => 'Erreur interne du serveur.'], 500);
}

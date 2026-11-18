<?php
// Fondations de l'API : configuration, base de données, réponses JSON, CORS,
// limitation des envois. Ce dossier n'est jamais servi directement (.htaccess).
declare(strict_types=1);

final class HttpError extends Exception
{
    public function __construct(public readonly int $status, string $message)
    {
        parent::__construct($message);
    }
}

function config(?string $key = null): mixed
{
    static $config = null;
    if ($config === null) {
        $file = __DIR__ . '/../config.php';
        if (!is_file($file)) {
            throw new HttpError(500, 'API non configurée : copiez config.example.php en config.php.');
        }
        $config = require $file;
    }
    return $key === null ? $config : ($config[$key] ?? null);
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $c = config('db');
        $pdo = new PDO(
            "mysql:host={$c['host']};dbname={$c['name']};charset=utf8mb4",
            $c['user'],
            $c['password'],
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::ATTR_STRINGIFY_FETCHES  => false,
            ]
        );
        // Toutes les dates sont stockées et renvoyées en UTC.
        $pdo->exec("SET time_zone = '+00:00'");
        ensure_schema($pdo);
    }
    return $pdo;
}

/**
 * Crée les tables ajoutées après l'installation initiale, sans passer par phpMyAdmin.
 * Un fichier témoin évite de refaire la vérification à chaque requête.
 */
const SCHEMA_VERSION = 2;

function ensure_schema(PDO $pdo): void
{
    $marker = __DIR__ . '/../uploads/.schema-' . SCHEMA_VERSION;
    if (is_file($marker)) {
        return;
    }
    $pdo->exec("CREATE TABLE IF NOT EXISTS contenus (
        cle VARCHAR(100) PRIMARY KEY,
        valeur MEDIUMTEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $pdo->exec("CREATE TABLE IF NOT EXISTS temoignages_video (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(160) NOT NULL,
        categorie VARCHAR(60) NULL,
        description TEXT NULL,
        url VARCHAR(500) NULL,
        duree VARCHAR(60) NULL,
        ordre INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    @file_put_contents($marker, (string) SCHEMA_VERSION);
}

/** Exécute une requête préparée et renvoie le PDOStatement. */
function query(string $sql, array $params = []): PDOStatement
{
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    return $stmt;
}

function send_json(mixed $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function request_body(): array
{
    $raw = file_get_contents('php://input') ?: '';
    if ($raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        throw new HttpError(400, 'Corps de requête JSON invalide.');
    }
    return $data;
}

/** Autorise les appels du site (domaine différent) et répond aux pré-requêtes OPTIONS. */
function handle_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = config('allowed_origins') ?? [];
    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token');
        header('Access-Control-Max-Age: 86400');
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function client_fingerprint(): string
{
    return hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . config('secret'));
}

/**
 * Refuse la requête si cette adresse IP a déjà fait $max fois l'action
 * pendant les $seconds dernières secondes ; sinon enregistre la tentative.
 */
function rate_limit(string $action, int $max, int $seconds): void
{
    $ip = client_fingerprint();
    $count = (int) query(
        'SELECT COUNT(*) FROM rate_limits WHERE action = ? AND ip_hash = ? AND created_at > NOW() - INTERVAL ? SECOND',
        [$action, $ip, $seconds]
    )->fetchColumn();
    if ($count >= $max) {
        throw new HttpError(429, 'Trop de tentatives. Merci de réessayer un peu plus tard.');
    }
    query('INSERT INTO rate_limits (action, ip_hash) VALUES (?, ?)', [$action, $ip]);
    if (random_int(1, 50) === 1) {
        query('DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL 2 DAY');
    }
}

/** Efface les tentatives enregistrées (ex. après une connexion réussie). */
function rate_limit_reset(string $action): void
{
    query('DELETE FROM rate_limits WHERE action = ? AND ip_hash = ?', [$action, client_fingerprint()]);
}

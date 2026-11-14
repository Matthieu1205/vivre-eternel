<?php
// Médiathèque : fichiers envoyés depuis le backoffice, rangés dans uploads/<espace>/.
// Les fichiers sont publics (liens utilisés sur le site) ; l'envoi et la
// suppression demandent une connexion admin.
declare(strict_types=1);

const IMAGE_TYPES = ['jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp', 'gif' => 'image/gif'];

/** Espaces de stockage : extensions et types autorisés, taille maximale. SVG exclu (peut contenir du script). */
function buckets(): array
{
    return [
        'images'    => ['types' => IMAGE_TYPES, 'max_mb' => 8],
        'logos'     => ['types' => IMAGE_TYPES, 'max_mb' => 4],
        'audio'     => ['types' => ['mp3' => 'audio/mpeg', 'm4a' => 'audio/mp4', 'ogg' => 'audio/ogg', 'wav' => 'audio/wav'], 'max_mb' => 100],
        'documents' => ['types' => [
            'pdf'  => 'application/pdf',
            'doc'  => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ], 'max_mb' => 20],
    ];
}

function bucket_dir(string $bucket): string
{
    if (!isset(buckets()[$bucket])) {
        throw new HttpError(404, 'Espace de stockage inconnu.');
    }
    $dir = __DIR__ . '/../uploads/' . $bucket;
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        throw new HttpError(500, 'Impossible de créer le dossier de stockage.');
    }
    return $dir;
}

function file_url(string $bucket, string $name): string
{
    return rtrim((string) config('public_url'), '/') . "/uploads/$bucket/" . rawurlencode($name);
}

function describe_file(string $bucket, string $path): array
{
    $name = basename($path);
    return [
        'name' => $name,
        'url' => file_url($bucket, $name),
        'size' => filesize($path),
        'created_at' => gmdate('Y-m-d\TH:i:s\Z', filemtime($path)),
    ];
}

function media_list(string $bucket): never
{
    require_admin();
    $dir = bucket_dir($bucket);
    $files = array_filter(glob($dir . '/*') ?: [], fn($p) => is_file($p) && !str_starts_with(basename($p), '.'));
    usort($files, fn($a, $b) => filemtime($b) <=> filemtime($a));
    send_json(array_map(fn($p) => describe_file($bucket, $p), $files));
}

function media_upload(string $bucket): never
{
    require_admin();
    $dir = bucket_dir($bucket);
    $rules = buckets()[$bucket];
    $file = $_FILES['file'] ?? null;

    if (!$file || !is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        $code = is_array($file) ? (int) $file['error'] : UPLOAD_ERR_NO_FILE;
        throw new HttpError(422, match ($code) {
            UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'Fichier trop lourd pour le serveur (voir upload_max_filesize dans cPanel).',
            UPLOAD_ERR_NO_FILE => 'Aucun fichier reçu.',
            default => 'L’envoi du fichier a échoué.',
        });
    }
    if (!is_uploaded_file($file['tmp_name'])) {
        throw new HttpError(400, 'Envoi invalide.');
    }
    if ($file['size'] > $rules['max_mb'] * 1024 * 1024) {
        throw new HttpError(422, "Fichier trop lourd ({$rules['max_mb']} Mo maximum).");
    }

    $ext = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
    if (!isset($rules['types'][$ext])) {
        throw new HttpError(422, 'Format non autorisé. Formats acceptés : ' . implode(', ', array_keys($rules['types'])) . '.');
    }
    // Vérifie le contenu réel du fichier, pas seulement son extension.
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']) ?: '';
    $expected = $rules['types'][$ext];
    $sameFamily = explode('/', $mime)[0] === explode('/', $expected)[0];
    $isOfficeZip = $ext === 'docx' && $mime === 'application/zip';
    if ($mime !== $expected && !$isOfficeZip && !($sameFamily && $bucket === 'audio')) {
        throw new HttpError(422, 'Le contenu du fichier ne correspond pas à son extension.');
    }

    $base = preg_replace('/[^a-zA-Z0-9_-]+/', '_', pathinfo((string) $file['name'], PATHINFO_FILENAME)) ?: 'fichier';
    $name = time() . '_' . bin2hex(random_bytes(3)) . '_' . substr($base, 0, 60) . '.' . $ext;
    $target = "$dir/$name";
    if (!move_uploaded_file($file['tmp_name'], $target)) {
        throw new HttpError(500, 'Impossible d’enregistrer le fichier.');
    }
    chmod($target, 0644);
    send_json(describe_file($bucket, $target), 201);
}

function media_delete(string $bucket, string $name): never
{
    require_admin();
    $dir = bucket_dir($bucket);
    if (!preg_match('/^[a-zA-Z0-9_.-]+$/', $name) || str_starts_with($name, '.')) {
        throw new HttpError(400, 'Nom de fichier invalide.');
    }
    $path = "$dir/$name";
    if (is_file($path)) {
        unlink($path);
    }
    send_json(['ok' => true]);
}

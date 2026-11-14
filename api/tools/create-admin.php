<?php
// Crée un compte admin, ou change son mot de passe s'il existe déjà.
// À lancer depuis le Terminal de cPanel (dans le dossier de l'API) :
//   php tools/create-admin.php admin@exemple.com
// Le mot de passe est demandé ensuite (10 caractères minimum).
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit;
}

require __DIR__ . '/../src/bootstrap.php';
require __DIR__ . '/../src/auth.php';

$email = $argv[1] ?? '';
if ($email === '') {
    fwrite(STDERR, "Usage : php tools/create-admin.php email@exemple.com [mot-de-passe]\n");
    exit(1);
}

$password = $argv[2] ?? null;
if ($password === null) {
    echo 'Mot de passe : ';
    $password = rtrim((string) fgets(STDIN), "\r\n");
}

try {
    create_admin($email, $password);
    echo "Compte admin prêt : $email\n";
} catch (HttpError $e) {
    fwrite(STDERR, $e->getMessage() . "\n");
    exit(1);
}

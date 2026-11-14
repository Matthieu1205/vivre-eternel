<?php
// ════════════════════════════════════════════════════════════════════
//  Configuration de l'API — copiez ce fichier en « config.php »
//  (dans le même dossier) et remplissez vos valeurs.
//  config.php n'est jamais servi au navigateur (voir .htaccess) et
//  n'est pas versionné dans Git.
// ════════════════════════════════════════════════════════════════════

return [
    // Base MySQL / MariaDB créée dans cPanel → « Bases de données MySQL ».
    // Sur o2switch, le nom de la base et de l'utilisateur commencent par votre identifiant cPanel.
    'db' => [
        'host'     => 'localhost',
        'name'     => 'identifiant_vpe',
        'user'     => 'identifiant_vpe',
        'password' => 'MOT-DE-PASSE-DE-LA-BASE',
    ],

    // Adresse publique de ce dossier API, sans barre finale.
    // Sert à construire les liens des fichiers envoyés dans la Médiathèque.
    'public_url' => 'https://api.votre-domaine.fr',

    // Sites autorisés à appeler l'API depuis le navigateur (CORS).
    // Mettez l'adresse du site en ligne, et celle du serveur de développement.
    'allowed_origins' => [
        'https://votre-domaine.fr',
        'https://www.votre-domaine.fr',
        'http://localhost:5173',
    ],

    // Longue chaîne aléatoire, propre à votre installation (au moins 32 caractères).
    // Sert à anonymiser les adresses IP enregistrées pour la limitation des envois.
    'secret' => 'REMPLACEZ-MOI-PAR-UNE-LONGUE-CHAINE-ALEATOIRE',

    // Code à usage unique pour créer le premier compte admin depuis la page /admin.
    // Ne fonctionne que tant qu'aucun admin n'existe. Videz-le ('') une fois le compte créé.
    'setup_token' => 'REMPLACEZ-MOI-AUSSI',

    // Durée de validité d'une connexion au backoffice, en jours.
    'session_days' => 7,
];

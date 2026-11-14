<?php
// Description des tables exposées par l'API : champs modifiables, types,
// règles de validation. Seuls les champs listés ici peuvent être lus ou écrits.
declare(strict_types=1);

function str(int $max, bool $required = false): array { return ['type' => 'str', 'max' => $max, 'required' => $required]; }
function txt(int $max = 20000, bool $required = false, int $min = 0): array { return ['type' => 'str', 'max' => $max, 'required' => $required, 'min' => $min]; }
function email_field(bool $required = false): array { return ['type' => 'email', 'max' => 190, 'required' => $required]; }
function int_field(): array { return ['type' => 'int']; }
function bool_field(): array { return ['type' => 'bool']; }
function date_field(bool $required = false): array { return ['type' => 'date', 'required' => $required]; }
function enum_field(array $values, bool $required = false): array { return ['type' => 'enum', 'values' => $values, 'required' => $required]; }

/**
 * fields       : champs modifiables (id et created_at sont gérés par la base)
 * admin_order  : tri de la liste dans le backoffice
 * form         : champs acceptés depuis le formulaire public (sinon pas de formulaire)
 * form_limit   : [nombre d'envois, fenêtre en secondes] par adresse IP
 */
function resources(): array
{
    return [
        'programmes' => [
            'admin_order' => 'ordre ASC, id ASC',
            'fields' => [
                'slug' => str(80), 'icon' => str(80), 'label' => str(200, true), 'horaire' => str(200),
                'description' => txt(), 'detail' => txt(), 'points' => txt(), 'verse_text' => txt(),
                'verse_ref' => str(120), 'banner_url' => str(500), 'logo_url' => str(500), 'ordre' => int_field(),
            ],
        ],
        'enseignements' => [
            'admin_order' => 'created_at DESC, id DESC',
            'fields' => [
                'type' => enum_field(['audio', 'video', 'article', 'verset'], true), 'titre' => str(255, true),
                'auteur' => str(160), 'categorie' => str(120), 'description' => txt(), 'url' => str(500),
                'date' => date_field(), 'duree' => str(60), 'lieu' => str(160),
            ],
        ],
        'activites' => [
            'admin_order' => 'created_at DESC, id DESC',
            'fields' => [
                'categorie' => enum_field(['terrain', 'social', 'evenement', 'galerie'], true), 'titre' => str(255, true),
                'description' => txt(), 'date' => str(120), 'heure' => str(120), 'lieu' => str(200), 'type' => str(120),
                'icon' => str(80), 'participants' => int_field(), 'ames' => int_field(), 'beneficiaires' => int_field(),
                'nb_photos' => int_field(), 'image_url' => str(500),
            ],
        ],
        'partenaires' => [
            'admin_order' => 'ordre ASC, id ASC',
            'fields' => [
                'slug' => str(80), 'nom' => str(200, true), 'icon' => str(80), 'secteur' => str(160),
                'description' => txt(), 'mission' => txt(), 'services' => txt(), 'verse_text' => txt(),
                'verse_ref' => str(120), 'collab' => txt(), 'couleur' => str(20), 'site_url' => str(500),
                'logo_url' => str(500), 'contact' => str(200), 'ordre' => int_field(),
            ],
        ],
        'annonces' => [
            'admin_order' => 'date_debut DESC, id DESC',
            'fields' => [
                'titre' => str(255, true), 'message' => txt(), 'date_debut' => date_field(true),
                'date_fin' => date_field(true), 'image_url' => str(500),
            ],
        ],
        'temoignages' => [
            'admin_order' => 'created_at DESC, id DESC',
            'fields' => [
                'nom' => str(120), 'email' => email_field(), 'lieu' => str(120), 'categorie' => str(60),
                'contenu' => txt(5000, true, 10), 'publier' => bool_field(),
                'statut' => enum_field(['en_attente', 'approuve', 'refuse']),
            ],
            'form' => ['nom', 'email', 'lieu', 'categorie', 'contenu', 'publier'],
            'form_limit' => [5, 3600],
        ],
        'messages_contact' => [
            'admin_order' => 'created_at DESC, id DESC',
            'fields' => [
                'nom' => str(120, true), 'email' => email_field(true), 'sujet' => str(60),
                'message' => txt(5000, true, 2), 'traite' => bool_field(),
            ],
            'form' => ['nom', 'email', 'sujet', 'message'],
            'form_limit' => [5, 600],
        ],
        'demandes_priere' => [
            'admin_order' => 'created_at DESC, id DESC',
            'fields' => [
                'nom' => str(120), 'email' => email_field(), 'categorie' => str(60),
                'priere' => txt(5000, true, 2), 'confidentiel' => bool_field(), 'traite' => bool_field(),
            ],
            'form' => ['nom', 'email', 'categorie', 'priere', 'confidentiel'],
            'form_limit' => [5, 600],
        ],
        'demandes_partenariat' => [
            'admin_order' => 'created_at DESC, id DESC',
            'fields' => [
                'nom' => str(120, true), 'organisation' => str(160), 'email' => email_field(true),
                'telephone' => str(40), 'type' => str(40), 'message' => txt(5000), 'traite' => bool_field(),
            ],
            'form' => ['nom', 'organisation', 'email', 'telephone', 'type', 'message'],
            'form_limit' => [5, 600],
        ],
        'newsletter' => [
            'admin_order' => 'created_at DESC, id DESC',
            'fields' => ['email' => email_field(true)],
            'form' => ['email'],
            'form_limit' => [5, 3600],
        ],
    ];
}

function resource(string $name): array
{
    $all = resources();
    if (!isset($all[$name])) {
        throw new HttpError(404, 'Ressource inconnue.');
    }
    return $all[$name];
}

/**
 * Valide et convertit les champs reçus.
 * $partial = true pour une modification : seuls les champs envoyés sont traités.
 */
function validate(array $fields, array $input, bool $partial): array
{
    $out = [];
    foreach ($fields as $name => $rule) {
        if (!array_key_exists($name, $input)) {
            if (!$partial && ($rule['required'] ?? false)) {
                throw new HttpError(422, "Le champ « $name » est obligatoire.");
            }
            continue;
        }
        $value = $input[$name];
        if (is_string($value)) {
            $value = trim($value);
        }
        if ($value === '' || $value === null) {
            if ($rule['required'] ?? false) {
                throw new HttpError(422, "Le champ « $name » est obligatoire.");
            }
            $out[$name] = $rule['type'] === 'bool' ? 0 : null;
            continue;
        }
        $out[$name] = match ($rule['type']) {
            'str', 'email' => validate_string($name, $value, $rule),
            'int' => filter_var($value, FILTER_VALIDATE_INT) !== false
                ? (int) $value : throw new HttpError(422, "Le champ « $name » doit être un nombre entier."),
            'bool' => filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 1 : 0,
            'date' => is_string($value) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $value) && checkdate((int) substr($value, 5, 2), (int) substr($value, 8, 2), (int) substr($value, 0, 4))
                ? $value : throw new HttpError(422, "Le champ « $name » doit être une date (AAAA-MM-JJ)."),
            'enum' => in_array($value, $rule['values'], true)
                ? $value : throw new HttpError(422, "Valeur non autorisée pour « $name »."),
        };
    }
    return $out;
}

function validate_string(string $name, mixed $value, array $rule): string
{
    if (!is_string($value) && !is_int($value) && !is_float($value)) {
        throw new HttpError(422, "Le champ « $name » doit être du texte.");
    }
    $value = (string) $value;
    $len = mb_strlen($value);
    if ($len > $rule['max']) {
        throw new HttpError(422, "Le champ « $name » est trop long ({$rule['max']} caractères maximum).");
    }
    if ($len < ($rule['min'] ?? 0)) {
        throw new HttpError(422, "Le champ « $name » est trop court.");
    }
    if ($rule['type'] === 'email') {
        $value = mb_strtolower($value);
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new HttpError(422, 'Adresse email invalide.');
        }
    }
    return $value;
}

/** Met en forme une ligne pour la réponse JSON : booléens et dates ISO en UTC. */
function present(array $row, array $fields = []): array
{
    foreach ($row as $key => $value) {
        if ($value === null) {
            continue;
        }
        if (($fields[$key]['type'] ?? null) === 'bool') {
            $row[$key] = (bool) $value;
        } elseif ($key === 'created_at' || $key === 'expires_at') {
            $row[$key] = str_replace(' ', 'T', (string) $value) . 'Z';
        }
    }
    return $row;
}

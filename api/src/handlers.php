<?php
// Contenu public, formulaires et gestion des tables dans le backoffice.
declare(strict_types=1);

// ─────────────────────────────────────────────────────────────
// Contenu public (lecture seule, sans connexion)
// ─────────────────────────────────────────────────────────────
function public_list(string $name): never
{
    $where = [];
    $params = [];
    $columns = '*';
    $limit = 500;

    switch ($name) {
        case 'programmes':
        case 'partenaires':
            $order = 'ordre ASC, id ASC';
            break;
        case 'temoignages_video':
            $order = 'ordre ASC, id DESC';
            break;
        case 'enseignements':
            $type = (string) ($_GET['type'] ?? '');
            if ($type !== '') {
                $where[] = 'type = ?';
                $params[] = $type;
            }
            // Les plus récents d'abord ; les éléments sans date (versets) dans l'ordre de saisie.
            $order = '`date` IS NULL, `date` DESC, id ASC';
            break;
        case 'activites':
            $categorie = (string) ($_GET['categorie'] ?? '');
            if ($categorie !== '') {
                $where[] = 'categorie = ?';
                $params[] = $categorie;
            }
            $order = 'id DESC';
            break;
        case 'annonces':
            // Uniquement l'annonce en cours aujourd'hui.
            $where[] = 'date_debut <= CURDATE() AND date_fin >= CURDATE()';
            $order = 'created_at DESC, id DESC';
            $limit = 1;
            break;
        case 'temoignages':
            // Jamais l'email ; seulement les témoignages approuvés et autorisés à la publication.
            $columns = 'id, nom, lieu, categorie, contenu, created_at';
            $where[] = "statut = 'approuve' AND publier = 1";
            $order = 'created_at DESC, id DESC';
            break;
        default:
            throw new HttpError(404, 'Ressource inconnue.');
    }

    $sql = "SELECT $columns FROM $name" . ($where ? ' WHERE ' . implode(' AND ', $where) : '') . " ORDER BY $order LIMIT $limit";
    $rows = query($sql, $params)->fetchAll();
    send_json(array_map(fn($r) => present($r), $rows));
}

// ─────────────────────────────────────────────────────────────
// Textes des pages (« Pages du site » dans le backoffice)
// Chaque clé contient seulement les champs modifiés ; le site complète
// avec ses textes d'origine.
// ─────────────────────────────────────────────────────────────
const CONTENU_MAX_BYTES = 500000;

function contenu_key(string $key): string
{
    if (!preg_match('/^[a-z0-9][a-z0-9_.-]{0,99}$/', $key)) {
        throw new HttpError(404, 'Section inconnue.');
    }
    return $key;
}

function contenus_all(): array
{
    $out = [];
    foreach (query('SELECT cle, valeur FROM contenus')->fetchAll() as $row) {
        $value = json_decode((string) $row['valeur'], true);
        if (is_array($value)) {
            $out[$row['cle']] = $value;
        }
    }
    return $out;
}

function public_contenus(): never
{
    send_json((object) contenus_all());
}

function admin_contenu_save(string $key): never
{
    require_admin();
    $key = contenu_key($key);
    $value = request_body()['valeur'] ?? null;
    if (!is_array($value)) {
        throw new HttpError(422, 'Contenu invalide.');
    }
    $json = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false || strlen($json) > CONTENU_MAX_BYTES) {
        throw new HttpError(422, 'Contenu trop volumineux.');
    }
    query(
        'INSERT INTO contenus (cle, valeur) VALUES (?, ?) ON DUPLICATE KEY UPDATE valeur = VALUES(valeur)',
        [$key, $json]
    );
    send_json(['ok' => true, 'cle' => $key, 'valeur' => $value]);
}

function admin_contenu_reset(string $key): never
{
    require_admin();
    query('DELETE FROM contenus WHERE cle = ?', [contenu_key($key)]);
    send_json(['ok' => true]);
}

// ─────────────────────────────────────────────────────────────
// Formulaires publics (écriture seule)
// ─────────────────────────────────────────────────────────────
function form_submit(string $name): never
{
    $res = resource($name);
    if (!isset($res['form'])) {
        throw new HttpError(404, 'Formulaire inconnu.');
    }
    [$max, $window] = $res['form_limit'];
    rate_limit("form:$name", $max, $window);

    $input = array_intersect_key(request_body(), array_flip($res['form']));
    $fields = array_intersect_key($res['fields'], array_flip($res['form']));
    $data = validate($fields, $input, false);

    $columns = array_keys($data);
    $sql = ($name === 'newsletter' ? 'INSERT IGNORE' : 'INSERT') . " INTO $name ("
        . implode(', ', array_map(fn($c) => "`$c`", $columns)) . ') VALUES ('
        . implode(', ', array_fill(0, count($columns), '?')) . ')';
    query($sql, array_values($data));
    send_json(['ok' => true], 201);
}

// ─────────────────────────────────────────────────────────────
// Backoffice (connexion requise)
// ─────────────────────────────────────────────────────────────

/** Filtres simples ?champ=valeur, limités aux champs booléens et à choix. */
function admin_filters(array $fields): array
{
    $where = [];
    $params = [];
    foreach ($_GET as $key => $value) {
        $type = $fields[$key]['type'] ?? null;
        if ($type === 'bool' || $type === 'enum') {
            $where[] = "`$key` = ?";
            $params[] = $type === 'bool' ? (filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : (string) $value;
        }
    }
    return [$where ? ' WHERE ' . implode(' AND ', $where) : '', $params];
}

function admin_list(string $name): never
{
    require_admin();
    $res = resource($name);
    [$where, $params] = admin_filters($res['fields']);
    $rows = query("SELECT * FROM $name$where ORDER BY {$res['admin_order']} LIMIT 2000", $params)->fetchAll();
    send_json(array_map(fn($r) => present($r, $res['fields']), $rows));
}

function admin_count(string $name): never
{
    require_admin();
    $res = resource($name);
    [$where, $params] = admin_filters($res['fields']);
    send_json(['count' => (int) query("SELECT COUNT(*) FROM $name$where", $params)->fetchColumn()]);
}

function admin_find(string $name, int $id, array $fields): array
{
    $row = query("SELECT * FROM $name WHERE id = ?", [$id])->fetch();
    if (!$row) {
        throw new HttpError(404, 'Élément introuvable.');
    }
    return present($row, $fields);
}

function admin_create(string $name): never
{
    require_admin();
    $res = resource($name);
    $data = validate($res['fields'], request_body(), false);
    if (!$data) {
        throw new HttpError(422, 'Aucune donnée à enregistrer.');
    }
    $columns = array_keys($data);
    query(
        "INSERT INTO $name (" . implode(', ', array_map(fn($c) => "`$c`", $columns)) . ') VALUES ('
            . implode(', ', array_fill(0, count($columns), '?')) . ')',
        array_values($data)
    );
    send_json(admin_find($name, (int) db()->lastInsertId(), $res['fields']), 201);
}

function admin_update(string $name, int $id): never
{
    require_admin();
    $res = resource($name);
    $data = validate($res['fields'], request_body(), true);
    if ($data) {
        $set = implode(', ', array_map(fn($c) => "`$c` = ?", array_keys($data)));
        query("UPDATE $name SET $set WHERE id = ?", [...array_values($data), $id]);
    }
    send_json(admin_find($name, $id, $res['fields']));
}

function admin_delete(string $name, int $id): never
{
    require_admin();
    resource($name);
    query("DELETE FROM $name WHERE id = ?", [$id]);
    send_json(['ok' => true]);
}

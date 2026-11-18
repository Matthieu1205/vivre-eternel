// ════════════════════════════════════════════════════════════════════
//  Textes des pages modifiables depuis le backoffice (« Pages du site »).
//
//  Chaque section décrit :
//    - group / label : où elle apparaît dans le backoffice
//    - fields        : les champs du formulaire
//    - defaults      : le texte d'origine du site, affiché tant que
//                      l'administrateur ne l'a pas modifié
//
//  Types de champs : text, textarea, image, url, datetime,
//    list  (une ligne = un élément),
//    items (liste de fiches, chacune avec ses propres `fields`).
//  Dans les textarea, **mot** s'affiche en gras et une ligne vide
//  sépare deux paragraphes.
// ════════════════════════════════════════════════════════════════════

const ICON_HELP = 'Classe Font Awesome, ex. « fas fa-heart » (voir fontawesome.com/icons).'
const VERSE = [
  { name: 'verse_text', label: 'Verset (texte)', type: 'textarea' },
  { name: 'verse_ref', label: 'Référence du verset', type: 'text' },
]
const HERO = [
  { name: 'eyebrow', label: 'Petit titre au-dessus', type: 'text' },
  { name: 'titre', label: 'Titre de la page', type: 'text' },
  { name: 'texte', label: 'Phrase d’introduction', type: 'textarea' },
]
const CARDS = (label, help) => ({
  name: 'cartes', label, type: 'items', help, itemLabel: 'titre',
  fields: [
    { name: 'icon', label: 'Icône', type: 'text', help: ICON_HELP },
    { name: 'titre', label: 'Titre', type: 'text' },
    { name: 'texte', label: 'Texte', type: 'textarea' },
  ],
})

/** Onglet « image + texte + verset + points » (Vocation, Vision, Mission, Spiritualité). */
const PILIER = [
  { name: 'titre', label: 'Titre', type: 'text' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'texte', label: 'Texte', type: 'textarea' },
  ...VERSE,
  { name: 'points', label: 'Points clés', type: 'list', help: 'Un point par ligne.' },
]

export const GROUPS = [
  { id: 'general', label: 'Coordonnées & réseaux', icon: 'fas fa-address-book' },
  { id: 'accueil', label: 'Accueil', icon: 'fas fa-home' },
  { id: 'apropos', label: 'À propos', icon: 'fas fa-cross' },
  { id: 'priere', label: 'Prière & Intercession', icon: 'fas fa-hands-praying' },
  { id: 'programmes', label: 'Programmes', icon: 'fas fa-clipboard-list' },
  { id: 'enseignements', label: 'Enseignements', icon: 'fas fa-headphones' },
  { id: 'activites', label: 'Activités & Actions', icon: 'fas fa-globe' },
  { id: 'temoignages', label: 'Témoignages', icon: 'fas fa-comments' },
  { id: 'partenaires', label: 'Partenaires', icon: 'fas fa-handshake' },
  { id: 'soutenir', label: 'Soutenir l’Œuvre', icon: 'fas fa-gift' },
  { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
  { id: 'membre', label: 'Membre', icon: 'fas fa-user-plus' },
]

export const SECTIONS = {
  // ─────────────────────────── Général ───────────────────────────
  'site.coordonnees': {
    group: 'general', label: 'Coordonnées',
    help: 'Reprises sur la page Contact, dans le pied de page et sur les boutons WhatsApp.',
    fields: [
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'tel1', label: 'Téléphone 1 (affiché)', type: 'text' },
      { name: 'tel2', label: 'Téléphone 2 (affiché)', type: 'text' },
      { name: 'whatsapp', label: 'Numéro WhatsApp (international, chiffres seulement)', type: 'text', help: 'Ex. 2250546457742 — sans +, sans espace.' },
      { name: 'disponibilite', label: 'Disponibilité', type: 'text' },
      { name: 'adresse', label: 'Adresse', type: 'textarea', help: 'Une ligne par ligne d’adresse.' },
      { name: 'horaires', label: 'Horaires d’ouverture', type: 'textarea' },
      { name: 'cultes', label: 'Cultes & réunions', type: 'textarea' },
      { name: 'maps_url', label: 'Lien Google Maps', type: 'url' },
    ],
    defaults: {
      email: 'contact@vivrepourleternel.org',
      tel1: '+225 05 46 45 77 42',
      tel2: '+225 07 09 04 57 07',
      whatsapp: '2250546457742',
      disponibilite: 'Lun – Sam · 8h – 20h',
      adresse: 'Modeste Nouveau Goudron\nAncienne Route de Bassam, Abidjan',
      horaires: 'Lundi – Vendredi\n8h00 – 18h00',
      cultes: 'Mercredi 19h\nDimanche 9h – 12h',
      maps_url: 'https://maps.google.com/?q=Modeste+Nouveau+Goudron+Ancienne+Route+de+Bassam+Abidjan',
    },
  },
  'site.reseaux': {
    group: 'general', label: 'Réseaux sociaux',
    help: 'Affichés sur la page Contact › Réseaux sociaux et dans le pied de page.',
    fields: [{
      name: 'reseaux', label: 'Réseaux', type: 'items', itemLabel: 'nom',
      fields: [
        { name: 'nom', label: 'Nom', type: 'text' },
        { name: 'url', label: 'Lien de la page', type: 'url' },
        { name: 'handle', label: 'Identifiant affiché', type: 'text' },
        { name: 'desc', label: 'Description', type: 'text' },
        { name: 'icon', label: 'Icône', type: 'text', help: 'Ex. « fab fa-facebook-f », « fab fa-youtube ».' },
        { name: 'color', label: 'Couleur', type: 'text', help: 'Code couleur, ex. #1877F2.' },
      ],
    }],
    defaults: {
      reseaux: [
        { nom: 'Facebook', icon: 'fab fa-facebook-f', handle: '@VivrePourl\'Éternel', color: '#1877F2', url: '', desc: 'Publications quotidiennes, lives et témoignages' },
        { nom: 'YouTube', icon: 'fab fa-youtube', handle: '@VPEMinistere', color: '#FF0000', url: '', desc: 'Messages vidéo, veillées & conférences' },
        { nom: 'Instagram', icon: 'fab fa-instagram', handle: '@vpe_ministere', color: '#E1306C', url: '', desc: 'Moments forts, versets du jour & galerie' },
        { nom: 'TikTok', icon: 'fab fa-tiktok', handle: '@vivrepourleternal', color: '#000000', url: '', desc: 'Courts messages inspirants & témoignages' },
        { nom: 'WhatsApp', icon: 'fab fa-whatsapp', handle: 'Groupe VPE', color: '#25D366', url: '', desc: 'Communauté d\'entraide & partage de Parole' },
        { nom: 'Telegram', icon: 'fab fa-telegram-plane', handle: '@VPEMinistere', color: '#0088CC', url: '', desc: 'Annonces officielles & enseignements audio' },
      ],
    },
  },
  'site.pied': {
    group: 'general', label: 'Pied de page & newsletter',
    fields: [
      { name: 'tagline', label: 'Nom du ministère (sous le logo)', type: 'textarea' },
      ...VERSE,
      { name: 'copyright', label: 'Mention de bas de page', type: 'text' },
      { name: 'newsletter_titre', label: 'Newsletter — titre', type: 'text' },
      { name: 'newsletter_texte', label: 'Newsletter — texte', type: 'textarea' },
    ],
    defaults: {
      tagline: 'Ministère de Feu et de Résurrection\nFraternité des Disciples de Jésus-Christ',
      verse_text: '« Je suis le chemin, la vérité et la vie. »',
      verse_ref: 'Jean 14:6',
      copyright: 'Vivre pour l\'Éternel — Ministère de Feu et de Résurrection. Tous droits réservés.',
      newsletter_titre: 'Verset du Jour & Actualités',
      newsletter_texte: 'Recevez chaque matin un verset, un message d\'encouragement et les nouvelles du ministère.',
    },
  },

  // ─────────────────────────── Accueil ───────────────────────────
  'accueil.hero': {
    group: 'accueil', label: 'En-tête',
    fields: [
      { name: 'eyebrow', label: 'Petit titre au-dessus', type: 'text' },
      { name: 'titre1', label: 'Titre — ligne 1', type: 'text' },
      { name: 'titre2', label: 'Titre — ligne 2 (en couleur)', type: 'text' },
      { name: 'sous_titre', label: 'Sous-titre', type: 'text' },
      { name: 'verset', label: 'Verset', type: 'text' },
      { name: 'badges', label: 'Badges', type: 'list', help: 'Un badge par ligne.' },
    ],
    defaults: {
      eyebrow: 'Ministère de Feu et de Résurrection · Fraternité des Disciples de Jésus-Christ',
      titre1: 'Vivre pour',
      titre2: 'l\'Éternel',
      sous_titre: 'Parce que ta vie a un sens éternel.',
      verset: '« Je suis le chemin, la vérité et la vie. » — Jean 14:6',
      badges: ['Familles touchées', '500+ Vies transformées', '10+ Ans de ministère'],
    },
  },
  'accueil.chiffres': {
    group: 'accueil', label: 'Chiffres clés',
    fields: [{
      name: 'chiffres', label: 'Chiffres', type: 'items', itemLabel: 'libelle',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text' },
        { name: 'libelle', label: 'Libellé', type: 'text' },
      ],
    }],
    defaults: {
      chiffres: [
        { nombre: '500+', libelle: 'Vies Touchées' },
        { nombre: '10+', libelle: 'Années de Ministère' },
        { nombre: '6', libelle: 'Programmes Actifs' },
        { nombre: '3+', libelle: 'Nations Touchées' },
      ],
    },
  },
  'accueil.activites': {
    group: 'accueil', label: 'Ce que nous faisons',
    fields: [
      { name: 'label', label: 'Petit titre', type: 'text' },
      { name: 'titre', label: 'Titre', type: 'text', help: 'Entourez un mot de ** pour le mettre en couleur, ex. **Cœur Battant**.' },
      { name: 'sous_titre', label: 'Sous-titre', type: 'text' },
      {
        name: 'cartes', label: 'Encadrés', type: 'items', itemLabel: 'titre',
        fields: [
          { name: 'icon', label: 'Icône', type: 'text', help: ICON_HELP },
          { name: 'titre', label: 'Titre', type: 'text' },
          { name: 'texte', label: 'Texte', type: 'textarea' },
          { name: 'lien', label: 'Lien du bouton', type: 'text', help: 'Adresse d’une page du site, ex. /priere.' },
        ],
      },
    ],
    defaults: {
      label: 'Ce que nous faisons',
      titre: 'Un Ministère au **Cœur Battant**',
      sous_titre: 'Des espaces de rencontre avec Dieu, soi-même et les autres.',
      cartes: [
        { icon: 'fas fa-hands-praying', titre: 'Prière & Intercession', texte: 'Un mur de prière permanent pour les familles, malades et nations. Des percées surviennent chaque semaine.', lien: '/priere' },
        { icon: 'fas fa-fire', titre: 'Nos Programmes', texte: '6 programmes spirituels puissants : intercession, délivrance, évangélisation, louange, restauration et famille.', lien: '/programmes' },
        { icon: 'fas fa-comment', titre: 'Témoignages', texte: 'Des vies transformées par la puissance de Dieu. Découvrez les témoignages de grâce de notre communauté.', lien: '/temoignages' },
      ],
    },
  },
  'accueil.verset': {
    group: 'accueil', label: 'Bandeau verset',
    fields: VERSE,
    defaults: {
      verse_text: '« Ce n\'est pas par une armée ni par la force, mais c\'est par mon Esprit »',
      verse_ref: 'Zacharie 4:6',
    },
  },
  'accueil.veillee': {
    group: 'accueil', label: 'Prochaine veillée (compte à rebours)',
    fields: [
      { name: 'label', label: 'Petit titre', type: 'text' },
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'date', label: 'Date et heure de la veillée', type: 'datetime', help: 'Le compte à rebours s’affiche jusqu’à cette date. Laissez vide pour afficher 00.' },
    ],
    defaults: { label: 'Prochaine Veillée de Prière', titre: 'Rejoignez-nous pour une nuit de gloire', date: '' },
  },

  // ─────────────────────────── À propos ───────────────────────────
  'apropos.hero': {
    group: 'apropos', label: 'En-tête de la page', fields: HERO,
    defaults: { eyebrow: 'Notre Identité', titre: 'À Propos du Ministère', texte: 'Découvrez qui nous sommes, notre vision, notre mission et les valeurs qui nous animent.' },
  },
  'apropos.presentation': {
    group: 'apropos', label: 'Présentation',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea', help: 'Une ligne vide sépare deux paragraphes. **mot** = gras.' },
      ...VERSE,
      CARDS('Encadrés'),
    ],
    defaults: {
      titre: 'Présentation du Ministère',
      texte: '**« Vivre pour l\'Éternel »** est un ministère chrétien fondé sur la Parole de Dieu, porté par une communauté de foi engagée à servir le Seigneur avec ferveur, intégrité et amour fraternel.\n\nAncré dans la tradition du **Ministère de Feu et de Résurrection** et de la **Fraternité des Disciples de Jésus-Christ**, ce ministère rassemble des hommes et des femmes appelés à marcher dans la lumière de l\'Évangile, à intercéder pour les nations et à témoigner de la puissance transformatrice de Jésus-Christ.',
      verse_text: '« Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée. »',
      verse_ref: 'Matthieu 5:14',
      cartes: [
        { icon: 'fas fa-cross', titre: 'Fondé sur la Parole', texte: 'Toute notre démarche prend racine dans la Parole de Dieu, source de vie et de transformation.' },
        { icon: 'fas fa-users', titre: 'Communauté de Foi', texte: 'Un peuple uni dans l\'amour fraternel, la prière et le service du Seigneur.' },
        { icon: 'fas fa-globe', titre: '10+ Ans de Ministère', texte: 'Depuis plus de dix ans, des vies touchées, des familles restaurées et des nations atteintes.' },
      ],
    },
  },
  'apropos.vocation': {
    group: 'apropos', label: 'La Vocation', fields: PILIER,
    defaults: {
      titre: 'La Vocation', image: '/vocation.jpeg',
      texte: 'À l\'image de Jean Baptiste, nous venons pour servir de témoins, pour rendre témoignage à la lumière, afin que tous les hommes croient en Jésus-Christ et que les ténèbres reçoivent la lumière.',
      verse_text: '« Au commencement était la parole… Cette lumière est la véritable Lumière, qui, en venant dans le monde, éclaire tout homme. »',
      verse_ref: 'Jean 1:1, 9',
      points: ['Témoin de la Lumière de Jésus-Christ', 'Conduire toute âme à croire en Jésus-Christ', 'Que les ténèbres reçoivent la Lumière de l\'Évangile'],
    },
  },
  'apropos.vision': {
    group: 'apropos', label: 'La Vision', fields: PILIER,
    defaults: {
      titre: 'La Vision', image: '/vision.jpeg',
      texte: 'Orienter toutes créatures de Dieu vers Jésus-Christ, pour qu\'il soit le seul repère en toutes circonstances. Car Jésus-Christ est le chemin, la vie et la vérité.',
      verse_text: '« Celui qui croit au Fils a la vie Éternelle ; Celui qui ne croit pas au Fils ne verra point la vie. »',
      verse_ref: 'Jean 3:35–36',
      points: ['Jésus-Christ, seul repère en toutes circonstances', 'Le Chemin, la Vie et la Vérité proclamés', 'La Vie Éternelle pour toute créature croyante'],
    },
  },
  'apropos.mission': {
    group: 'apropos', label: 'La Mission', fields: PILIER,
    defaults: {
      titre: 'La Mission', image: '/mission.jpeg',
      texte: 'Que les ténèbres dans ce monde deviennent Lumière par la Parole de Dieu et les miracles de Jésus-Christ, afin que toutes créatures marchent dans la Lumière et deviennent enfants de Dieu conduits par le Saint-Esprit.',
      verse_text: '« Car tous ceux qui sont conduits par l\'Esprit de Dieu sont fils de Dieu… et si nous sommes enfants, nous sommes aussi héritiers. »',
      verse_ref: 'Romains 8:14, 17',
      points: ['Transformer les ténèbres en Lumière par la Parole', 'Témoigner des signes et miracles de Jésus-Christ', 'Conduire toute créature à marcher dans la Lumière', 'Se laisser guider par le Saint-Esprit, Lumière et Vie'],
    },
  },
  'apropos.spiritualite': {
    group: 'apropos', label: 'La Spiritualité', fields: PILIER,
    defaults: {
      titre: 'La Spiritualité', image: '/spirituel.jpeg',
      texte: 'Régie par les éléments de spiritualité du **Sanctuaire Marial Regina Pacis**, notre vie spirituelle est fondée sur l\'intercession — Dieu nous exhorte à prier pour que sa main agisse puissamment dans les familles, les couples et la société.',
      verse_text: '« Je m\'étonne que personne n\'intercède ; Alors mon bras lui vient en aide. Et ma justice lui sert d\'appui. »',
      verse_ref: 'Ésaïe 59:16',
      points: ['L\'intercession, cœur de notre vie spirituelle', 'La Gloire de Dieu se manifeste là où l\'on prie', 'Tout chrétien est un intercesseur de Dieu'],
    },
  },
  'apropos.responsable': {
    group: 'apropos', label: 'Le Responsable',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'role', label: 'Fonction', type: 'text' },
      { name: 'nom', label: 'Nom', type: 'text' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'texte', label: 'Présentation', type: 'textarea' },
      ...VERSE,
      { name: 'points', label: 'Points clés', type: 'list', help: 'Un point par ligne.' },
      {
        name: 'editorial', label: 'Éditorial — paragraphes', type: 'items', itemLabel: 'ref',
        fields: [
          { name: 'texte', label: 'Texte', type: 'textarea', help: 'Une ligne vide sépare deux paragraphes. **mot** = gras.' },
          { name: 'ref', label: 'Référence biblique', type: 'text' },
        ],
      },
      { name: 'conclusion', label: 'Éditorial — conclusion', type: 'textarea' },
      { name: 'devise', label: 'Éditorial — phrase finale', type: 'text' },
    ],
    defaults: {
      titre: 'Président - Fondateur',
      role: 'Berger Général / Porteur de Vision',
      nom: 'Jean-Pierre Christian GBALLOU',
      image: '/responsable-new.jpg',
      texte: 'Homme de prière, de vision et de terrain. Il a répondu à l\'appel divin de servir les âmes avec passion, intégrité et humilité. Porteur d\'une vision prophétique pour les nations, il dirige ce ministère avec un cœur tourné vers Dieu et vers les plus démunis.',
      verse_text: 'Il a donné les uns comme apôtres, les autres comme prophètes, les autres comme évangélistes, les autres comme pasteurs et docteurs.',
      verse_ref: 'Éphésiens 4:11',
      points: ['Homme de prière et de vision prophétique', 'Serviteur des familles, couples et jeunes', 'Porteur de l\'appel divin pour les nations'],
      editorial: [
        { texte: 'Bien aimé de l\'Éternel, dans ce monde, nous auront à souffrir sous le Poids des péchés de ce monde qui n\'est que ténèbres. Mais gardons Courage — **JÉSUS-CHRIST a vaincu le monde.**\n\nBeaucoup se conduisent en ennemi de la croix du Christ, ils n\'apprécient que les choses de la terre. Qui s\'attache aux vices de ce Monde, vit dans les ténèbres et reste esclave.', ref: 'Jn 8:34–35' },
        { texte: 'Le monde et ses convoitises passent. Sachons que notre cité se trouve dans les Cieux.', ref: 'Ph 3:18–20' },
        { texte: 'Nul ne peut comprendre les choses Célestes, si ce n\'est par l\'Esprit descendu du ciel. Tous ceux qui se laissent conduire par l\'Esprit de Dieu sont Enfants de Dieu.', ref: 'Rm 8:14–17' },
        { texte: 'Faisons donc la volonté de Dieu en marchant dans la Lumière afin que nous soyons des enfants de lumière. Celui qui fait la volonté de Dieu demeure Éternel.', ref: '1 Jn 2:17' },
      ],
      conclusion: 'Ainsi, Prions ensemble pour que tous les Hommes se laissent conduire par l\'Amour du Christ et qu\'ils correspondent aux désirs de l\'Éternel afin qu\'ils puissent dire :',
      devise: '« Pour moi, Vivre c\'est le Christ ! »',
    },
  },

  // ─────────────────────────── Prière ───────────────────────────
  'priere.hero': {
    group: 'priere', label: 'En-tête de la page', fields: HERO,
    defaults: { eyebrow: 'Mur d\'Intercession', titre: 'Prière & Intercession', texte: 'Votre besoin est confié à notre équipe d\'intercesseurs dévoués. Nous prions pour vous.' },
  },
  'priere.formulaire': {
    group: 'priere', label: 'Demande de prière',
    fields: [
      { name: 'titre', label: 'Titre des domaines', type: 'text' },
      {
        name: 'domaines', label: 'Domaines de prière', type: 'items', itemLabel: 'label',
        help: 'Proposés aussi comme catégories dans le formulaire.',
        fields: [
          { name: 'icon', label: 'Icône', type: 'text', help: ICON_HELP },
          { name: 'label', label: 'Nom', type: 'text' },
        ],
      },
      ...VERSE,
      { name: 'confirmation', label: 'Message après envoi', type: 'textarea' },
    ],
    defaults: {
      titre: 'Domaines de prière',
      domaines: [
        { icon: 'fas fa-hospital', label: 'Guérison & Santé' },
        { icon: 'fas fa-users', label: 'Restauration Familiale' },
        { icon: 'fas fa-briefcase', label: 'Provision & Emploi' },
        { icon: 'fas fa-unlock', label: 'Délivrance' },
        { icon: 'fas fa-globe', label: 'Intercession Nations' },
        { icon: 'fas fa-graduation-cap', label: 'Projets & Vocation' },
      ],
      verse_text: 'Confessez vos péchés les uns aux autres, et priez les uns pour les autres, afin que vous soyez guéris.',
      verse_ref: 'Jacques 5:16',
      confirmation: 'Notre équipe d\'intercesseurs a reçu votre demande. Nous prions pour vous avec foi et constance.',
    },
  },
  'priere.programme': {
    group: 'priere', label: 'Programme de prière',
    help: 'La liste des programmes vient de la section « Programmes » du backoffice.',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Introduction', type: 'textarea' },
    ],
    defaults: { titre: 'Programme de Prière', texte: 'Liste des différents programmes du ministère :' },
  },
  'priere.intercession': {
    group: 'priere', label: 'Intercession',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea', help: 'Une ligne vide sépare deux paragraphes.' },
      CARDS('Points'),
    ],
    defaults: {
      titre: 'L\'Intercession : Un Appel Divin',
      texte: 'L\'intercession est le fait de se tenir entre Dieu et l\'homme pour plaider en faveur d\'un autre. C\'est l\'un des actes les plus nobles et les plus puissants du croyant.\n\nNotre ministère forme et équipe des intercesseurs qui comprennent l\'autorité spirituelle qui leur est conférée en Christ pour briser les forteresses ennemies et établir le royaume de Dieu.',
      cartes: [
        { icon: 'fas fa-book-open', titre: 'Fondement Biblique', texte: 'L\'intercession est enracinée dans la Parole. Nous étudions les principes scripturaires de la prière.' },
        { icon: 'fas fa-fire', titre: 'Le Fardeau Divin', texte: 'Recevoir le fardeau de Dieu pour des situations spécifiques est le début de toute intercession puissante.' },
        { icon: 'fas fa-shield-alt', titre: 'Guerre Spirituelle', texte: 'Comprendre les principes de la guerre spirituelle pour prier avec autorité et efficacité.' },
        { icon: 'fas fa-check-circle', titre: 'Prière avec Résultats', texte: 'Documenter les réponses de Dieu renforce la foi et encourage toute la communauté.' },
      ],
    },
  },
  'priere.rejoindre': {
    group: 'priere', label: 'Rejoindre les intercesseurs',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea' },
      CARDS('Encadrés'),
      { name: 'bouton', label: 'Texte du bouton', type: 'text' },
    ],
    defaults: {
      titre: 'Rejoindre les Intercesseurs',
      texte: 'Vous sentez l\'appel à la prière ? Rejoignez notre équipe d\'intercesseurs dévoués. Pas besoin d\'être parfait — juste disponible et sincère.',
      cartes: [
        { icon: 'fas fa-clock', titre: 'Flexible', texte: 'Priez selon votre disponibilité. Nous nous adaptons à votre emploi du temps.' },
        { icon: 'fas fa-mobile-alt', titre: 'À Distance', texte: 'Participez en ligne ou en présentiel, depuis n\'importe où dans le monde.' },
        { icon: 'fas fa-book', titre: 'Formation', texte: 'Nous vous formons aux principes de l\'intercession biblique.' },
        { icon: 'fas fa-handshake', titre: 'Communauté', texte: 'Rejoignez une famille soudée par la même passion pour Dieu.' },
      ],
      bouton: 'Je veux rejoindre l\'équipe',
    },
  },

  // ─────────────────────────── Programmes ───────────────────────────
  'programmes.hero': {
    group: 'programmes', label: 'En-tête de la page',
    help: 'Le contenu de chaque programme se gère dans la section « Programmes » du menu.',
    fields: HERO,
    defaults: { eyebrow: 'Nos Programmes', titre: 'Programmes du Ministère', texte: 'Des programmes de rencontre avec Dieu, conçus pour transformer, libérer et fortifier.' },
  },

  // ─────────────────────────── Enseignements ───────────────────────────
  'enseignements.hero': {
    group: 'enseignements', label: 'En-tête de la page',
    help: 'Les messages, articles et versets se gèrent dans la section « Enseignements » du menu.',
    fields: HERO,
    defaults: { eyebrow: 'La Parole Vivante', titre: 'Enseignements', texte: 'Nourrissez votre foi avec des messages puissants, des articles inspirants et les versets du jour.' },
  },

  // ─────────────────────────── Activités ───────────────────────────
  'activites.hero': {
    group: 'activites', label: 'En-tête de la page',
    help: 'Les activités, actions et photos se gèrent dans la section « Activités » du menu.',
    fields: HERO,
    defaults: { eyebrow: 'Sur le Terrain', titre: 'Activités & Actions', texte: 'De l\'Évangile prêché dans les rues au pain partagé dans les quartiers — la foi en action.' },
  },
  'activites.projet': {
    group: 'activites', label: 'Projet phare (Mont des Oliviers)',
    fields: [
      { name: 'afficher', label: 'Afficher ce bloc', type: 'select', options: ['oui', 'non'] },
      { name: 'etiquette', label: 'Étiquette', type: 'text' },
      { name: 'statut', label: 'Statut du projet', type: 'text' },
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'texte', label: 'Texte', type: 'textarea' },
      { name: 'points', label: 'Points clés', type: 'list', help: 'Un point par ligne.' },
      { name: 'infos', label: 'Informations (superficie…)', type: 'list', help: 'Une information par ligne.' },
      ...VERSE,
      { name: 'bouton', label: 'Texte du bouton', type: 'text' },
      { name: 'lien', label: 'Lien du bouton', type: 'url' },
    ],
    defaults: {
      afficher: 'oui',
      etiquette: 'Projet phare',
      statut: 'Projet en construction',
      titre: 'Ouverture du Mont des Oliviers',
      image: '/action.jpeg',
      texte: 'Centre d\'accueil et d\'accompagnement spirituel, moral, psychologique, matériel et alimentaire — un lieu de refuge et de restauration pour les familles, les couples et les jeunes.',
      points: ['Accompagnement Spirituel', 'Soutien Moral & Psychologique', 'Aide Matérielle & Alimentaire'],
      infos: ['Superficie : 300 m²', 'Terrain : 600 m²'],
      verse_text: 'Et moi, si j\'ai été élevé de la terre, j\'attirerai tous les hommes à moi.',
      verse_ref: 'Ésaïe 59:16',
      bouton: 'Faire un don · 1 000 FCFA = 1 vie changée',
      lien: 'https://don-mont-des-oliviers.klicvote.com/',
    },
  },

  // ─────────────────────────── Témoignages ───────────────────────────
  'temoignages.hero': {
    group: 'temoignages', label: 'En-tête de la page',
    help: 'Les témoignages écrits et vidéo se gèrent dans la section « Témoignages » du menu.',
    fields: HERO,
    defaults: { eyebrow: 'Grâces Reçues', titre: 'Témoignages', texte: 'Des vies transformées par la puissance de Dieu. Chaque témoignage est une déclaration de sa gloire.' },
  },
  'temoignages.video': {
    group: 'temoignages', label: 'Témoignages vidéo — introduction',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea' },
    ],
    defaults: { titre: 'Témoignages Vidéo', texte: 'Regardez et soyez encouragés — ce que Dieu a fait pour eux, il peut le faire pour vous.' },
  },
  'temoignages.partager': {
    group: 'temoignages', label: 'Partager mon témoignage',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea' },
      ...VERSE,
      { name: 'categories', label: 'Catégories proposées', type: 'list', help: 'Une catégorie par ligne.' },
    ],
    defaults: {
      titre: 'Votre Témoignage Compte',
      texte: 'Ce que Dieu a accompli dans votre vie peut donner de l\'espérance à quelqu\'un d\'autre. Ne gardez pas ce trésor pour vous.',
      verse_text: 'Ils l\'ont vaincu à cause du sang de l\'Agneau et à cause de la parole de leur témoignage.',
      verse_ref: 'Apocalypse 12:11',
      categories: ['Guérison', 'Famille', 'Délivrance', 'Provision', 'Restauration', 'Conversion', 'Autre'],
    },
  },

  // ─────────────────────────── Partenaires ───────────────────────────
  'partenaires.hero': {
    group: 'partenaires', label: 'En-tête de la page',
    help: 'Chaque partenaire se gère dans la section « Partenaires » du menu.',
    fields: HERO,
    defaults: { eyebrow: 'Ensemble pour le Royaume', titre: 'Partenaires & Projets', texte: 'Seuls nous allons plus vite. Ensemble nous allons plus loin. Découvrez nos partenaires en mission.' },
  },

  // ─────────────────────────── Soutenir ───────────────────────────
  'soutenir.hero': {
    group: 'soutenir', label: 'En-tête de la page', fields: HERO,
    defaults: { eyebrow: 'Donnez & Recevez', titre: 'Soutenir l\'Œuvre', texte: 'Chaque geste de générosité avance l\'Évangile et touche des vies. Merci de nous rejoindre dans cette mission.' },
  },
  'soutenir.don': {
    group: 'soutenir', label: 'Faire un don',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea' },
      ...VERSE,
      { name: 'avantages_titre', label: 'Titre de la liste', type: 'text' },
      {
        name: 'avantages', label: 'Ce que permettent les dons', type: 'items', itemLabel: 'texte',
        fields: [
          { name: 'icon', label: 'Icône', type: 'text', help: ICON_HELP },
          { name: 'texte', label: 'Texte', type: 'text' },
        ],
      },
      { name: 'montants', label: 'Montants proposés (FCFA)', type: 'list', help: 'Un montant par ligne.' },
      { name: 'moyens', label: 'Moyens de paiement', type: 'list', help: 'Un moyen par ligne.' },
      { name: 'instructions', label: 'Comment envoyer le don', type: 'textarea', help: 'Numéros Mobile Money, coordonnées bancaires… Affiché après validation du formulaire.' },
    ],
    defaults: {
      titre: 'Faire un Don',
      texte: 'Chaque offrande, grande ou petite, participe à l\'avancement du Royaume de Dieu. Vos dons financent nos programmes, nos missions et notre aide sociale.',
      verse_text: 'Donnez, et il vous sera donné : on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde.',
      verse_ref: 'Luc 6:38',
      avantages_titre: 'Vos dons permettent :',
      avantages: [
        { icon: 'fas fa-bullhorn', texte: 'Financer les missions évangéliques' },
        { icon: 'fas fa-bread-slice', texte: 'Nourrir les familles dans le besoin' },
        { icon: 'fas fa-book-open', texte: 'Produire des enseignements gratuits' },
        { icon: 'fas fa-globe', texte: 'Soutenir les projets partenaires' },
      ],
      montants: ['5 000', '10 000', '25 000', '50 000', '100 000'],
      moyens: ['MTN Mobile Money', 'Orange Money', 'Wave', 'Virement bancaire'],
      instructions: '',
    },
  },
  'soutenir.partenariat': {
    group: 'soutenir', label: 'Devenir partenaire',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea' },
      CARDS('Niveaux de partenariat', 'Proposés aussi dans le formulaire.'),
      { name: 'confirmation', label: 'Message après envoi', type: 'textarea' },
    ],
    defaults: {
      titre: 'Devenir Partenaire',
      texte: 'Vous souhaitez vous associer de manière durable à cette œuvre ? Plusieurs niveaux de partenariat sont disponibles pour les individus, les entreprises et les organisations.',
      cartes: [
        { icon: 'fas fa-hands-praying', titre: 'Partenaire Priant', texte: 'Soutien en prière régulier pour le ministère et ses équipes.' },
        { icon: 'fas fa-gem', titre: 'Partenaire Financier', texte: 'Contribution mensuelle pour soutenir les programmes actifs.' },
        { icon: 'fas fa-handshake', titre: 'Partenaire Stratégique', texte: 'Collaboration active — ressources, compétences, réseau.' },
      ],
      confirmation: 'Merci pour votre intérêt à soutenir l\'œuvre. Notre responsable vous contactera dans les 48h.',
    },
  },
  'soutenir.spirituel': {
    group: 'soutenir', label: 'Soutien spirituel',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text' },
      { name: 'texte', label: 'Texte', type: 'textarea' },
      CARDS('Encadrés'),
      ...VERSE,
    ],
    defaults: {
      titre: 'Soutien Spirituel',
      texte: 'Au-delà des ressources financières, nous avons besoin de votre soutien le plus précieux : la prière. Rejoignez notre réseau d\'intercesseurs ou soutenez-nous par vos dons spirituels.',
      cartes: [
        { icon: 'fas fa-hands-praying', titre: 'Prière Quotidienne', texte: 'Intercédez chaque jour pour le ministère, ses responsables et ses membres.' },
        { icon: 'fas fa-shield-alt', titre: 'Couverture Spirituelle', texte: 'Rejoignez notre réseau d\'intercesseurs pour couvrir nos missions en prière.' },
        { icon: 'fas fa-book-open', titre: 'Partage de la Parole', texte: 'Diffusez nos enseignements autour de vous — chaque partage est une semence.' },
        { icon: 'fas fa-comment', titre: 'Témoignage', texte: 'Parlez de VPE à votre entourage. Un témoignage personnel est la meilleure publicité.' },
      ],
      verse_text: 'Or celui qui plante et celui qui arrose sont égaux, mais chacun recevra son salaire selon son propre travail.',
      verse_ref: '1 Corinthiens 3:8',
    },
  },

  // ─────────────────────────── Contact ───────────────────────────
  'contact.hero': {
    group: 'contact', label: 'En-tête de la page',
    help: 'Téléphones, email, adresse et réseaux se modifient dans « Coordonnées & réseaux ».',
    fields: HERO,
    defaults: { eyebrow: 'Parlons-nous', titre: 'Contactez-nous', texte: 'Nous sommes là pour vous. Choisissez le canal qui vous convient le mieux.' },
  },
  'contact.textes': {
    group: 'contact', label: 'Textes des onglets',
    fields: [
      { name: 'formulaire_titre', label: 'Formulaire — titre', type: 'text' },
      { name: 'formulaire_texte', label: 'Formulaire — texte', type: 'textarea' },
      { name: 'whatsapp_titre', label: 'WhatsApp — titre', type: 'text' },
      { name: 'whatsapp_texte', label: 'WhatsApp — texte', type: 'textarea' },
      { name: 'localisation_titre', label: 'Localisation — titre', type: 'text' },
      { name: 'reseaux_titre', label: 'Réseaux sociaux — titre', type: 'text' },
      { name: 'reseaux_texte', label: 'Réseaux sociaux — texte', type: 'textarea' },
    ],
    defaults: {
      formulaire_titre: 'Écrivez-nous',
      formulaire_texte: 'Pour toute question, demande de prière, information sur nos programmes ou souhait de partenariat — nous lisons chaque message avec attention.',
      whatsapp_titre: 'Chat WhatsApp',
      whatsapp_texte: 'Vous préférez une réponse rapide ? Notre équipe est disponible sur WhatsApp pour répondre à vos questions, prendre vos demandes de prière et vous orienter vers les bons programmes.',
      localisation_titre: 'Nous Trouver',
      reseaux_titre: 'Suivez-nous',
      reseaux_texte: 'Rejoignez notre communauté en ligne pour recevoir les enseignements, témoignages et annonces en temps réel.',
    },
  },

  // ─────────────────────────── Membre ───────────────────────────
  'membre.page': {
    group: 'membre', label: 'Page Devenir membre',
    fields: [
      ...HERO,
      { name: 'intro_titre', label: 'Introduction — titre', type: 'text' },
      { name: 'intro_sous_titre', label: 'Introduction — sous-titre', type: 'textarea' },
      { name: 'intro_texte', label: 'Introduction — texte', type: 'textarea' },
      {
        name: 'raisons', label: 'Raisons de devenir membre', type: 'items', itemLabel: 'titre',
        fields: [
          { name: 'icon', label: 'Icône', type: 'text', help: ICON_HELP },
          { name: 'titre', label: 'Titre', type: 'text' },
          { name: 'texte', label: 'Texte', type: 'textarea' },
        ],
      },
      { name: 'citation', label: 'Citation finale', type: 'textarea' },
      { name: 'bouton', label: 'Texte du bouton WhatsApp', type: 'text' },
    ],
    defaults: {
      eyebrow: 'Une vie de foi, de puissance et d\'impact',
      titre: 'Devenir Membre',
      texte: 'Entrez dans une dynamique spirituelle profonde, engagée et transformatrice.',
      intro_titre: 'Pourquoi devenir membre de Vivre pour l\'Éternel ?',
      intro_sous_titre: '**Ministère de Feu et de Résurrection**\nFraternité des Disciples de Jésus-Christ',
      intro_texte: 'Devenir membre, ce n\'est pas juste adhérer à un groupe, c\'est entrer dans une dynamique spirituelle profonde, engagée et transformatrice.',
      raisons: [
        { icon: 'fas fa-book-open', titre: 'Grandir spirituellement chaque jour', texte: 'Vous bénéficiez d\'un encadrement spirituel solide à travers l\'enseignement de la Parole, la prière et des moments de communion qui fortifient votre foi en Jésus-Christ.' },
        { icon: 'fas fa-fire', titre: 'Vivre une transformation réelle', texte: 'Le ministère met l\'accent sur la restauration, la délivrance et la résurrection spirituelle. C\'est un cadre propice pour laisser Dieu agir puissamment dans votre vie.' },
        { icon: 'fas fa-handshake', titre: 'Appartenir à une famille spirituelle', texte: 'Vous n\'êtes plus seul. Vous intégrez une fraternité de disciples unis par l\'amour, le soutien mutuel et la même vision : vivre pour l\'éternité.' },
        { icon: 'fas fa-star', titre: 'Découvrir et activer vos dons', texte: 'Chaque membre est encouragé à identifier ses talents spirituels et à les mettre au service de Dieu (service, évangélisation, intercession, etc.).' },
        { icon: 'fas fa-globe', titre: 'Participer à une mission divine', texte: 'Vous prenez part à l\'œuvre de Dieu : annoncer l\'Évangile, impacter des vies, transformer des communautés.' },
        { icon: 'fas fa-bullseye', titre: 'Être équipé pour votre destinée', texte: 'À travers des formations, des enseignements et un suivi, vous êtes préparé à marcher pleinement dans votre appel.' },
        { icon: 'fas fa-dove', titre: 'Vivre la puissance du feu de Dieu', texte: 'Dans un environnement de prière intense et de foi, vous expérimentez la présence vivante du Saint-Esprit.' },
      ],
      citation: 'Rejoindre Vivre pour l\'Éternel, c\'est choisir une vie de foi, de puissance et d\'impact éternel.\nC\'est répondre à l\'appel de Jésus-Christ à devenir un véritable disciple.',
      bouton: 'Je veux rejoindre le ministère',
    },
  },
}

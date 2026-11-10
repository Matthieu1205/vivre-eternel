-- Contenu initial du site (repris des pages existantes).
-- À exécuter UNE seule fois, après schema.sql, sur une base vide.
-- Le relancer créerait des doublons.

insert into public.programmes (slug, icon, label, horaire, description, detail, points, verse_text, verse_ref, banner_url, logo_url, ordre) values
  ('couple', 'fas fa-heart', 'L''Esprit Saint dans le Couple', 'Chaque vendredi · 19h30 – 21h', 'Séminaire d''évangélisation au sein du couple : enseignement de la Parole, prière commune et suivi spirituel.', 'Ce programme accompagne les couples dans la découverte du rôle du Saint-Esprit au cœur de leur union. À travers l''enseignement, la prière et un suivi spirituel personnalisé, chaque couple est équipé pour bâtir un foyer fondé sur Dieu.', 'Enseignement de la Parole
Prière en couple
Suivi spirituel
Séminaire d''évangélisation', 'Ce que Dieu a uni, que l''homme ne le sépare pas.', 'Matthieu 19:6', '/esprit-saint.jpeg', '/logo-esprit.jpeg', 1),
  ('delivrance', 'fas fa-link', 'Autorité sur les Eaux Profondes', 'Chaque Mardi et Jeudi · 08h30 – 17h', 'Écoute et prière de délivrance. Briser les liens invisibles par la puissance du Nom de Jésus-Christ.', 'Des séances d''écoute profonde et de prière de délivrance pour libérer ceux qui portent des fardeaux invisibles. Dans un cadre de confiance, de bienveillance et de puissance divine, les chaînes sont brisées.', 'Écoute bienveillante
Prière de délivrance
Séances individuelles
Suivi post-délivrance', 'Si le Fils vous affranchit, vous serez réellement libres.', 'Jean 8:36', '/autorité.jpeg', '/logo-autorité.jpeg', 2),
  ('rosee', 'fas fa-leaf', 'Rosée de Miséricorde', 'Chaque Samedi · 8h30 – 12h30', 'Assemblée de prière d''intercession — louange, enseignement, adoration et effusion du Saint-Esprit.', 'Une rencontre hebdomadaire centrée sur l''intercession, la louange et l''adoration. Dans ce lieu de grâce, le Saint-Esprit se répand et transforme les cœurs. Un espace pour se ressourcer et intercéder pour les autres.', 'Prière d''intercession
Louange et adoration
Enseignement de la Parole
Effusion du Saint-Esprit', 'Je ferai tomber une pluie de bénédictions en son temps.', 'Ézéchiel 34:26', '/rose-miséricorde.jpeg', '/logo-rosee.jpeg', 3),
  ('louange', 'fas fa-music', 'La Puissance de la Louange', 'Chaque 3 mois', 'Spectacle de Louange — enseignement, effusion du Saint-Esprit, témoignages et présence manifeste de Dieu.', 'Un événement trimestriel exceptionnel où la louange devient une arme spirituelle. Des chants, des témoignages, des enseignements profonds et une atmosphère propice à l''effusion du Saint-Esprit. Une nuit inoubliable avec Dieu.', 'Spectacle de louange
Témoignages
Enseignement
Effusion du Saint-Esprit', 'L''Éternel est ma force et mon cantique, et il m''a sauvé.', 'Psaume 118:14', '/Puissance-louange.jpeg', '/logo-puissance.jpeg', 4),
  ('pastorale', 'fas fa-home', 'Pastorale', 'Sur rendez-vous', 'Visite des familles, des couples et de la jeunesse — écoute, suivi spirituel et prière à domicile.', 'Le ministère va à la rencontre des familles, des couples et des jeunes là où ils sont. À travers des visites pastorales empreintes d''amour, nous offrons une écoute attentive, un accompagnement spirituel et la prière.', 'Visites à domicile
Accompagnement des couples
Suivi de la jeunesse
Prière et écoute', 'J''irai devant vous, dit l''Éternel.', 'Ésaïe 52:12', null, null, 5);

insert into public.enseignements (type, titre, auteur, categorie, description, date, duree, lieu) values
  ('audio', 'La Puissance de la Prière Fervente', 'Frère Christian Gballou', 'Fondements', null, '2025-01-12', '52 min', null),
  ('audio', 'Marcher dans l''Esprit au Quotidien', 'Sœur Marie-Claire', 'Vie Chrétienne', null, '2025-01-05', '45 min', null),
  ('audio', 'Comprendre la Grâce de Dieu', 'Frère Christian Gballou', 'Théologie', null, '2024-12-29', '61 min', null),
  ('audio', 'La Guerre Spirituelle & Nos Armes', 'Frère David Koné', 'Guerre Spirituelle', null, '2024-12-22', '48 min', null),
  ('audio', 'L''Intercession : Se Tenir dans la Brèche', 'Frère Christian Gballou', 'Intercession', null, '2024-12-15', '55 min', null),
  ('audio', 'Sanctification et Sainteté de Vie', 'Sœur Esther Traoré', 'Vie Chrétienne', null, '2024-12-08', '40 min', null),
  ('video', 'Veillée de Prière – Nuit de Gloire', null, null, null, '2025-01-18', '3h 20 min', 'Abidjan'),
  ('video', 'Retraite de Délivrance 2024', null, null, null, '2024-10-12', '4h 15 min', 'Yamoussoukro'),
  ('video', 'Conférence : Le Saint-Esprit et Nous', null, null, null, '2024-11-30', '1h 45 min', 'En ligne'),
  ('video', 'Campagne d''Évangélisation – Marché', null, null, null, '2024-12-05', '2h 10 min', 'Cocody'),
  ('article', 'Pourquoi Dieu permet-il la souffrance ?', 'Frère Christian Gballou', 'Théologie', 'La souffrance est l''une des questions les plus profondes que l''être humain puisse poser. La Bible ne nous donne pas une réponse simple, mais une réponse profonde...', '2025-01-20', null, null),
  ('article', '7 Clés pour une Vie de Prière Épanouie', 'Sœur Marie-Claire', 'Vie Chrétienne', 'La prière n''est pas une obligation pesante, mais une invitation à une communion profonde avec notre Créateur. Voici sept clés pratiques pour transformer votre vie de prière...', '2025-01-10', null, null),
  ('article', 'Le Jeûne : Comprendre son Rôle Spirituel', 'Frère David Koné', 'Discipline', 'Le jeûne est souvent mal compris dans l''Église contemporaine. Ce n''est pas une technique pour forcer la main de Dieu, mais une discipline qui nous positionne dans l''humilité...', '2025-01-02', null, null),
  ('article', 'La Restauration après la Chute', 'Frère Christian Gballou', 'Grâce', 'Chacun de nous a connu des moments de chute spirituelle. La bonne nouvelle de l''Évangile, c''est que Dieu est le Dieu du recommencement et de la restauration...', '2024-12-24', null, null),
  ('verset', 'Jean 3:16', null, 'Amour de Dieu', 'Car Dieu a tant aimé le monde qu''il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu''il ait la vie éternelle.', null, null, null),
  ('verset', 'Philippiens 4:13', null, 'Force', 'Je puis tout par celui qui me fortifie.', null, null, null),
  ('verset', 'Jérémie 29:11', null, 'Espérance', 'Car je connais les projets que j''ai formés sur vous, dit l''Éternel, projets de paix et non de malheur, afin de vous donner un avenir et une espérance.', null, null, null),
  ('verset', 'Romains 8:28', null, 'Providence', 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.', null, null, null),
  ('verset', 'Psaume 23:1', null, 'Confiance', 'L''Éternel est mon berger : je ne manquerai de rien.', null, null, null),
  ('verset', 'Matthieu 11:28', null, 'Repos', 'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.', null, null, null),
  ('verset', 'Ésaïe 40:31', null, 'Renouvellement', 'Mais ceux qui se confient en l''Éternel renouvellent leur force. Ils prennent le vol comme les aigles.', null, null, null);

insert into public.activites (categorie, titre, description, date, heure, lieu, type, icon, participants, ames, beneficiaires, nb_photos) values
  ('galerie', 'Conférence Intercession 2024', null, null, null, null, 'Conférence', null, null, null, null, 60),
  ('galerie', 'Mission en Prison – Décembre', null, null, null, null, 'Mission', null, null, null, null, 12),
  ('galerie', 'Retraite Spirituelle Couples 2024', null, null, null, null, 'Famille', null, null, null, null, 45),
  ('galerie', 'Distribution Alimentaire – Abobo', null, null, null, null, 'Social', null, null, null, null, 32),
  ('galerie', 'Évangélisation au Marché de Cocody', null, null, null, null, 'Évangélisation', null, null, null, null, 18),
  ('galerie', 'Veillée de Prière – Janvier 2025', null, null, null, null, 'Prière', null, null, null, null, 24),
  ('evenement', 'Séminaire : Guerre Spirituelle', null, '22 Fév 2025', '10h – 17h', 'En ligne & Présentiel', 'Formation', null, null, null, null, null),
  ('evenement', 'Campagne d''Évangélisation Estivale', null, 'Juillet 2025', 'À confirmer', 'Grand Abidjan', 'Évangélisation', null, null, null, null, null),
  ('evenement', 'Conférence Intercession Nationale', null, '5 Avril 2025', '09h – 18h', 'Palais de la Culture', 'Conférence', null, null, null, null, null),
  ('evenement', 'Retraite Spirituelle Couples 2025', null, '14 – 16 Mars 2025', 'Toute la journée', 'Hôtel Palm Club', 'Famille', null, null, null, null, null),
  ('evenement', 'Veillée de Prière Mensuelle', null, 'Chaque dernier vendredi', '21h – 3h', 'Siège du ministère', 'Prière', null, null, null, null, null),
  ('social', 'Assistance aux Veuves', 'Accompagnement pastoral et matériel pour les veuves de la communauté.', 'Nov 2024', null, null, null, 'fas fa-hands', null, null, 18, null),
  ('social', 'Visite des Orphelinats', 'Cadeaux de Noël, repas spéciaux et animations pour les enfants orphelins.', '25 Déc 2024', null, null, null, 'fas fa-child', null, null, 80, null),
  ('social', 'Soutien Scolaire', 'Cours de soutien gratuits pour enfants défavorisés, tous les samedis.', 'Toute l''année', null, null, null, 'fas fa-book', null, null, 35, null),
  ('social', 'Distribution Alimentaire', 'Repas chauds et denrées distribuées aux familles en difficulté du quartier.', '10 Jan 2025', null, null, null, 'fas fa-bread-slice', null, null, 120, null),
  ('terrain', 'Quartier Abobo', 'Campagne de rue intensive. Témoignages de guérison et de conversions.', '12 Déc 2024', null, 'Quartier Abobo', null, null, 20, 22, null, null),
  ('terrain', 'Prison d''Abidjan', 'Culte de Noël en prison. La grâce de Dieu touchée par plusieurs détenus.', '20 Déc 2024', null, 'Prison d''Abidjan', null, null, 6, 15, null, null),
  ('terrain', 'Hôpital Général d''Abidjan', 'Visite aux patients. Prière, encouragement et partage de la Parole de vie.', '08 Jan 2025', null, 'Hôpital Général d''Abidjan', null, null, 8, 4, null, null),
  ('terrain', 'Marché de Cocody', 'Distribution de l''Évangile de Jean et prière pour les malades au marché.', '15 Jan 2025', null, 'Marché de Cocody', null, null, 12, 8, null, null);

insert into public.partenaires (slug, nom, icon, secteur, description, mission, services, verse_text, verse_ref, collab, couleur, ordre) values
  ('espoir', 'Centre Espoir', 'fas fa-home', 'Centre Social', 'Un centre d''accueil et de réinsertion pour les personnes en situation de précarité. Centre Espoir offre un hébergement temporaire, des repas chauds et un accompagnement vers l''autonomie.', 'Restaurer la dignité des personnes vulnérables en leur offrant un espace de sécurité, de soin et de reconstruction.', 'Hébergement d''urgence
Repas quotidiens
Accompagnement psychosocial
Formation professionnelle', 'Heureux celui qui pense au misérable ! L''Éternel le délivrera au jour du malheur.', 'Psaume 41:1', 'VPE fournit un soutien spirituel et des équipes de prière bénévoles au Centre Espoir chaque mois.', '#0284C7', 1),
  ('artisan', 'Galerie Artisan', 'fas fa-palette', 'Art & Culture', 'Une galerie d''art chrétien qui promeut les artistes locaux dont le travail témoigne de la beauté de la création divine et des valeurs du Royaume.', 'Valoriser l''art comme expression prophétique et outil d''évangélisation culturelle.', 'Expositions d''art chrétien
Ateliers créatifs
Vente d''œuvres locales
Événements culturels', 'Il a rempli Betsaleel de l''Esprit de Dieu, en sagesse, en intelligence, en science et en toute espèce d''ouvrage.', 'Exode 35:31', 'Partenariat pour des expositions communes lors de nos événements évangéliques.', '#B8860B', 2),
  ('grandmedias', 'Grand Médias', 'fas fa-tv', 'Médias & Communication', 'Un groupe de communication chrétien spécialisé dans la production audiovisuelle, la radio et les médias numériques au service de l''Évangile.', 'Amplifier la voix de l''Église à travers tous les canaux de communication modernes.', 'Production radio & TV
Podcasts chrétiens
Streaming d''événements
Réseaux sociaux', 'Publiez-le parmi les nations, annoncez-le ! Élevez un étendard, publiez-le !', 'Jérémie 50:2', 'Grand Médias diffuse nos veillées de prière et conférences sur ses plateformes.', '#7C3AED', 3),
  ('afrikart', 'Afrik Art Dance', 'fas fa-music', 'Danse & Louange', 'Une compagnie de danse chrétienne africaine qui exprime la louange et l''adoration à travers les arts chorégraphiques enracinés dans les traditions africaines.', 'Sanctifier les arts culturels africains pour la gloire de Dieu et l''édification du Corps de Christ.', 'Spectacles de danse prophétique
Formation chorégraphique
Ateliers culturels
Représentations évangéliques', 'Qu''il loue le Nom de l''Éternel en dansant, qu''il chante ses louanges avec le tambour et la harpe.', 'Psaume 149:3', 'Afrik Art Dance anime nos soirées de louange avec des chorégraphies prophétiques.', '#DC2626', 4),
  ('wely', 'Wely Transport', 'fas fa-bus', 'Transport & Logistique', 'Une entreprise de transport chrétienne qui met ses véhicules et sa logistique au service des missions évangéliques sur le terrain.', 'Faciliter la mobilité des équipes missionnaires pour un impact plus large sur le territoire.', 'Transport d''équipes missions
Location de véhicules
Logistique d''événements
Transferts aéroport', 'Allez par tout le monde et prêchez la bonne nouvelle à toute la création.', 'Marc 16:15', 'Wely Transport assure la mobilité de nos équipes terrain lors des campagnes d''évangélisation.', '#059669', 5),
  ('panivore', 'Panivore', 'fas fa-bread-slice', 'Alimentation & Social', 'Une boulangerie-pâtisserie chrétienne qui partage ses ressources avec les plus démunis. Chaque pain vendu contribue à nourrir une famille dans le besoin.', 'Incarner le partage du pain — au sens littéral et spirituel — dans la communauté.', 'Boulangerie artisanale
Distributions gratuites
Traiteur pour événements
Formation boulangerie', 'Je suis le pain de vie. Celui qui vient à moi n''aura jamais faim.', 'Jean 6:35', 'Panivore fournit les repas lors de nos actions sociales et événements communautaires.', '#D97706', 6);

insert into public.temoignages (nom, lieu, categorie, contenu, publier, statut) values
  ('Grace A.', 'Abidjan', 'Guérison', 'J''étais diagnostiquée avec une maladie grave que les médecins jugeaient incurable. Après des mois de prière avec l''équipe d''intercession de VPE, j''ai été examinée à nouveau — les médecins étaient stupéfaits. Dieu est réel et il guérit encore aujourd''hui.', true, 'approuve'),
  ('Konan F.', 'Bouaké', 'Famille', 'Mon mariage était au bord du gouffre après 7 ans de conflits non résolus. Suite au programme ''Saint-Esprit dans le Couple'', ma femme et moi avons trouvé une nouvelle dynamique. Aujourd''hui nous sommes plus forts qu''au premier jour.', true, 'approuve'),
  ('Mariama T.', 'Dakar, Sénégal', 'Délivrance', 'Pendant 3 ans j''ai vécu sous un joug invisible que je ne comprenais pas. La session de délivrance a été un tournant radical. J''ai ressenti quelque chose partir de moi. La liberté que je vis aujourd''hui est inexplicable autrement que par la puissance du Nom de Jésus.', true, 'approuve'),
  ('Emmanuel K.', 'Abidjan', 'Provision', 'Chômeur depuis 18 mois, j''avais perdu espoir. Une prière soumise au mur d''intercession en août... deux semaines plus tard j''avais une offre d''emploi que je n''avais même pas cherchée. Dieu pourvoit selon ses richesses.', true, 'approuve'),
  ('Christelle B.', 'France', 'Restauration', 'Depuis l''étranger, j''ai suivi les enseignements en ligne et soumis une demande de prière. Ma dépression sévère qui durait depuis 2 ans a commencé à se lever progressivement. La Parole de Dieu est vraiment une lampe pour mes pieds.', true, 'approuve');

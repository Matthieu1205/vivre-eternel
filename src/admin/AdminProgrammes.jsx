import { AdminTable } from './AdminCRUD'

const columns = [
  { key: 'ordre', label: '#' },
  { key: 'icon', label: 'Icône', render: v => v ? <i className={v} style={{ fontSize: '1.3rem', color: '#0284C7' }} /> : '—' },
  { key: 'label', label: 'Titre' },
  { key: 'horaire', label: 'Horaire' },
  { key: 'slug', label: 'Adresse', render: v => v ? <code style={{ fontSize: '.78rem' }}>/programmes/{v}</code> : '—' },
]

const fields = [
  { key: 'label', label: 'Titre du programme', placeholder: "L'Esprit Saint dans le Couple" },
  { key: 'slug', label: 'Identifiant d’URL', placeholder: 'couple', help: 'Minuscules et tirets uniquement. La page sera /programmes/<identifiant>.' },
  { key: 'ordre', label: 'Ordre d’affichage', type: 'number', placeholder: '1' },
  { key: 'icon', label: 'Icône (classe Font Awesome)', placeholder: 'fas fa-heart', help: 'Voir fontawesome.com/icons (version 6, gratuites).' },
  { key: 'horaire', label: 'Horaire', placeholder: 'Chaque vendredi · 19h30 – 21h' },
  { key: 'description', label: 'Description courte', type: 'textarea', placeholder: 'Brève description visible sur la carte…' },
  { key: 'detail', label: 'Détail complet', type: 'textarea', placeholder: 'Description complète du programme…' },
  { key: 'points', label: 'Ce que vous recevrez', type: 'textarea', placeholder: 'Enseignement de la Parole\nPrière en couple', help: 'Un point par ligne.' },
  { key: 'verse_text', label: 'Verset biblique (texte)', type: 'textarea', placeholder: 'Ce que Dieu a uni…' },
  { key: 'verse_ref', label: 'Référence du verset', placeholder: 'Matthieu 19:6' },
  { key: 'banner_url', label: 'Bannière (URL de l’image)', placeholder: 'https://… (copiez le lien depuis la Médiathèque)' },
  { key: 'logo_url', label: 'Logo (URL de l’image)', placeholder: 'https://…' },
]

const defaultRow = { label: '', slug: '', ordre: '', icon: 'fas fa-fire', horaire: '', description: '', detail: '', points: '', verse_text: '', verse_ref: '', banner_url: '', logo_url: '' }

export default function AdminProgrammes() {
  return <AdminTable title="Programmes" icon="fas fa-clipboard-list" tableName="programmes" columns={columns} fields={fields} defaultRow={defaultRow} />
}

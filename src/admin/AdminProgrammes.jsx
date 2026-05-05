import { AdminTable } from './AdminCRUD'

const columns = [
  { key: 'icon', label: 'Icône', render: v => <span style={{ fontSize: '1.5rem' }}>{v}</span> },
  { key: 'label', label: 'Titre' },
  { key: 'horaire', label: 'Horaire' },
  { key: 'desc', label: 'Description courte' },
]

const fields = [
  { key: 'icon', label: 'Icône (emoji)', placeholder: '💑' },
  { key: 'label', label: 'Titre du programme', placeholder: "L'Esprit Saint dans le Couple" },
  { key: 'horaire', label: 'Horaire', placeholder: 'Chaque vendredi · 19h30 – 21h' },
  { key: 'desc', label: 'Description courte', type: 'textarea', placeholder: 'Brève description visible sur la carte…' },
  { key: 'detail', label: 'Détail complet', type: 'textarea', placeholder: 'Description complète du programme…' },
  { key: 'verse_text', label: 'Verset biblique (texte)', type: 'textarea', placeholder: "Ce que Dieu a uni…" },
  { key: 'verse_ref', label: 'Référence du verset', placeholder: 'Matthieu 19:6' },
]

const defaultRow = { icon: '', label: '', horaire: '', desc: '', detail: '', verse_text: '', verse_ref: '' }

export default function AdminProgrammes() {
  return <AdminTable title="Programmes" icon="fas fa-clipboard-list" tableName="programmes" columns={columns} fields={fields} defaultRow={defaultRow} />
}

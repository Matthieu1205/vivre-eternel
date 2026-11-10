import { AdminTable } from './AdminCRUD'

const columns = [
  { key: 'ordre', label: '#' },
  { key: 'nom', label: 'Nom du partenaire' },
  { key: 'secteur', label: 'Secteur' },
  { key: 'slug', label: 'Adresse', render: v => v ? <code style={{ fontSize: '.78rem' }}>/partenaires/{v}</code> : '—' },
  { key: 'site_url', label: 'Site web', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: '#0284C7', fontSize: '.8rem' }}>Voir ↗</a> : '—' },
]

const fields = [
  { key: 'nom', label: 'Nom du partenaire', placeholder: 'Centre Espoir' },
  { key: 'slug', label: 'Identifiant d’URL', placeholder: 'espoir', help: 'Minuscules et tirets uniquement. La page sera /partenaires/<identifiant>.' },
  { key: 'ordre', label: 'Ordre d’affichage', type: 'number', placeholder: '1' },
  { key: 'icon', label: 'Icône (classe Font Awesome)', placeholder: 'fas fa-home' },
  { key: 'couleur', label: 'Couleur principale', type: 'color' },
  { key: 'secteur', label: 'Secteur d’activité', placeholder: 'Santé, Éducation, Commerce…' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Brève présentation du partenaire…' },
  { key: 'mission', label: 'Mission', type: 'textarea' },
  { key: 'services', label: 'Services & activités', type: 'textarea', help: 'Un service par ligne.' },
  { key: 'collab', label: 'Notre collaboration', type: 'textarea' },
  { key: 'verse_text', label: 'Verset biblique (texte)', type: 'textarea' },
  { key: 'verse_ref', label: 'Référence du verset', placeholder: 'Psaume 41:1' },
  { key: 'site_url', label: 'Site web (URL)', placeholder: 'https://…' },
  { key: 'logo_url', label: 'Logo (URL)', placeholder: 'https://…' },
  { key: 'contact', label: 'Contact', placeholder: 'Email ou téléphone' },
]

const defaultRow = { nom: '', slug: '', ordre: '', icon: 'fas fa-handshake', couleur: '#0284C7', secteur: '', description: '', mission: '', services: '', collab: '', verse_text: '', verse_ref: '', site_url: '', logo_url: '', contact: '' }

export default function AdminPartenaires() {
  return <AdminTable title="Partenaires" icon="fas fa-handshake" tableName="partenaires" columns={columns} fields={fields} defaultRow={defaultRow} />
}

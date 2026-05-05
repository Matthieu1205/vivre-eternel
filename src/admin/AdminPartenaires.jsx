import { AdminTable } from './AdminCRUD'

const columns = [
  { key: 'nom', label: 'Nom du partenaire' },
  { key: 'secteur', label: 'Secteur' },
  { key: 'description', label: 'Description' },
  { key: 'site_url', label: 'Site web', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: '#0284C7', fontSize: '.8rem' }}>Voir ↗</a> : '—' },
]

const fields = [
  { key: 'nom', label: 'Nom du partenaire', placeholder: 'Centre Espoir' },
  { key: 'secteur', label: 'Secteur d\'activité', placeholder: 'Santé, Éducation, Commerce…' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Brève présentation du partenaire…' },
  { key: 'site_url', label: 'Site web (URL)', placeholder: 'https://…' },
  { key: 'logo_url', label: 'Logo (URL)', placeholder: 'https://…' },
  { key: 'contact', label: 'Contact', placeholder: 'Email ou téléphone' },
]

const defaultRow = { nom: '', secteur: '', description: '', site_url: '', logo_url: '', contact: '' }

export default function AdminPartenaires() {
  return <AdminTable title="Partenaires" icon="fas fa-handshake" tableName="partenaires" columns={columns} fields={fields} defaultRow={defaultRow} />
}

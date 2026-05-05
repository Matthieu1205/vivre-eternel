import { AdminTable } from './AdminCRUD'

const CATEGORIES = {
  terrain:   { label: 'Terrain',   color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', icon: 'fas fa-leaf' },
  social:    { label: 'Social',    color: '#0369a1', bg: '#eff6ff', border: '#bae6fd', icon: 'fas fa-handshake' },
  evenement: { label: 'Événement', color: '#b45309', bg: '#fffbeb', border: '#fde68a', icon: 'fas fa-calendar-alt' },
  galerie:   { label: 'Galerie',   color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', icon: 'fas fa-image' },
}

const columns = [
  {
    key: 'categorie', label: 'Catégorie',
    render: v => {
      const c = CATEGORIES[v] || { label: v, color: '#374151', bg: '#f1f5f9', border: '#e2e8f0', icon: '•' }
      return (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '.35rem',
          padding: '.28rem .75rem',
          background: c.bg, border: `1px solid ${c.border}`,
          borderRadius: 20, fontSize: '.75rem', fontWeight: 700, color: c.color,
          whiteSpace: 'nowrap',
        }}>
          <i className={c.icon} style={{ marginRight: '.35rem' }} />{c.label}
        </span>
      )
    }
  },
  { key: 'titre', label: 'Titre' },
  { key: 'date',  label: 'Date' },
  { key: 'lieu',  label: 'Lieu' },
]

const fields = [
  { key: 'categorie',   label: 'Catégorie',          type: 'select', options: ['terrain', 'social', 'evenement', 'galerie'] },
  { key: 'titre',       label: "Titre de l'activité", placeholder: 'Évangélisation au marché de…' },
  { key: 'description', label: 'Description',         type: 'textarea', placeholder: "Détails de l'activité…" },
  { key: 'date',        label: 'Date',                type: 'date' },
  { key: 'lieu',        label: 'Lieu',                placeholder: 'Abidjan, Modeste Nouveau Goudron' },
  { key: 'image_url',   label: 'Lien image (URL)',    placeholder: 'https://…' },
]

const defaultRow = { categorie: 'terrain', titre: '', description: '', date: '', lieu: '', image_url: '' }

export default function AdminActivites() {
  return <AdminTable title="Activités & Actions" icon="fas fa-globe" tableName="activites" columns={columns} fields={fields} defaultRow={defaultRow} />
}

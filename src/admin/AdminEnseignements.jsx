import { AdminTable } from './AdminCRUD'

const columns = [
  { key: 'type', label: 'Type', render: v => {
    const map = { audio: 'fas fa-headphones', video: 'fas fa-video', article: 'fas fa-pen-nib', verset: 'fas fa-book-open' }
    return <span style={{ padding: '.2rem .6rem', background: '#eff6ff', borderRadius: 20, fontSize: '.78rem', fontWeight: 700, color: '#0284C7', display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><i className={map[v] || 'fas fa-file'} />{v}</span>
  }},
  { key: 'titre', label: 'Titre' },
  { key: 'auteur', label: 'Auteur / Prédicateur' },
  { key: 'date', label: 'Date' },
  { key: 'url', label: 'Lien', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: '#0284C7', fontSize: '.8rem' }}>Ouvrir ↗</a> : '—' },
]

const fields = [
  { key: 'type', label: 'Type', type: 'select', options: ['audio', 'video', 'article', 'verset'] },
  { key: 'titre', label: 'Titre', placeholder: 'La puissance de la prière' },
  { key: 'auteur', label: 'Auteur / Prédicateur', placeholder: 'Nom du prédicateur' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Résumé de l\'enseignement…' },
  { key: 'url', label: 'Lien (URL audio/vidéo/article)', placeholder: 'https://…' },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'duree', label: 'Durée (ex: 45 min)', placeholder: '45 min' },
]

const defaultRow = { type: 'audio', titre: '', auteur: '', description: '', url: '', date: '', duree: '' }

export default function AdminEnseignements() {
  return <AdminTable title="Enseignements" icon="fas fa-headphones" tableName="enseignements" columns={columns} fields={fields} defaultRow={defaultRow} />
}

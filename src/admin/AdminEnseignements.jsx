import { AdminTable } from './AdminCRUD'

const columns = [
  { key: 'type', label: 'Type', render: v => {
    const map = { audio: 'fas fa-headphones', video: 'fas fa-video', article: 'fas fa-pen-nib', verset: 'fas fa-book-open' }
    return <span style={{ padding: '.2rem .6rem', background: '#eff6ff', borderRadius: 20, fontSize: '.78rem', fontWeight: 700, color: '#0284C7', display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><i className={map[v] || 'fas fa-file'} />{v}</span>
  }},
  { key: 'titre', label: 'Titre / Référence' },
  { key: 'auteur', label: 'Auteur / Prédicateur' },
  { key: 'date', label: 'Date' },
  { key: 'url', label: 'Lien', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: '#0284C7', fontSize: '.8rem' }}>Ouvrir ↗</a> : '—' },
]

const fields = [
  { key: 'type', label: 'Type', type: 'select', options: ['audio', 'video', 'article', 'verset'] },
  { key: 'titre', label: 'Titre (ou référence pour un verset)', placeholder: 'La puissance de la prière — ou — Jean 3:16' },
  { key: 'auteur', label: 'Auteur / Prédicateur', placeholder: 'Nom du prédicateur' },
  { key: 'categorie', label: 'Série, catégorie ou thème', placeholder: 'Vie Chrétienne' },
  { key: 'description', label: 'Description (extrait d’article ou texte du verset)', type: 'textarea', placeholder: 'Résumé de l’enseignement…' },
  { key: 'url', label: 'Lien (URL audio/vidéo/article)', placeholder: 'https://…' },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'duree', label: 'Durée (ex: 45 min)', placeholder: '45 min' },
  { key: 'lieu', label: 'Lieu (vidéos)', placeholder: 'Abidjan' },
]

const defaultRow = { type: 'audio', titre: '', auteur: '', categorie: '', description: '', url: '', date: '', duree: '', lieu: '' }

export default function AdminEnseignements() {
  return <AdminTable title="Enseignements" icon="fas fa-headphones" tableName="enseignements" columns={columns} fields={fields} defaultRow={defaultRow} />
}

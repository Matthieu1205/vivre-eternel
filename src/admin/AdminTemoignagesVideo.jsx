import { AdminTable } from './AdminCRUD'

const columns = [
  { key: 'ordre', label: '#' },
  { key: 'nom', label: 'Titre / personne' },
  { key: 'categorie', label: 'Catégorie' },
  { key: 'duree', label: 'Durée' },
  { key: 'url', label: 'Vidéo', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: '#0284C7', fontSize: '.8rem' }}>Voir ↗</a> : '—' },
]

const fields = [
  { key: 'nom', label: 'Titre ou nom de la personne', placeholder: 'Frère Paul M.' },
  { key: 'categorie', label: 'Catégorie', placeholder: 'Guérison, Famille, Délivrance…' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Comment Dieu m’a sauvé…' },
  { key: 'url', label: 'Lien de la vidéo', placeholder: 'https://www.youtube.com/watch?v=…', help: 'Lien YouTube (la vidéo s’affiche directement sur le site), Facebook, ou lien d’un fichier .mp4.' },
  { key: 'duree', label: 'Durée', placeholder: '8 min' },
  { key: 'ordre', label: 'Ordre d’affichage', type: 'number', placeholder: '1' },
]

const defaultRow = { nom: '', categorie: '', description: '', url: '', duree: '', ordre: '' }

export default function AdminTemoignagesVideo() {
  return <AdminTable title="Témoignages vidéo" icon="fas fa-video" tableName="temoignages_video" columns={columns} fields={fields} defaultRow={defaultRow} />
}

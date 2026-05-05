import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const BUCKETS = [
  { id: 'images', label: 'Images', icon: 'fas fa-image', accept: 'image/*', color: '#0284C7' },
  { id: 'logos', label: 'Logos', icon: 'fas fa-tag', accept: 'image/*', color: '#7C3AED' },
  { id: 'audio', label: 'Audio', icon: 'fas fa-headphones', accept: 'audio/*', color: '#059669' },
  { id: 'documents', label: 'Documents', icon: 'fas fa-file-alt', accept: '.pdf,.doc,.docx', color: '#D97706' },
]

function formatSize(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function FileCard({ file, bucket, onDelete, onCopy }) {
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
    file.name.split('.').pop().toLowerCase()
  )
  const publicUrl = supabase.storage.from(bucket).getPublicUrl(file.name).data.publicUrl

  return (
    <div style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,.07)', transition: 'transform .15s, box-shadow .15s',
      display: 'flex', flexDirection: 'column'
    }}
      onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.1)' }}
      onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.07)' }}
    >
      {/* Aperçu */}
      <div style={{ height: 140, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {isImage ? (
          <img src={publicUrl} alt={file.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '3rem' }}>
            {bucket === 'audio' ? <i className="fas fa-headphones" style={{ fontSize: '3rem' }} /> : <i className="fas fa-file-alt" style={{ fontSize: '3rem' }} />}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
        <p style={{ margin: 0, fontSize: '.78rem', fontWeight: 700, color: '#0c1a2e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={file.name}>
          {file.name}
        </p>
        <p style={{ margin: 0, fontSize: '.72rem', color: '#94a3b8' }}>{formatSize(file.metadata?.size)}</p>
      </div>

      {/* Actions */}
      <div style={{ padding: '.5rem .75rem', display: 'flex', gap: '.4rem', borderTop: '1px solid #f1f5f9' }}>
        <button onClick={() => onCopy(publicUrl)}
          style={{ flex: 1, padding: '.4rem', background: '#eff6ff', color: '#0284C7', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '.72rem', fontWeight: 700 }}>
          <i className="fas fa-copy" /> Copier URL
        </button>
        {isImage && (
          <a href={publicUrl} target="_blank" rel="noreferrer"
            style={{ padding: '.4rem .6rem', background: '#f0fdf4', color: '#059669', textDecoration: 'none', borderRadius: 6, fontSize: '.72rem', fontWeight: 700 }}>
            <i className="fas fa-eye" />
          </a>
        )}
        <button onClick={() => onDelete(file.name)}
          style={{ padding: '.4rem .6rem', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '.72rem', fontWeight: 700 }}>
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  )
}

export default function AdminMediatheque() {
  const [activeBucket, setActiveBucket] = useState('images')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef(null)

  useEffect(() => { fetchFiles() }, [activeBucket])

  async function fetchFiles() {
    setLoading(true)
    setSearch('')
    const { data, error } = await supabase.storage.from(activeBucket).list('', {
      limit: 200, sortBy: { column: 'created_at', order: 'desc' }
    })
    if (!error) setFiles(data?.filter(f => f.name !== '.emptyFolderPlaceholder') || [])
    setLoading(false)
  }

  async function uploadFiles(fileList) {
    setUploading(true)
    const total = fileList.length
    let done = 0
    for (const file of fileList) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const fileName = `${Date.now()}_${safeName}`
      await supabase.storage.from(activeBucket).upload(fileName, file, { upsert: false })
      done++
      setProgress(Math.round((done / total) * 100))
    }
    setUploading(false)
    setProgress(0)
    fetchFiles()
  }

  async function deleteFile(name) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    await supabase.storage.from(activeBucket).remove([name])
    setFiles(f => f.filter(x => x.name !== name))
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = Array.from(e.dataTransfer.files)
    if (dropped.length) uploadFiles(dropped)
  }

  const bucket = BUCKETS.find(b => b.id === activeBucket)
  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#0c1a2e' }}><i className="fas fa-folder-open" /> Médiathèque</h1>
          <p style={{ margin: '.25rem 0 0', color: '#64748b', fontSize: '.85rem' }}>
            {files.length} fichier(s) dans {bucket?.label}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
          <input placeholder="Rechercher…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '.6rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '.85rem', width: 180, outline: 'none' }} />
          <button onClick={() => inputRef.current?.click()}
            style={{ padding: '.65rem 1.25rem', background: '#0284C7', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '.88rem' }}>
            <i className="fas fa-cloud-upload-alt" /> Uploader
          </button>
          <input ref={inputRef} type="file" multiple accept={bucket?.accept}
            style={{ display: 'none' }} onChange={e => uploadFiles(Array.from(e.target.files))} />
        </div>
      </div>

      {/* Tabs buckets */}
      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {BUCKETS.map(b => (
          <button key={b.id} onClick={() => setActiveBucket(b.id)}
            style={{
              padding: '.55rem 1.1rem', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '.85rem', display: 'flex', alignItems: 'center', gap: '.4rem',
              background: activeBucket === b.id ? b.color : '#f1f5f9',
              color: activeBucket === b.id ? '#fff' : '#374151',
              transition: 'all .15s'
            }}>
            <i className={b.icon} /> {b.label}
          </button>
        ))}
      </div>

      {/* Zone drag & drop */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? bucket?.color : '#cbd5e1'}`,
          borderRadius: 16, padding: '1.5rem', textAlign: 'center', cursor: 'pointer',
          background: dragOver ? '#eff6ff' : '#fafafa', marginBottom: '1.5rem',
          transition: 'all .2s'
        }}>
        {uploading ? (
          <div>
            <p style={{ margin: '0 0 .75rem', fontWeight: 700, color: '#0284C7' }}>Upload en cours… {progress}%</p>
            <div style={{ height: 8, background: '#e2e8f0', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: bucket?.color, borderRadius: 100, transition: 'width .3s' }} />
            </div>
          </div>
        ) : (
          <>
            <p style={{ margin: 0, fontSize: '1.5rem' }}><i className="fas fa-cloud-upload-alt" style={{ fontSize: '1.5rem' }} /></p>
            <p style={{ margin: '.35rem 0 0', color: '#64748b', fontSize: '.88rem' }}>
              Glisse-dépose tes fichiers ici ou <strong style={{ color: bucket?.color }}>clique pour choisir</strong>
            </p>
            <p style={{ margin: '.25rem 0 0', color: '#94a3b8', fontSize: '.75rem' }}>
              Formats acceptés : {bucket?.accept}
            </p>
          </>
        )}
      </div>

      {/* Notification copie */}
      {copied && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          background: '#0c1a2e', color: '#fff', padding: '.75rem 1.25rem',
          borderRadius: 10, fontWeight: 600, fontSize: '.85rem', boxShadow: '0 8px 24px rgba(0,0,0,.2)'
        }}>
          <i className="fas fa-check-circle" /> URL copiée dans le presse-papier !
        </div>
      )}

      {/* Grille fichiers */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Chargement…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: 16, color: '#94a3b8' }}>
          <i className="fas fa-inbox" style={{ fontSize: '2rem', display: 'block', margin: '0 0 .5rem' }} />
          <p style={{ margin: 0 }}>{search ? 'Aucun fichier trouvé.' : 'Aucun fichier dans ce dossier.'}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {filtered.map(file => (
            <FileCard key={file.name} file={file} bucket={activeBucket} onDelete={deleteFile} onCopy={copyUrl} />
          ))}
        </div>
      )}
    </div>
  )
}

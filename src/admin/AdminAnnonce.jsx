import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const focusStyle = { borderColor: '#dc2626', boxShadow: '0 0 0 3px rgba(220,38,38,.12)' }
const blurStyle  = { borderColor: '#e2e8f0', boxShadow: 'none' }
const inputBase  = {
  width: '100%', padding: '.8rem 1rem', border: '1.5px solid #e2e8f0',
  borderRadius: 10, fontSize: '.9rem', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff',
  transition: 'border-color .15s, box-shadow .15s',
}

function status(row) {
  const now = new Date(), debut = new Date(row.date_debut), fin = new Date(row.date_fin)
  if (now < debut) return { label: 'Planifiée', color: '#b45309', bg: '#fffbeb', border: '#fde68a' }
  if (now > fin)   return { label: 'Expirée',   color: '#6b7280', bg: '#f1f5f9', border: '#e2e8f0' }
  return              { label: 'Active',     color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' }
}

function fmt(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const empty = { titre: '', message: '', date_debut: '', date_fin: '', image_url: '' }

export default function AdminAnnonce() {
  const [rows, setRows]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(empty)
  const [saving, setSaving]     = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [confirmDel, setConfirmDel] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => { loadRows() }, [])

  async function loadRows() {
    setLoading(true)
    const { data } = await supabase.from('annonces').select('*').order('date_debut', { ascending: false })
    setRows(data || [])
    setLoading(false)
  }

  function openNew()     { setForm(empty); setEditing('new') }
  function openEdit(row) { setForm({ ...row }); setEditing(row) }
  function cancelEdit()  { setEditing(null); setForm(empty) }
  const setF = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  /* ── Upload image ── */
  async function uploadImage(file) {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowed.includes(file.type)) { alert('Format non supporté. Utilisez JPG, PNG ou WEBP.'); return }
    if (file.size > 5 * 1024 * 1024)  { alert('Fichier trop lourd (max 5 Mo).'); return }

    setUploading(true)
    const ext      = file.name.split('.').pop()
    const fileName = `annonces/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: false })
    if (error) { alert('Erreur upload : ' + error.message); setUploading(false); return }

    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    setForm(p => ({ ...p, image_url: data.publicUrl }))
    setUploading(false)
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) uploadImage(file)
    e.target.value = ''
  }

  function handleDrop(e) {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadImage(file)
  }

  function removeImage() { setForm(p => ({ ...p, image_url: '' })) }

  /* ── Save / Delete ── */
  async function save() {
    setSaving(true)
    if (editing === 'new') {
      await supabase.from('annonces').insert([{ ...form, created_at: new Date().toISOString() }])
    } else {
      await supabase.from('annonces').update(form).eq('id', form.id)
    }
    await loadRows(); cancelEdit(); setSaving(false)
  }

  async function del(id) {
    setDeleting(id)
    await supabase.from('annonces').delete().eq('id', id)
    setRows(r => r.filter(x => x.id !== id))
    setDeleting(null); setConfirmDel(null)
  }

  const activeCount = rows.filter(r => {
    const now = new Date()
    return now >= new Date(r.date_debut) && now <= new Date(r.date_fin)
  }).length

  const canSave = !saving && !uploading && form.titre && form.date_debut && form.date_fin

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f1f5f9' }}>

      {/* ── Header ── */}
      <div style={{
        background: 'linear-gradient(135deg,#7c1a1a,#dc2626)',
        borderRadius: 20, padding: '1.75rem 2rem', marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        boxShadow: '0 6px 28px rgba(220,38,38,.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}><i className="fas fa-exclamation-circle" /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>Annonces Urgentes</h1>
            <p style={{ margin: '.15rem 0 0', color: 'rgba(255,255,255,.7)', fontSize: '.82rem' }}>
              {activeCount > 0 ? `${activeCount} annonce${activeCount > 1 ? 's' : ''} active${activeCount > 1 ? 's' : ''}` : 'Aucune annonce active en ce moment'}
            </p>
          </div>
        </div>
        <button onClick={openNew} style={{
          padding: '.7rem 1.4rem', background: '#fff', color: '#dc2626',
          border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer',
          fontSize: '.88rem', display: 'flex', alignItems: 'center', gap: '.45rem',
          boxShadow: '0 2px 8px rgba(0,0,0,.12)',
        }}>
          <i className="fas fa-plus" /> Nouvelle annonce
        </button>
      </div>

      {/* ── Info ── */}
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.75rem' }}>
        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}><i className="fas fa-lightbulb" /></span>
        <p style={{ margin: 0, fontSize: '.85rem', color: '#92400e', lineHeight: 1.6 }}>
          Une annonce active (date début ≤ aujourd&apos;hui ≤ date fin) s&apos;affiche en <strong>popup</strong> dès qu&apos;un visiteur arrive sur le site. Vous pouvez y joindre une <strong>affiche</strong> (JPG, PNG — max 5 Mo).
        </p>
      </div>

      {/* ── Liste ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}><i className="fas fa-spinner fa-spin" /> Chargement…</div>
      ) : rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
          <i className="fas fa-inbox" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem', color: '#cbd5e1' }} />
          <p style={{ margin: 0, fontWeight: 600 }}>Aucune annonce créée.</p>
          <p style={{ margin: '.35rem 0 0', fontSize: '.85rem' }}>Cliquez sur « Nouvelle annonce » pour commencer.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {rows.map(row => {
            const st = status(row)
            const isActive = st.label === 'Active'
            return (
              <div key={row.id} style={{
                background: '#fff', borderRadius: 16,
                boxShadow: isActive ? '0 4px 20px rgba(5,150,105,.12)' : '0 2px 8px rgba(0,0,0,.05)',
                border: isActive ? '2px solid #a7f3d0' : '1px solid #f1f5f9',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: row.image_url ? '160px 1fr' : '1fr',
              }}>
                {/* Affiche miniature */}
                {row.image_url && (
                  <div style={{ background: '#f1f5f9', position: 'relative' }}>
                    <img src={row.image_url} alt="affiche" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 120 }} />
                  </div>
                )}

                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: st.bg, border: `1px solid ${st.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                    {st.label === 'Active' ? <i className="fas fa-circle" style={{ color: '#059669' }} /> : st.label === 'Planifiée' ? <i className="fas fa-circle" style={{ color: '#b45309' }} /> : <i className="fas fa-circle" style={{ color: '#9ca3af' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap', marginBottom: '.35rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{row.titre}</h3>
                      <span style={{ padding: '.18rem .65rem', background: st.bg, border: `1px solid ${st.border}`, borderRadius: 20, fontSize: '.7rem', fontWeight: 700, color: st.color }}>{st.label}</span>
                      {row.image_url && <span style={{ fontSize: '.7rem', color: '#7c3aed', fontWeight: 600, background: '#f5f3ff', padding: '.18rem .65rem', borderRadius: 20, border: '1px solid #ddd6fe' }}><i className="fas fa-image" /> Affiche</span>}
                    </div>
                    <p style={{ margin: '0 0 .6rem', fontSize: '.85rem', color: '#64748b', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.message || <em>Aucun texte</em>}
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '.75rem', color: '#94a3b8' }}>
                      <span><i className="fas fa-calendar-alt" /> Du <strong style={{ color: '#475569' }}>{fmt(row.date_debut)}</strong> au <strong style={{ color: '#475569' }}>{fmt(row.date_fin)}</strong></span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
                    <button onClick={() => openEdit(row)} style={{ padding: '.42rem .85rem', background: '#eff6ff', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: 8, cursor: 'pointer', fontSize: '.78rem', fontWeight: 600 }}><i className="fas fa-pen" /> Modifier</button>
                    <button onClick={() => setConfirmDel(row.id)} style={{ padding: '.42rem .85rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer', fontSize: '.78rem', fontWeight: 600 }}><i className="fas fa-trash-alt" /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Confirm delete ── */}
      {confirmDel !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.55)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) setConfirmDel(null) }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '2.25rem', width: '100%', maxWidth: 380, boxShadow: '0 32px 80px rgba(0,0,0,.25)', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 1.25rem' }}><i className="fas fa-trash-alt" /></div>
            <h3 style={{ margin: '0 0 .5rem', fontSize: '1.1rem', fontWeight: 800 }}>Supprimer l&apos;annonce ?</h3>
            <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '.88rem' }}>Cette action est irréversible.</p>
            <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
              <button onClick={() => setConfirmDel(null)} style={{ padding: '.7rem 1.5rem', background: '#f1f5f9', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Annuler</button>
              <button onClick={() => del(confirmDel)} style={{ padding: '.7rem 1.5rem', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>
                {deleting ? '…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal ajout / édition ── */}
      {editing !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) cancelEdit() }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 600, maxHeight: '94vh', overflow: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,.22)' }}>

            {/* Header modal */}
            <div style={{ background: 'linear-gradient(135deg,#7c1a1a,#dc2626)', padding: '1.5rem 1.75rem', borderRadius: '20px 20px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                {editing === 'new' ? <><i className="fas fa-exclamation-circle" /> Nouvelle annonce urgente</> : <><i className="fas fa-pen" /> Modifier l'annonce</>}
              </h2>
              <button onClick={cancelEdit} style={{ background: 'rgba(255,255,255,.18)', border: 'none', cursor: 'pointer', color: '#fff', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.95rem' }}><i className="fas fa-times" /></button>
            </div>

            <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Titre */}
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '.45rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>Titre de l&apos;annonce</label>
                <input type="text" value={form.titre} onChange={setF('titre')} placeholder="Ex : Veillée de prière — Vendredi 10 mai"
                  style={inputBase}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e =>  Object.assign(e.target.style, blurStyle)} />
              </div>

              {/* Message */}
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '.45rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>Message (optionnel)</label>
                <textarea value={form.message} onChange={setF('message')} rows={3} placeholder="Détails supplémentaires sur l'annonce…"
                  style={{ ...inputBase, resize: 'vertical', lineHeight: 1.65 }}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e =>  Object.assign(e.target.style, blurStyle)} />
              </div>

              {/* Dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[{ k: 'date_debut', label: 'Date de début' }, { k: 'date_fin', label: 'Date de fin' }].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize: '.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '.45rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>{f.label}</label>
                    <input type="date" value={form[f.k]} onChange={setF(f.k)}
                      style={inputBase}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e =>  Object.assign(e.target.style, blurStyle)} />
                  </div>
                ))}
              </div>

              {/* ── Upload affiche ── */}
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '.45rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  Affiche / Image (optionnel)
                </label>

                {form.image_url ? (
                  /* Aperçu de l'image uploadée */
                  <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '2px solid #a7f3d0' }}>
                    <img src={form.image_url} alt="affiche" style={{ width: '100%', maxHeight: 280, objectFit: 'contain', display: 'block', background: '#f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '.75rem', right: '.75rem', display: 'flex', gap: '.5rem' }}>
                      <button onClick={() => fileRef.current?.click()} style={{ padding: '.4rem .8rem', background: 'rgba(255,255,255,.95)', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '.78rem', fontWeight: 700, color: '#374151' }}>
                        <i className="fas fa-sync-alt" /> Changer
                      </button>
                      <button onClick={removeImage} style={{ padding: '.4rem .8rem', background: 'rgba(220,38,38,.9)', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '.78rem', fontWeight: 700, color: '#fff' }}>
                        <i className="fas fa-times" /> Retirer
                      </button>
                    </div>
                    <div style={{ position: 'absolute', bottom: '.75rem', left: '.75rem' }}>
                      <span style={{ background: 'rgba(5,150,105,.9)', color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '.3rem .7rem', borderRadius: 20 }}><i className="fas fa-check" /> Image chargée</span>
                    </div>
                  </div>
                ) : (
                  /* Zone drag & drop */
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => !uploading && fileRef.current?.click()}
                    style={{
                      border: `2px dashed ${dragOver ? '#dc2626' : '#e2e8f0'}`,
                      borderRadius: 12, padding: '2rem', textAlign: 'center',
                      cursor: uploading ? 'wait' : 'pointer',
                      background: dragOver ? '#fef2f2' : '#fafafa',
                      transition: 'all .2s',
                    }}
                  >
                    {uploading ? (
                      <div>
                        <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}><i className="fas fa-spinner fa-spin" /></div>
                        <p style={{ margin: 0, fontWeight: 700, color: '#dc2626', fontSize: '.9rem' }}>Upload en cours…</p>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}><i className="fas fa-image" /></div>
                        <p style={{ margin: '0 0 .4rem', fontWeight: 700, color: '#374151', fontSize: '.9rem' }}>
                          Glisse ton affiche ici ou <span style={{ color: '#dc2626' }}>clique pour choisir</span>
                        </p>
                        <p style={{ margin: 0, fontSize: '.78rem', color: '#94a3b8' }}>JPG, PNG, WEBP · max 5 Mo</p>
                      </>
                    )}
                  </div>
                )}

                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/jpg,image/webp"
                  style={{ display: 'none' }} onChange={handleFileChange} />
              </div>

              {/* ── Aperçu popup ── */}
              {form.titre && (
                <div style={{ background: '#fef2f2', border: '1.5px dashed #fca5a5', borderRadius: 12, padding: '1.25rem' }}>
                  <p style={{ margin: '0 0 .75rem', fontSize: '.72rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                    <i className="fas fa-eye" /> Aperçu du popup visiteur
                  </p>
                  {form.image_url && (
                    <img src={form.image_url} alt="" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8, marginBottom: '.75rem', display: 'block' }} />
                  )}
                  <p style={{ margin: '0 0 .35rem', fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{form.titre}</p>
                  {form.message && <p style={{ margin: 0, fontSize: '.85rem', color: '#475569', lineHeight: 1.6 }}>{form.message}</p>}
                </div>
              )}

              {/* Boutons */}
              <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
                <button onClick={cancelEdit} style={{ padding: '.75rem 1.5rem', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Annuler</button>
                <button onClick={save} disabled={!canSave} style={{
                  padding: '.75rem 1.75rem',
                  background: canSave ? 'linear-gradient(135deg,#7c1a1a,#dc2626)' : '#fca5a5',
                  color: '#fff', border: 'none', borderRadius: 10,
                  cursor: canSave ? 'pointer' : 'not-allowed',
                  fontWeight: 700, boxShadow: canSave ? '0 4px 14px rgba(220,38,38,.3)' : 'none',
                }}>
                  {saving ? <><i className="fas fa-spinner fa-spin" /> Enregistrement…</> : uploading ? <><i className="fas fa-spinner fa-spin" /> Upload…</> : <><i className="fas fa-check" /> Enregistrer</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

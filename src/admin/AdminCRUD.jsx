import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const focusStyle = { borderColor: '#0284C7', boxShadow: '0 0 0 3px rgba(2,132,199,.12)' }
const blurStyle  = { borderColor: '#e2e8f0', boxShadow: 'none' }

const inputBase = {
  width: '100%', padding: '.8rem 1rem',
  border: '1.5px solid #e2e8f0', borderRadius: 10,
  fontSize: '.9rem', outline: 'none',
  boxSizing: 'border-box', transition: 'border-color .15s, box-shadow .15s',
  fontFamily: 'inherit', background: '#fff',
}

export function AdminTable({ title, icon, tableName, columns, fields, defaultRow }) {
  const [rows, setRows]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState({})
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)
  const [search, setSearch]     = useState('')

  useEffect(() => { fetchData() }, [tableName])

  async function fetchData() {
    setLoading(true)
    const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false })
    if (!error) setRows(data || [])
    setLoading(false)
  }

  function openNew()  { setForm(defaultRow); setEditing('new') }
  function openEdit(row) { setForm({ ...row }); setEditing(row) }
  function cancelEdit()  { setEditing(null); setForm({}) }

  async function save() {
    setSaving(true)
    if (editing === 'new') {
      const { error } = await supabase.from(tableName).insert([{ ...form, created_at: new Date().toISOString() }])
      if (!error) { fetchData(); cancelEdit() }
    } else {
      const { error } = await supabase.from(tableName).update(form).eq('id', form.id)
      if (!error) { fetchData(); cancelEdit() }
    }
    setSaving(false)
  }

  async function deleteRow(id) {
    setDeleting(id)
    await supabase.from(tableName).delete().eq('id', id)
    setRows(r => r.filter(x => x.id !== id))
    setDeleting(null)
    setConfirmDel(null)
  }

  const filtered = rows.filter(r =>
    Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f1f5f9' }}>

      {/* ── Header ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%)',
        borderRadius: 20, padding: '1.75rem 2rem',
        marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        boxShadow: '0 6px 28px rgba(2,132,199,.22)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'rgba(255,255,255,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><i className={icon} style={{ fontSize: '1.25rem', color: '#fff' }} /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>{title}</h1>
            <p style={{ margin: '.15rem 0 0', color: 'rgba(255,255,255,.65)', fontSize: '.82rem' }}>
              {rows.length} enregistrement{rows.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button onClick={openNew} style={{
          padding: '.7rem 1.4rem', background: '#fff', color: '#0369a1',
          border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer',
          fontSize: '.88rem', display: 'flex', alignItems: 'center', gap: '.45rem',
          boxShadow: '0 2px 8px rgba(0,0,0,.12)', transition: 'opacity .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <i className="fas fa-plus" /> Ajouter
        </button>
      </div>

      {/* ── Search ── */}
      <div style={{ marginBottom: '1.25rem', position: 'relative', maxWidth: 360 }}>
        <i className="fas fa-search" style={{ position: 'absolute', left: '.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', fontSize: '.85rem' }} />
        <input
          placeholder="Rechercher…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            ...inputBase,
            paddingLeft: '2.5rem',
            boxShadow: '0 1px 4px rgba(0,0,0,.05)',
          }}
          onFocus={e => Object.assign(e.target.style, focusStyle)}
          onBlur={e =>  Object.assign(e.target.style, blurStyle)}
        />
      </div>

      {/* ── Table ── */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.8rem', marginBottom: '.75rem', display: 'block' }} />
            <p style={{ margin: 0, fontSize: '.9rem', fontWeight: 500 }}>Chargement…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
            <i className="fas fa-inbox" style={{ fontSize: '2.5rem', margin: '0 0 1rem', display: 'block', color: '#cbd5e1' }} />
            <p style={{ margin: 0, fontWeight: 600, fontSize: '.95rem', color: '#475569' }}>Aucun contenu pour le moment.</p>
            <p style={{ margin: '.35rem 0 0', fontSize: '.83rem' }}>Cliquez sur « Ajouter » pour commencer.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {columns.map(c => (
                    <th key={c.key} style={{
                      padding: '1rem 1.5rem', textAlign: 'left',
                      fontSize: '.7rem', fontWeight: 700, color: '#64748b',
                      textTransform: 'uppercase', letterSpacing: '.09em', whiteSpace: 'nowrap',
                    }}>{c.label}</th>
                  ))}
                  <th style={{
                    padding: '1rem 1.5rem', textAlign: 'right',
                    fontSize: '.7rem', fontWeight: 700, color: '#64748b',
                    textTransform: 'uppercase', letterSpacing: '.09em',
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={row.id}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background .12s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {columns.map(c => (
                      <td key={c.key} style={{ padding: '1rem 1.5rem', fontSize: '.88rem', color: '#334155', maxWidth: 280 }}>
                        {c.render ? c.render(row[c.key], row) : (
                          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {row[c.key] || <span style={{ color: '#cbd5e1' }}>—</span>}
                          </span>
                        )}
                      </td>
                    ))}
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button onClick={() => openEdit(row)} style={{
                        padding: '.42rem .95rem', background: '#eff6ff', color: '#0369a1',
                        border: '1px solid #bae6fd', borderRadius: 8,
                        cursor: 'pointer', fontSize: '.78rem', fontWeight: 600, marginRight: '.5rem',
                        transition: 'background .12s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = '#dbeafe'}
                        onMouseLeave={e => e.currentTarget.style.background = '#eff6ff'}
                      ><i className="fas fa-pen" /> Modifier</button>
                      <button onClick={() => setConfirmDel(row.id)} disabled={deleting === row.id} style={{
                        padding: '.42rem .95rem', background: '#fef2f2', color: '#dc2626',
                        border: '1px solid #fecaca', borderRadius: 8,
                        cursor: 'pointer', fontSize: '.78rem', fontWeight: 600,
                        transition: 'background .12s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                      >{deleting === row.id ? <i className="fas fa-spinner fa-spin" /> : <><i className="fas fa-trash-alt" /> Supprimer</>}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Confirm Delete Modal ── */}
      {confirmDel !== null && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,.55)', zIndex: 1100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
          backdropFilter: 'blur(6px)',
        }} onClick={e => { if (e.target === e.currentTarget) setConfirmDel(null) }}>
          <div style={{
            background: '#fff', borderRadius: 18, padding: '2.25rem', width: '100%', maxWidth: 380,
            boxShadow: '0 32px 80px rgba(0,0,0,.25)', textAlign: 'center',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: '#fef2f2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}><i className="fas fa-trash-alt" style={{ fontSize: '1.5rem', color: '#dc2626' }} /></div>
            <h3 style={{ margin: '0 0 .5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>Confirmer la suppression</h3>
            <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '.88rem', lineHeight: 1.6 }}>
              Cette action est <strong style={{ color: '#dc2626' }}>irréversible</strong>. L&apos;enregistrement sera définitivement supprimé.
            </p>
            <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
              <button onClick={() => setConfirmDel(null)} style={{
                padding: '.7rem 1.5rem', background: '#f1f5f9', color: '#374151',
                border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: '.9rem',
              }}>Annuler</button>
              <button onClick={() => deleteRow(confirmDel)} style={{
                padding: '.7rem 1.5rem', background: '#dc2626', color: '#fff',
                border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '.9rem',
                boxShadow: '0 4px 12px rgba(220,38,38,.3)',
              }}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {editing !== null && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,.55)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
          backdropFilter: 'blur(6px)',
        }} onClick={e => { if (e.target === e.currentTarget) cancelEdit() }}>
          <div style={{
            background: '#fff', borderRadius: 20, width: '100%', maxWidth: 580,
            maxHeight: '92vh', overflow: 'auto',
            boxShadow: '0 32px 80px rgba(0,0,0,.22)',
          }}>
            {/* Modal header */}
            <div style={{
              background: 'linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%)',
              padding: '1.5rem 1.75rem',
              borderRadius: '20px 20px 0 0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                {editing === 'new' ? <><i className="fas fa-plus" /> Ajouter</> : <><i className="fas fa-pen" /> Modifier</>} — {title}
              </h2>
              <button onClick={cancelEdit} style={{
                background: 'rgba(255,255,255,.18)', border: 'none', cursor: 'pointer',
                color: '#fff', width: 30, height: 30, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.95rem',
              }}>✕</button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {fields.map(f => (
                  <div key={f.key}>
                    <label style={{
                      fontSize: '.72rem', fontWeight: 700, color: '#475569',
                      display: 'block', marginBottom: '.45rem',
                      textTransform: 'uppercase', letterSpacing: '.08em',
                    }}>{f.label}</label>

                    {f.type === 'textarea' ? (
                      <textarea
                        value={form[f.key] || ''}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        rows={4} placeholder={f.placeholder || ''}
                        style={{ ...inputBase, resize: 'vertical', lineHeight: 1.65 }}
                        onFocus={e => Object.assign(e.target.style, focusStyle)}
                        onBlur={e =>  Object.assign(e.target.style, blurStyle)}
                      />
                    ) : f.type === 'select' ? (
                      <select
                        value={form[f.key] || ''}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{
                          ...inputBase, cursor: 'pointer', appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%2364748b' d='M5 6L0 0h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center',
                          paddingRight: '2.5rem',
                        }}
                        onFocus={e => Object.assign(e.target.style, focusStyle)}
                        onBlur={e =>  Object.assign(e.target.style, blurStyle)}
                      >
                        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type={f.type || 'text'}
                        value={form[f.key] || ''}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder || ''}
                        style={inputBase}
                        onFocus={e => Object.assign(e.target.style, focusStyle)}
                        onBlur={e =>  Object.assign(e.target.style, blurStyle)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '.75rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
                <button onClick={cancelEdit} style={{
                  padding: '.75rem 1.5rem', background: '#f1f5f9', color: '#374151',
                  border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: '.9rem',
                }}>Annuler</button>
                <button onClick={save} disabled={saving} style={{
                  padding: '.75rem 1.75rem',
                  background: saving ? '#93c5fd' : 'linear-gradient(135deg,#0c1f3f,#0369a1)',
                  color: '#fff', border: 'none', borderRadius: 10,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: '.9rem',
                  boxShadow: saving ? 'none' : '0 4px 14px rgba(2,132,199,.35)',
                  transition: 'opacity .15s',
                }}>
                  {saving ? <><i className="fas fa-spinner fa-spin" /> Enregistrement…</> : <><i className="fas fa-check" /> Enregistrer</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

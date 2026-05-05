import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Accueil from './pages/Accueil'
import APropos from './pages/APropos'
import Priere from './pages/Priere'
import Programmes from './pages/Programmes'
import Enseignements from './pages/Enseignements'
import Activites from './pages/Activites'
import Temoignages from './pages/Temoignages'
import Partenaires from './pages/Partenaires'
import Soutenir from './pages/Soutenir'
import Contact from './pages/Contact'
import Membre from './pages/Membre'

// Admin
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminProgrammes from './admin/AdminProgrammes'
import AdminEnseignements from './admin/AdminEnseignements'
import AdminActivites from './admin/AdminActivites'
import AdminTemoignages from './admin/AdminTemoignages'
import AdminPartenaires from './admin/AdminPartenaires'
import AdminMediatheque from './admin/AdminMediatheque'
import AdminAnnonce from './admin/AdminAnnonce'
import PrivateRoute from './admin/PrivateRoute'

import './styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Site public ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />

          <Route path="/a-propos" element={<Navigate to="/a-propos/presentation" replace />} />
          <Route path="/a-propos/:tab" element={<APropos />} />

          <Route path="/priere" element={<Navigate to="/priere/formulaire" replace />} />
          <Route path="/priere/:tab" element={<Priere />} />

          <Route path="/programmes" element={<Navigate to="/programmes/couple" replace />} />
          <Route path="/programmes/:tab" element={<Programmes />} />

          <Route path="/enseignements" element={<Navigate to="/enseignements/audio" replace />} />
          <Route path="/enseignements/:tab" element={<Enseignements />} />

          <Route path="/activites" element={<Navigate to="/activites/terrain" replace />} />
          <Route path="/activites/:tab" element={<Activites />} />

          <Route path="/temoignages" element={<Navigate to="/temoignages/ecrits" replace />} />
          <Route path="/temoignages/:tab" element={<Temoignages />} />

          <Route path="/partenaires" element={<Navigate to="/partenaires/espoir" replace />} />
          <Route path="/partenaires/:tab" element={<Partenaires />} />

          <Route path="/soutenir" element={<Navigate to="/soutenir/don" replace />} />
          <Route path="/soutenir/:tab" element={<Soutenir />} />

          <Route path="/contact" element={<Navigate to="/contact/formulaire" replace />} />
          <Route path="/contact/:tab" element={<Contact />} />

          <Route path="/membre" element={<Membre />} />
        </Route>

        {/* ── Backoffice Admin ── */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="annonce"   element={<AdminAnnonce />} />
          <Route path="programmes" element={<AdminProgrammes />} />
          <Route path="enseignements" element={<AdminEnseignements />} />
          <Route path="activites" element={<AdminActivites />} />
          <Route path="temoignages" element={<AdminTemoignages />} />
          <Route path="partenaires" element={<AdminPartenaires />} />
          <Route path="mediatheque" element={<AdminMediatheque />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

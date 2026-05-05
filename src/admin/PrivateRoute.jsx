import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../lib/adminAuth'

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/admin" replace />
}

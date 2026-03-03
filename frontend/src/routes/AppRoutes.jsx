import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import AppointmentBooking from '../pages/AppointmentBooking'
import PatientDashboard from '../pages/PatientDashboard'
import DoctorDashboard from '../pages/DoctorDashboard'
import AdminDashboard from '../pages/AdminDashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
          )}
        />
        <Route
          path="/register"
          element={(
            <PublicRoute>
              <Register />
            </PublicRoute>
          )}
        />
        <Route
          path="/patient"
          element={(
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/doctor"
          element={(
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/appointments"
          element={(
            <ProtectedRoute allowedRoles={['patient']}>
              <AppointmentBooking />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/home"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/login"
          element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

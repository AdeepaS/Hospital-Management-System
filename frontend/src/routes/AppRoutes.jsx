import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

// Auth Module
import Login from '../modules/auth/pages/Login'
import Register from '../modules/auth/pages/Register'

// Patient Module
import PatientDashboard from '../modules/patient/pages/PatientDashboard'

// Doctor Module
import DoctorDashboard from '../modules/doctor/pages/DoctorDashboard'

// Admin Module
import AdminLayout from '../modules/admin/layout/AdminLayout'
import Dashboard from '../modules/admin/pages/dashboard/Dashboard'
import AllAppointments from '../modules/admin/pages/appointments/AllAppointments'
import DoctorsManagement from '../modules/admin/pages/users/DoctorsManagement'
import PatientsManagement from '../modules/admin/pages/users/PatientsManagement'

// Shared/Common
import ComingSoon from '../shared/components/ComingSoon'

// Legacy pages (to be migrated)
import Home from '../pages/Home'
import AppointmentBooking from '../pages/AppointmentBooking'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
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
          path="/login"
          element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
          )}
        />

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={(
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
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

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={(
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          )}
        />

        {/* Admin Routes - Nested with Layout */}
        <Route
          path="/admin"
          element={(
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          )}
        >
          <Route index element={<Dashboard />} />
          
          {/* User Management */}
          <Route path="users/doctors" element={<DoctorsManagement />} />
          <Route path="users/patients" element={<PatientsManagement />} />
          <Route path="users/roles" element={<ComingSoon title="Roles & Permissions" description="Manage system roles and permissions" icon="🔐" />} />
          
          {/* Appointments */}
          <Route path="appointments" element={<AllAppointments />} />
          <Route path="appointments/pending" element={<ComingSoon title="Pending Appointments" description="View all pending appointments" icon="⏳" />} />
          <Route path="appointments/completed" element={<ComingSoon title="Completed Appointments" description="View completed appointments history" icon="✅" />} />
          <Route path="appointments/cancelled" element={<ComingSoon title="Cancelled Appointments" description="View cancelled appointments" icon="❌" />} />
          
          {/* Lab Management */}
          <Route path="lab/test-types" element={<ComingSoon title="Lab Test Types" description="Manage available lab tests" icon="🧪" />} />
          <Route path="lab/reports" element={<ComingSoon title="Lab Reports" description="View and manage lab reports" icon="📄" />} />
          <Route path="lab/pending" element={<ComingSoon title="Pending Lab Tests" description="Tests awaiting results" icon="⏱️" />} />
          <Route path="lab/staff" element={<ComingSoon title="Lab Staff" description="Manage laboratory staff" icon="👨‍🔬" />} />
          
          {/* Pharmacy */}
          <Route path="pharmacy/inventory" element={<ComingSoon title="Medicine Inventory" description="Manage medicine stock" icon="💊" />} />
          <Route path="pharmacy/low-stock" element={<ComingSoon title="Low Stock Alert" description="Items needing reorder" icon="⚠️" />} />
          <Route path="pharmacy/suppliers" element={<ComingSoon title="Suppliers" description="Manage medicine suppliers" icon="🏪" />} />
          <Route path="pharmacy/purchase-orders" element={<ComingSoon title="Purchase Orders" description="Track purchase orders" icon="📝" />} />
          
          {/* Equipment & Supplies */}
          <Route path="equipment/medical" element={<ComingSoon title="Medical Equipment" description="Manage hospital equipment" icon="🏥" />} />
          <Route path="equipment/maintenance" element={<ComingSoon title="Equipment Maintenance" description="Track maintenance schedule" icon="🔧" />} />
          <Route path="equipment/consumables" element={<ComingSoon title="Consumable Supplies" description="Manage consumables" icon="📦" />} />
          
          {/* Billing & Finance */}
          <Route path="billing/payments" element={<ComingSoon title="Payments" description="View payment records" icon="💳" />} />
          <Route path="billing/invoices" element={<ComingSoon title="Invoices" description="Manage invoices" icon="🧾" />} />
          <Route path="billing/refunds" element={<ComingSoon title="Refunds" description="Process refunds" icon="💸" />} />
          
          {/* Reports & Analytics */}
          <Route path="reports/revenue" element={<ComingSoon title="Revenue Reports" description="Financial analytics" icon="📊" />} />
          <Route path="reports/appointments" element={<ComingSoon title="Appointment Statistics" description="Appointment trends and analytics" icon="📈" />} />
          <Route path="reports/inventory" element={<ComingSoon title="Inventory Reports" description="Stock and usage reports" icon="📋" />} />
          <Route path="reports/lab" element={<ComingSoon title="Lab Reports Summary" description="Lab test statistics" icon="🔬" />} />
          
          {/* System */}
          <Route path="system/settings" element={<ComingSoon title="System Settings" description="Configure system settings" icon="⚙️" />} />
          <Route path="system/audit-logs" element={<ComingSoon title="Audit Logs" description="System activity logs" icon="📜" />} />
        </Route>

        {/* Home Route */}
        <Route
          path="/home"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

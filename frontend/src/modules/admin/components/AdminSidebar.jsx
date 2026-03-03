import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

function AdminSidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [expandedMenus, setExpandedMenus] = useState({})

  const toggleMenu = (key) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/admin'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: '👥',
      subItems: [
        { label: 'Doctors', path: '/admin/users/doctors' },
        { label: 'Patients', path: '/admin/users/patients' },
        { label: 'Roles & Permissions', path: '/admin/users/roles' }
      ]
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: '📅',
      subItems: [
        { label: 'All Appointments', path: '/admin/appointments' },
        { label: 'Pending', path: '/admin/appointments/pending' },
        { label: 'Completed', path: '/admin/appointments/completed' },
        { label: 'Cancelled', path: '/admin/appointments/cancelled' }
      ]
    },
    {
      id: 'lab',
      label: 'Lab Management',
      icon: '🔬',
      subItems: [
        { label: 'Test Types', path: '/admin/lab/test-types' },
        { label: 'Lab Reports', path: '/admin/lab/reports' },
        { label: 'Pending Tests', path: '/admin/lab/pending' },
        { label: 'Lab Staff', path: '/admin/lab/staff' }
      ]
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy',
      icon: '💊',
      subItems: [
        { label: 'Medicine Inventory', path: '/admin/pharmacy/inventory' },
        { label: 'Low Stock', path: '/admin/pharmacy/low-stock' },
        { label: 'Suppliers', path: '/admin/pharmacy/suppliers' },
        { label: 'Purchase Orders', path: '/admin/pharmacy/purchase-orders' }
      ]
    },
    {
      id: 'equipment',
      label: 'Equipment & Supplies',
      icon: '🏥',
      subItems: [
        { label: 'Medical Equipment', path: '/admin/equipment/medical' },
        { label: 'Maintenance', path: '/admin/equipment/maintenance' },
        { label: 'Consumable Supplies', path: '/admin/equipment/consumables' }
      ]
    },
    {
      id: 'billing',
      label: 'Billing & Finance',
      icon: '💰',
      subItems: [
        { label: 'Payments', path: '/admin/billing/payments' },
        { label: 'Invoices', path: '/admin/billing/invoices' },
        { label: 'Refunds', path: '/admin/billing/refunds' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: '📈',
      subItems: [
        { label: 'Revenue Reports', path: '/admin/reports/revenue' },
        { label: 'Appointment Stats', path: '/admin/reports/appointments' },
        { label: 'Inventory Reports', path: '/admin/reports/inventory' },
        { label: 'Lab Reports Summary', path: '/admin/reports/lab' }
      ]
    },
    {
      id: 'system',
      label: 'System',
      icon: '⚙️',
      subItems: [
        { label: 'Settings', path: '/admin/system/settings' },
        { label: 'Audit Logs', path: '/admin/system/audit-logs' }
      ]
    }
  ]

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">HMS Admin</h1>
        <p className="text-xs text-slate-400 mt-1">Hospital Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.subItems ? (
              // Menu with subitems
              <div>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex items-center justify-between px-6 py-3 text-sm hover:bg-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className={`transform transition-transform ${expandedMenus[item.id] ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                </button>
                {expandedMenus[item.id] && (
                  <div className="bg-slate-800">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block pl-14 pr-6 py-2.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Single menu item
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar

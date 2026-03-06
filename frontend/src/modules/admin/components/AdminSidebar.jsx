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
      path: '/admin'
    },
    {
      id: 'users',
      label: 'User Management',
      subItems: [
        { label: 'Doctors', path: '/admin/users/doctors' },
        { label: 'Patients', path: '/admin/users/patients' },
        { label: 'Roles & Permissions', path: '/admin/users/roles' }
      ]
    },
    {
      id: 'appointments',
      label: 'Appointments',
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
      subItems: [
        { label: 'Medical Equipment', path: '/admin/equipment/medical' },
        { label: 'Maintenance', path: '/admin/equipment/maintenance' },
        { label: 'Consumable Supplies', path: '/admin/equipment/consumables' }
      ]
    },
    {
      id: 'billing',
      label: 'Billing & Finance',
      subItems: [
        { label: 'Payments', path: '/admin/billing/payments' },
        { label: 'Invoices', path: '/admin/billing/invoices' },
        { label: 'Refunds', path: '/admin/billing/refunds' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
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
      subItems: [
        { label: 'Settings', path: '/admin/system/settings' },
        { label: 'Audit Logs', path: '/admin/system/audit-logs' }
      ]
    }
  ]

  return (
    <aside className="fixed left-0 top-0 w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm z-40">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 shrink-0">
        <h1 className="text-xl font-bold text-gray-900">HMS Admin</h1>
        <p className="text-xs text-gray-500 mt-1">Hospital Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.subItems ? (
              // Menu with subitems
              <div>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-700 hover:bg-[#E0F2FE] hover:text-[#2563EB] transition-all duration-200 font-medium"
                >
                  <span>{item.label}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${expandedMenus[item.id] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedMenus[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-gray-50">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block pl-10 pr-6 py-2.5 text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-[#E0F2FE] text-[#2563EB] font-medium border-l-4 border-[#2563EB]'
                              : 'text-gray-600 hover:bg-[#F0F9FF] hover:text-[#2563EB] border-l-4 border-transparent'
                          }`
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Single menu item
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm transition-all duration-200 font-medium ${
                    isActive
                      ? 'bg-[#E0F2FE] text-[#2563EB] border-l-4 border-[#2563EB]'
                      : 'text-gray-700 hover:bg-[#E0F2FE] hover:text-[#2563EB] border-l-4 border-transparent'
                  }`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-sm bg-[#E0F2FE] text-[#2563EB] hover:bg-[#BAE6FD] rounded-md transition-all duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar

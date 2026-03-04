import { useAuth } from '../../../context/AuthContext'

function AdminHeader() {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage your hospital operations</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.name || user?.username}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

import { useAuth } from '../../../context/AuthContext'

function AdminHeader() {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Admin Panel</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage your hospital operations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{user?.name || user?.username}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {(user?.name || user?.username)?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

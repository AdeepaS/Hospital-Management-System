import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

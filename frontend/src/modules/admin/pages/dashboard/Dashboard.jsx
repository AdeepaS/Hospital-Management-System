import { useState, useEffect } from 'react'
import StatCard from '../../../../shared/components/StatCard'
import { appointmentAPI, doctorAPI } from '../../../../services/api'

function Dashboard() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    todayAppointments: 0,
    pendingLabTests: 0,
    lowStockMedicines: 0,
    maintenanceDue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch real data from API
      const [doctorsData, appointmentsData] = await Promise.all([
        doctorAPI.getDoctors(),
        appointmentAPI.getAllAppointments()
      ])

      const today = new Date().toISOString().split('T')[0]
      const todayAppointments = appointmentsData.filter(
        (apt) => apt.date?.split('T')[0] === today
      ).length

      // Extract unique patients from appointments
      const uniquePatients = new Set(appointmentsData.map(apt => apt.patient?._id || apt.patient))
      
      setStats({
        totalDoctors: doctorsData.length,
        totalPatients: uniquePatients.size,
        todayAppointments: todayAppointments,
        pendingLabTests: 12, // Mock data - replace with actual API call
        lowStockMedicines: 5, // Mock data - replace with actual API call
        maintenanceDue: 3 // Mock data - replace with actual API call
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600 mt-1">Welcome to your admin dashboard. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Doctors"
          value={stats.totalDoctors}
          subtitle="Active medical staff"
          icon={
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>
          }
        />
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          subtitle="Registered patients"
          icon={
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
              👥
            </div>
          }
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          subtitle="Scheduled for today"
          icon={
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
              📅
            </div>
          }
          trend="up"
          trendValue="+12% from yesterday"
        />
        <StatCard
          title="Pending Lab Tests"
          value={stats.pendingLabTests}
          subtitle="Awaiting results"
          icon={
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">
              🔬
            </div>
          }
        />
        <StatCard
          title="Low Stock Medicines"
          value={stats.lowStockMedicines}
          subtitle="Need reordering"
          icon={
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
              💊
            </div>
          }
          trend="down"
          trendValue="Action required"
        />
        <StatCard
          title="Equipment Maintenance"
          value={stats.maintenanceDue}
          subtitle="Due this week"
          icon={
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
              🔧
            </div>
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-2xl mb-2">➕</div>
            <div className="text-sm font-medium text-slate-700">Add Doctor</div>
          </button>
          <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-medium text-slate-700">New Appointment</div>
          </button>
          <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium text-slate-700">View Reports</div>
          </button>
          <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-sm font-medium text-slate-700">Settings</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

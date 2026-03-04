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
        <div className="h-12 w-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Doctors"
          value={stats.totalDoctors}
          subtitle="Active medical staff"
          className="hover:shadow-md transition-all duration-200 border-[#E0F2FE]"
        />
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          subtitle="Registered patients"
          className="hover:shadow-md transition-all duration-200 border-[#E0F2FE]"
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          subtitle="Scheduled for today"
          trendValue="+12% from yesterday"
          className="hover:shadow-md transition-all duration-200 border-[#E0F2FE]"
        />
        <StatCard
          title="Pending Lab Tests"
          value={stats.pendingLabTests}
          subtitle="Awaiting results"
          className="hover:shadow-md transition-all duration-200 border-[#E0F2FE]"
        />
        <StatCard
          title="Low Stock Medicines"
          value={stats.lowStockMedicines}
          subtitle="Need reordering"
          trend="down"
          trendValue="Action required"
          className="hover:shadow-md transition-all duration-200 border-[#E0F2FE]"
        />
        <StatCard
          title="Equipment Maintenance"
          value={stats.maintenanceDue}
          subtitle="Due this week"
          className="hover:shadow-md transition-all duration-200 border-[#E0F2FE]"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg hover:bg-[#E0F2FE] hover:border-[#7DD3FC] hover:shadow-md transition-all duration-200 text-center">
            <div className="text-sm font-medium text-[#2563EB]">Add Doctor</div>
          </button>
          <button className="p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg hover:bg-[#E0F2FE] hover:border-[#7DD3FC] hover:shadow-md transition-all duration-200 text-center">
            <div className="text-sm font-medium text-[#2563EB]">New Appointment</div>
          </button>
          <button className="p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg hover:bg-[#E0F2FE] hover:border-[#7DD3FC] hover:shadow-md transition-all duration-200 text-center">
            <div className="text-sm font-medium text-[#2563EB]">View Reports</div>
          </button>
          <button className="p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg hover:bg-[#E0F2FE] hover:border-[#7DD3FC] hover:shadow-md transition-all duration-200 text-center">
            <div className="text-sm font-medium text-[#2563EB]">Settings</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

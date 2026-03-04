import StatusBadge from './StatusBadge'

function AppointmentTable({ appointments, onCancel, loading, role }) {
  if (loading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center">
        <p className="text-gray-500">Loading appointments...</p>
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center">
        <p className="text-gray-500">No appointments found</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F0F9FF]">
            <tr>
              {role === 'patient' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                    Specialization
                  </th>
                </>
              )}
              {(role === 'doctor' || role === 'admin') && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                    Email
                  </th>
                </>
              )}
              {role === 'admin' && (
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                  Doctor
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#2563EB]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-[#F0F9FF] transition-all duration-150">
                {role === 'patient' && (
                  <>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {appointment.doctor?.name || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {appointment.doctor?.specialization || 'N/A'}
                    </td>
                  </>
                )}
                {(role === 'doctor' || role === 'admin') && (
                  <>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {appointment.patient?.name || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {appointment.patient?.email || 'N/A'}
                    </td>
                  </>
                )}
                {role === 'admin' && (
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {appointment.doctor?.name || 'N/A'}
                  </td>
                )}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {appointment.date}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {appointment.time}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <StatusBadge status={appointment.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {appointment.status === 'booked' && (
                    <button
                      onClick={() => onCancel(appointment._id)}
                      className="text-[#DC2626] hover:text-[#B91C1C] hover:bg-[#FEE2E2] px-3 py-1 rounded-md font-medium transition-all duration-200"
                    >
                      Cancel
                    </button>
                  )}
                  {appointment.status === 'cancelled' && (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppointmentTable

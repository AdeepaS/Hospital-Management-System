import StatusBadge from './StatusBadge'

function AppointmentTable({ appointments, onCancel, loading, role }) {
  if (loading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">Loading appointments...</p>
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">No appointments found</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {role === 'patient' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Specialization
                  </th>
                </>
              )}
              {(role === 'doctor' || role === 'admin') && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                </>
              )}
              {role === 'admin' && (
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Doctor
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-slate-50">
                {role === 'patient' && (
                  <>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {appointment.doctor?.name || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {appointment.doctor?.specialization || 'N/A'}
                    </td>
                  </>
                )}
                {(role === 'doctor' || role === 'admin') && (
                  <>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {appointment.patient?.name || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {appointment.patient?.email || 'N/A'}
                    </td>
                  </>
                )}
                {role === 'admin' && (
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {appointment.doctor?.name || 'N/A'}
                  </td>
                )}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {appointment.date}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {appointment.time}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <StatusBadge status={appointment.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {appointment.status === 'booked' && (
                    <button
                      onClick={() => onCancel(appointment._id)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Cancel
                    </button>
                  )}
                  {appointment.status === 'cancelled' && (
                    <span className="text-slate-400">-</span>
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

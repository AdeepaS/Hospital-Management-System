import { useNavigate } from 'react-router-dom'
import Loader from '../../shared/components/Loader'

function PatientTable({ patients, loading, onEdit, onToggleStatus }) {
  const navigate = useNavigate()

  const handleViewDetails = (patientId) => {
    navigate(`/admin/users/patients/${patientId}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    )
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No patients found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E0F2FE] bg-[#F8FAFC]">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Registered
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#E0F2FE]">
          {patients.map((patient) => (
            <tr 
              key={patient._id} 
              className="hover:bg-[#F8FAFC] transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{patient.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{patient.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{formatDate(patient.createdAt)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleViewDetails(patient._id)}
                    className="text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors duration-150"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(patient)}
                    className="text-[#9333EA] hover:text-[#7E22CE] font-medium transition-colors duration-150"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PatientTable

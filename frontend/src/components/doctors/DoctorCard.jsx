import { useNavigate } from 'react-router-dom'

function DoctorCard({ doctor }) {
  const navigate = useNavigate()

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]'
      case 'inactive':
        return 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]'
      case 'on_leave':
        return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const formatStatus = (status) => {
    return status.replace('_', ' ').toUpperCase()
  }

  const handleCardClick = () => {
    navigate(`/admin/users/doctors/${doctor._id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Profile Photo */}
      <div className="flex items-center mb-4">
        <img
          src={doctor.profilePhoto}
          alt={doctor.name}
          className="w-16 h-16 rounded-full border-2 border-[#2563EB] object-cover"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-[#2563EB]">{doctor.specialization}</p>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Experience:</span>
          <span className="font-medium text-gray-900">
            {doctor.experienceYears || 0} years
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Consultation Fee:</span>
          <span className="font-medium text-gray-900">
            ${doctor.consultationFee}
          </span>
        </div>
        {doctor.rating && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Rating:</span>
            <span className="font-medium text-gray-900">
              ⭐ {doctor.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="mt-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            doctor.status
          )}`}
        >
          {formatStatus(doctor.status)}
        </span>
      </div>
    </div>
  )
}

export default DoctorCard

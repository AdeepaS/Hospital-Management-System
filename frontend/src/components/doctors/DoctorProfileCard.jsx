function DoctorProfileCard({ doctor }) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
      <div className="flex items-start gap-6">
        {/* Profile Photo */}
        <img
          src={doctor.profilePhoto}
          alt={doctor.name}
          className="w-32 h-32 rounded-lg border-2 border-[#2563EB] object-cover"
        />

        {/* Doctor Information */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
              <p className="text-lg text-[#2563EB] mt-1">{doctor.specialization}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                doctor.status
              )}`}
            >
              {formatStatus(doctor.status)}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-900">
                {doctor.department || doctor.specialization}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium text-gray-900">
                {doctor.experienceYears || 0} years
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="font-medium text-gray-900">${doctor.consultationFee}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">License Number</p>
              <p className="font-medium text-gray-900">
                {doctor.licenseNumber || 'N/A'}
              </p>
            </div>
            {doctor.rating && (
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-medium text-gray-900">⭐ {doctor.rating.toFixed(1)}</p>
              </div>
            )}
            {doctor.languages && doctor.languages.length > 0 && (
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <p className="font-medium text-gray-900">
                  {doctor.languages.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="mt-4 pt-4 border-t border-[#E0F2FE]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{doctor.email}</p>
              </div>
              {doctor.phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{doctor.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfileCard

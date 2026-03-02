function DoctorCard({ doctor, onSelect, isSelected }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-slate-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
          <p className="text-sm text-blue-600">{doctor.specialization}</p>
          <div className="mt-2 space-y-1 text-sm text-slate-600">
            <p>
              <span className="font-medium">Fee:</span> ${doctor.consultationFee}
            </p>
            <p>
              <span className="font-medium">Hours:</span> {doctor.workingHours.start} -{' '}
              {doctor.workingHours.end}
            </p>
            <p>
              <span className="font-medium">Working Days:</span>{' '}
              {doctor.workingDays.join(', ')}
            </p>
          </div>
        </div>
        {isSelected && (
          <div className="ml-2">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorCard

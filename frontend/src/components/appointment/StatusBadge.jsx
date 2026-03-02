function StatusBadge({ status }) {
  const statusStyles = {
    booked: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  }

  const statusText = {
    booked: 'Booked',
    cancelled: 'Cancelled'
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}
    >
      {statusText[status] || status}
    </span>
  )
}

export default StatusBadge

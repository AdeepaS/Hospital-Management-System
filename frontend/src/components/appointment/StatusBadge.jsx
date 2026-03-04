function StatusBadge({ status }) {
  const statusStyles = {
    booked: 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]',
    cancelled: 'bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]'
  }

  const statusText = {
    booked: 'Booked',
    cancelled: 'Cancelled'
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 ${
        statusStyles[status] || 'bg-gray-100 text-gray-700 border border-gray-200'
      }`}
    >
      {statusText[status] || status}
    </span>
  )
}

export default StatusBadge

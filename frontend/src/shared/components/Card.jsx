function Card({ children, className = '', title, subtitle, action }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-[#E0F2FE] ${className}`}>
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-[#E0F2FE] flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default Card

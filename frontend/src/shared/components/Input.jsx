function Input({ 
  label, 
  type = 'text', 
  error, 
  helperText,
  className = '',
  required = false,
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-lg border ${
          error ? 'border-[#FECACA] focus:ring-[#DC2626] focus:border-[#DC2626]' : 'border-[#BAE6FD] focus:ring-[#2563EB] focus:border-[#2563EB]'
        } px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  )
}

export default Input

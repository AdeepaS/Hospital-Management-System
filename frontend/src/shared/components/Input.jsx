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
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
        } px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-slate-500">{helperText}</p>}
    </div>
  )
}

export default Input

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  type = 'button',
  onClick,
  ...props 
}) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:shadow-md focus:ring-[#2563EB]',
    secondary: 'bg-[#E0F2FE] text-[#2563EB] hover:bg-[#BAE6FD] focus:ring-[#2563EB]',
    success: 'bg-[#DCFCE7] text-[#16A34A] hover:bg-[#BBF7D0] focus:ring-[#16A34A]',
    danger: 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA] focus:ring-[#DC2626]',
    warning: 'bg-[#FEF3C7] text-[#D97706] hover:bg-[#FDE68A] focus:ring-[#D97706]',
    outline: 'border border-[#BAE6FD] bg-white text-[#2563EB] hover:bg-[#F0F9FF] focus:ring-[#2563EB]',
    ghost: 'text-[#2563EB] hover:bg-[#F0F9FF] focus:ring-[#2563EB]'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

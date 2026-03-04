import { useEffect } from 'react'

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning' }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const typeStyles = {
    warning: {
      icon: (
        <svg className="h-6 w-6 text-[#DC2626]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      bgColor: 'bg-[#FEE2E2]',
      buttonColor: 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA] focus:ring-[#DC2626]'
    },
    danger: {
      icon: (
        <svg className="h-6 w-6 text-[#DC2626]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      ),
      bgColor: 'bg-[#FEE2E2]',
      buttonColor: 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA] focus:ring-[#DC2626]'
    },
    info: {
      icon: (
        <svg className="h-6 w-6 text-[#2563EB]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
      bgColor: 'bg-[#E0F2FE]',
      buttonColor: 'bg-[#E0F2FE] text-[#2563EB] hover:bg-[#BAE6FD] focus:ring-[#2563EB]'
    }
  }

  const currentStyle = typeStyles[type] || typeStyles.warning

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - Subtle overlay */}
      <div 
        className="absolute inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md transform rounded-lg bg-white p-6 shadow-2xl border border-[#E0F2FE] transition-all">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`shrink-0 rounded-full p-3 ${currentStyle.bgColor}`}>
            {currentStyle.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-[#BAE6FD] bg-white px-4 py-2 text-sm font-medium text-[#2563EB] hover:bg-[#F0F9FF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-all duration-200"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${currentStyle.buttonColor}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

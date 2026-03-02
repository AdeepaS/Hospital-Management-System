// Shared layout for auth pages (login/register) with centered card styling
import { Link } from 'react-router-dom'

function AuthLayout({ title, subtitle, children, footerText, footerLink, footerLinkText }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      {/* Outer card container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10 space-y-6">
        {/* Header section with title and subtitle */}
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </header>

        {/* Main form content passed from child components */}
        <main>{children}</main>

        {/* Footer with link to switch between login/register */}
        {footerText && footerLink && (
          <footer className="pt-2 text-center text-sm text-slate-500">
            <span>{footerText} </span>
            <Link to={footerLink} className="font-medium text-blue-600 hover:text-blue-700">
              {footerLinkText}
            </Link>
          </footer>
        )}
      </div>
    </div>
  )
}

export default AuthLayout

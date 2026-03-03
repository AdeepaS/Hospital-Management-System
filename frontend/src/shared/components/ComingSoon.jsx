function ComingSoon({ title, description, icon = '🚧' }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-600 mt-1">{description}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Coming Soon</h3>
        <p className="text-slate-600">This feature is under development and will be available soon.</p>
      </div>
    </div>
  )
}

export default ComingSoon

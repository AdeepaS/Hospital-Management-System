function StatsCard({ title, value, description }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
      <h2 className="text-sm font-medium text-slate-700">{title}</h2>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  )
}

export default StatsCard

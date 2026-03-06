function PatientSearchBar({ search, setSearch, onReset }) {
  return (
    <div className="mb-6 rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Search Patients</h2>
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#BAE6FD] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-200"
          />
        </div>
        {search && (
          <button
            onClick={onReset}
            className="rounded-md bg-[#E0F2FE] text-[#2563EB] px-6 py-2 text-sm font-medium hover:bg-[#BAE6FD] transition-all duration-200"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default PatientSearchBar

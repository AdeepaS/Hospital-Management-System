function ComingSoon({ title, description }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-12 text-center hover:shadow-md transition-all duration-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-600">This feature is under development and will be available soon.</p>
      </div>
    </div>
  )
}

export default ComingSoon

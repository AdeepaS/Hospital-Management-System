function TimeSlotPicker({ doctor, bookedSlots = [], selectedTime, onSelectTime }) {
  // Generate time slots based on doctor's working hours (30-minute intervals)
  const generateTimeSlots = () => {
    if (!doctor || !doctor.workingHours) return []

    const slots = []
    const [startHour, startMin] = doctor.workingHours.start.split(':').map(Number)
    const [endHour, endMin] = doctor.workingHours.end.split(':').map(Number)

    let currentHour = startHour
    let currentMin = startMin

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMin < endMin)
    ) {
      const timeString = `${String(currentHour).padStart(2, '0')}:${String(
        currentMin
      ).padStart(2, '0')}`
      slots.push(timeString)

      // Increment by 30 minutes
      currentMin += 30
      if (currentMin >= 60) {
        currentMin = 0
        currentHour += 1
      }
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-slate-900">Select Time Slot</h4>
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((time) => {
          const isBooked = bookedSlots.includes(time)
          const isSelected = selectedTime === time

          return (
            <button
              key={time}
              onClick={() => !isBooked && onSelectTime(time)}
              disabled={isBooked}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isBooked
                  ? 'cursor-not-allowed bg-slate-200 text-slate-400 line-through'
                  : isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-300'
              }`}
            >
              {time}
            </button>
          )
        })}
      </div>
      {timeSlots.length === 0 && (
        <p className="text-sm text-slate-500">No time slots available</p>
      )}
    </div>
  )
}

export default TimeSlotPicker

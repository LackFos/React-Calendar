import { useState } from 'react'

import Calendar from './Calendar'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-10 '>
      <Calendar value={selectedDate} onChange={(value) => setSelectedDate(value)} />
      <h1>Date : {selectedDate.toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}</h1>
    </div>
  )
}

export default App

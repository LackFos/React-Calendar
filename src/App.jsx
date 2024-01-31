import { motion } from 'framer-motion'
import { useState } from 'react'
import Calendar from './Calendar'
function App() {
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().setUTCHours(0, 0, 0, 0)))

  return (
    <div className='fixed flex h-full w-full flex-col items-center justify-center gap-10 '>
      <Calendar value={selectedDate} onChange={(value) => setSelectedDate(value)} />
      <h1>
        Date : {new Date(selectedDate).toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}
      </h1>
    </div>
  )
}

export default App

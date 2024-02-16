import { useState } from 'react'
import { motion } from 'framer-motion'
import Calendar from './Calendar'
import SelectSession from './SelectSession'

function App() {
  const [inputType, setInputType] = useState('calendar')
  const [formData, setFormData] = useState({
    date: null,
    session: null,
  })

  const handleBackToCalendarInput = () => {
    setInputType('calendar')
  }

  const handleFormDataChange = (identifier, value) => {
    setFormData((prev) => ({
      ...prev,
      [identifier]: value,
    }))
  }

  const handleSelectedDateChange = (value) => {
    handleFormDataChange('date', value)
    setInputType('session')
  }

  return (
    <div className='fixed flex h-full w-full flex-col items-center justify-center gap-10'>
      <motion.div layout transition={{ layout: { duration: 0.2, type: 'spring' } }}>
        {inputType === 'calendar' && (
          <Calendar date={formData.date} onChange={(value) => handleSelectedDateChange(value)} />
        )}

        {inputType === 'session' && (
          <SelectSession
            date={formData.date}
            value={formData.session}
            onBack={handleBackToCalendarInput}
            onChange={(value) => handleFormDataChange('session', value)}
          />
        )}
      </motion.div>

      <h1>
        {formData.date
          ? formData.date.toLocaleString('id-ID', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          : 'Tidak ada tanggal terpilih'}
      </h1>
    </div>
  )
}

export default App

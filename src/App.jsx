import { useState } from 'react'
import Calendar from './Calendar'

function App() {
  const [selectedDate, setSelectedDate] = useState({
    start: null,
    end: null,
  })

  // const [selectedMode, setSelectedMode] = useState('start')

  // const handleSelectedselectedDateChange = (value) => {
  //   if (selectedMode === 'start') {
  //     handleSelectedDateChange('start', value)
  //     setSelectedMode('end')
  //   } else if (selectedMode === 'end') {
  //     handleSelectedDateChange('end', value)
  //     setSelectedMode('start')
  //   }
  // }

  return (
    <div className='fixed flex h-full w-full flex-col items-center justify-center gap-10'>
      <Calendar selectedDate={selectedDate} onChangeDate={setSelectedDate} />

      <div className='flex gap-10'>
        <p>
          {`Start Date :
        ${
          selectedDate.start
            ? selectedDate.start.toLocaleString('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : '-'
        }`}
        </p>

        <p>
          {`End Date :
        ${
          selectedDate.end
            ? selectedDate.end.toLocaleString('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : '-'
        }`}
        </p>
      </div>
    </div>
  )
}

export default App

import { motion } from 'framer-motion'
import { useState } from 'react'
import LeftChevron from './assets/LeftChevron'
import RightChevron from './assets/RightChevron'

const Calendar = ({ selectedDate, onChangeDate, locale = 'id-ID' }) => {
  const [displayDate, setDisplayDate] = useState(selectedDate.start ?? new Date())
  const [selectedMode, setSelectedMode] = useState('start')

  const displayYear = displayDate.getFullYear()
  const displayMonth = displayDate.getMonth()
  const firstDateOfMonth = new Date(Date.UTC(displayYear, displayMonth, 1))
  const lastDateOfMonth = new Date(Date.UTC(displayYear, displayMonth + 1, 0))

  const prevMonthDates = Array.from(
    { length: firstDateOfMonth.getDay() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth, -i)),
  ).reverse()

  const currentMonthDates = Array.from(
    { length: lastDateOfMonth.getDate() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth, i + 1)),
  )

  const nextMonthDates = Array.from(
    { length: 42 - prevMonthDates.length - lastDateOfMonth.getDate() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth + 1, i + 1)),
  )

  const handleChangeMonth = (type) => {
    if (type === 'next') setDisplayDate(new Date(displayYear, displayMonth + 1))
    else if (type === 'prev') setDisplayDate(new Date(displayYear, displayMonth - 1))
  }

  const handleChangeDate = (date) => {
    if (selectedMode === 'start') {
      handleSelectedDateChange('start', date)
      setSelectedMode('end')
    } else if (selectedMode === 'end') {
      handleSelectedDateChange('end', date)
      setSelectedMode('start')
    }
    setDisplayDate(date)
  }

  const handleSelectedDateChange = (identifier, value) => {
    onChangeDate((prev) => ({
      ...prev,
      [identifier]: value,
    }))
  }

  return (
    <div className='flex w-[500px] flex-col gap-4 rounded-2xl bg-white py-6 shadow-2xl'>
      <div className='flex items-center justify-between px-6'>
        <span className='text-lg font-bold'>{`${displayDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}`}</span>

        <div className='bg-calendar-primar flex items-center overflow-hidden rounded-2xl border border-gray-200'>
          <div onClick={() => handleChangeMonth('prev')} className='font-bold text-slate-900'>
            <motion.button className='flex h-12 w-12 items-center justify-center' whileTap={{ scale: 0.7 }}>
              <LeftChevron />
            </motion.button>
          </div>

          <div className='h-8 w-[1px] rounded-2xl bg-gray-200'></div>

          <div onClick={() => handleChangeMonth('next')} className='font-bold text-slate-900'>
            <motion.button className='flex h-12 w-12 items-center justify-center' whileTap={{ scale: 0.7 }}>
              <RightChevron />
            </motion.button>
          </div>
        </div>
      </div>

      <div className='flex px-2'>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Min</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Sen</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Sel</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Rab</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Kam</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Jum</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Sab</div>
      </div>

      <div className='flex flex-wrap px-1'>
        {prevMonthDates.map((date) => (
          <CalendarDateTile
            key={date}
            value={date}
            selectedDate={selectedDate}
            onClick={() => handleChangeDate(date)}
            className='text-slate-300'
          ></CalendarDateTile>
        ))}

        {currentMonthDates.map((date) => (
          <CalendarDateTile
            key={date}
            value={date}
            selectedDate={selectedDate}
            onClick={() => handleChangeDate(date)}
          ></CalendarDateTile>
        ))}

        {nextMonthDates.map((date) => (
          <CalendarDateTile
            key={date}
            value={date}
            selectedDate={selectedDate}
            onClick={() => handleChangeDate(date)}
            className='text-slate-300'
          ></CalendarDateTile>
        ))}
      </div>
    </div>
  )
}

const CalendarDateTile = ({ value, onClick, selectedDate, className }) => {
  const isActive =
    selectedDate.start?.toISOString() === value.toISOString() || selectedDate.end?.toISOString() === value.toISOString()

  return (
    <div
      onClick={() => onClick(value)}
      className='h-[70px] w-[calc(100%/7)] cursor-pointer border-gray-200 p-1 [&:nth-child(n+8)]:border-t'
    >
      <span
        className={`flex h-full w-full items-center justify-center rounded-2xl font-bold hover:bg-gray-100 ${isActive ? '!bg-calendar-hover !text-calendar-dark' : ''} ${className}`}
      >
        {value.getDate()}
      </span>
    </div>
  )
}

export default Calendar

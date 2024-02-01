import { motion } from 'framer-motion'
import { useState } from 'react'
import LeftChevron from './assets/LeftChevron'
import RightChevron from './assets/RightChevron'

const Calendar = ({ date, onChange: setSelectedDate, locale = 'id-ID' }) => {
  const selectedDate = date ?? new Date()
  const [calendarView, setCalendarView] = useState(selectedDate)

  const displayYear = calendarView.getFullYear()
  const displayMonth = calendarView.getMonth()

  const firstDateOfMonth = new Date(Date.UTC(displayYear, displayMonth, 1))
  const lastDateOfMonth = new Date(Date.UTC(displayYear, displayMonth + 1, 0))

  const prevMonthWeekdays = Array.from(
    { length: firstDateOfMonth.getDay() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth, -i)),
  ).reverse()

  const currentMonthDates = Array.from(
    { length: lastDateOfMonth.getDate() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth, i + 1)),
  )

  const nextMonthWeekdays = Array.from(
    { length: 42 - prevMonthWeekdays.length - lastDateOfMonth.getDate() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth + 1, i + 1)),
  )

  const handleMonthChange = (type) => {
    if (type === 'next') {
      const newDate = new Date(displayYear, displayMonth + 1)
      setCalendarView(newDate)
    } else if (type === 'prev') {
      const newDate = new Date(displayYear, displayMonth - 1)
      setCalendarView(newDate)
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setCalendarView(date)
  }

  return (
    <div className='flex w-[500px] flex-col gap-4 rounded-2xl bg-white py-6 shadow-2xl'>
      <div className='flex items-center justify-between px-6'>
        <span className='text-lg font-bold'>{`${calendarView.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}`}</span>

        <div className='bg-calendar-primar flex items-center overflow-hidden rounded-2xl border border-gray-200'>
          <div onClick={() => handleMonthChange('prev')} className='font-bold text-slate-900'>
            <motion.button className='flex h-12 w-12 items-center justify-center' whileTap={{ scale: 0.7 }}>
              <LeftChevron />
            </motion.button>
          </div>

          <div className='h-8 w-[1px] rounded-2xl bg-gray-200'></div>

          <div onClick={() => handleMonthChange('next')} className='font-bold text-slate-900'>
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
        {prevMonthWeekdays.map((date) => (
          <CalendarDateTile
            key={date}
            date={date}
            selectedDate={selectedDate}
            onClick={() => handleDateChange(date)}
            className='text-slate-300'
          ></CalendarDateTile>
        ))}

        {currentMonthDates.map((date) => (
          <CalendarDateTile
            key={date}
            date={date}
            selectedDate={selectedDate}
            onClick={() => handleDateChange(date)}
          ></CalendarDateTile>
        ))}

        {nextMonthWeekdays.map((date) => (
          <CalendarDateTile
            key={date}
            date={date}
            selectedDate={selectedDate}
            onClick={() => handleDateChange(date)}
            className='text-slate-300'
          ></CalendarDateTile>
        ))}
      </div>
    </div>
  )
}

const CalendarDateTile = ({ date, onClick, selectedDate, className }) => {
  const isActive = selectedDate.toISOString() === date.toISOString()

  return (
    <div
      onClick={() => onClick(date)}
      className='h-[70px] w-[calc(100%/7)] cursor-pointer border-gray-200 p-1 [&:nth-child(n+8)]:border-t'
    >
      <span
        className={`flex h-full w-full items-center justify-center rounded-2xl font-bold hover:bg-gray-100 ${isActive ? '!bg-calendar-hover !text-calendar-dark' : ''} ${className}`}
      >
        {date.getDate()}
      </span>
    </div>
  )
}

export default Calendar

import { useState } from 'react'
import LeftChevron from './assets/LeftChevron'
import RightChevron from './assets/RightChevron'

const Calendar = ({ value, onChange: setSelectedDate }) => {
  const selectedDate = new Date(value)
  const [calendarView, setCalendarView] = useState(selectedDate)

  const displayYear = calendarView.getFullYear()
  const displayMonth = calendarView.getMonth()

  const firstDateOfMonth = new Date(Date.UTC(displayYear, displayMonth, 1))
  const lastDateOfMonth = new Date(Date.UTC(displayYear, displayMonth + 1, 0))

  const currentMonthDates = Array.from(
    { length: lastDateOfMonth.getDate() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth, i + 1)),
  )

  const prevMonthWeekdays = Array.from(
    { length: firstDateOfMonth.getDay() },
    (_, i) => new Date(Date.UTC(displayYear, displayMonth, -i)),
  ).reverse()

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
        <h1 className='font-bold'>{`${calendarView.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}`}</h1>

        <div className='flex items-center overflow-hidden rounded-2xl bg-calendar-primary'>
          <div
            onClick={() => handleMonthChange('prev')}
            className='flex h-12 w-12 items-center justify-center font-bold text-white'
          >
            <LeftChevron />
          </div>
          <div className='h-8 w-[2px] rounded-2xl bg-white'></div>
          <div
            onClick={() => handleMonthChange('next')}
            className='flex h-12 w-12 items-center justify-center font-bold text-white'
          >
            <RightChevron />
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
            onClick={() => handleDateChange(date)}
            isActive={selectedDate.toISOString() === date.toISOString()}
            className='text-slate-300'
          ></CalendarDateTile>
        ))}

        {currentMonthDates.map((date) => (
          <CalendarDateTile
            key={date}
            onClick={() => handleDateChange(date)}
            date={date}
            isActive={selectedDate.toISOString() === date.toISOString()}
          ></CalendarDateTile>
        ))}

        {nextMonthWeekdays.map((date) => (
          <CalendarDateTile
            key={date}
            date={date}
            onClick={() => handleDateChange(date)}
            isActive={selectedDate.toISOString() === date.toISOString()}
            className='text-slate-300'
          ></CalendarDateTile>
        ))}
      </div>
    </div>
  )
}

const CalendarDateTile = ({ date, onClick, isActive, className }) => {
  return (
    <div
      onClick={() => onClick(date)}
      className=' h-[70px] w-[calc(100%/7)] border-gray-200 p-1 [&:nth-child(n+8)]:border-t'
    >
      <span
        className={`flex h-full w-full items-center justify-center rounded-2xl font-bold hover:bg-gray-200 ${isActive ? '!bg-calendar-hover !text-calendar-dark' : ''} ${className}`}
      >
        {new Date(date).getDate()}
      </span>
    </div>
  )
}

export default Calendar

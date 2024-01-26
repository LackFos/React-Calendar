import { useState } from 'react'
import LeftChevron from './assets/LeftChevron'
import RightChevron from './assets/RightChevron'

const Calendar = ({ value: selectedDate, onChange }) => {
  const [calendarView, setCalendarView] = useState(selectedDate)

  const currentYearView = calendarView.getFullYear()
  const currentMonthView = calendarView.getMonth()

  const currentViewTotalDays = new Date(currentYearView, currentMonthView + 1, 0).getDate()
  const currentViewDates = Array.from({ length: currentViewTotalDays }, (_, i) => i + 1)

  const currentViewFirstDateDay = new Date(currentYearView, currentMonthView, 1).getDay()
  const currentViewSkippedDays = Array.from({ length: currentViewFirstDateDay - 1 }, (_, i) => i + 1)

  const handleDateChange = (date) => {
    const newDate = new Date(currentYearView, currentMonthView, date)
    onChange(newDate)
  }

  const handleMonthChange = (type) => {
    if (type === 'next') {
      const newDate = new Date(currentYearView, currentMonthView + 1)
      setCalendarView(newDate)
    } else if (type === 'prev') {
      const newDate = new Date(currentYearView, currentMonthView - 1)
      setCalendarView(newDate)
    }
  }

  return (
    <div className='flex w-[500px] flex-col gap-4 rounded-xl bg-white py-6 shadow-2xl'>
      <div className='flex items-center justify-between px-6'>
        <h1 className='font-bold'>{`${calendarView.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}`}</h1>

        <div className='flex items-center overflow-hidden rounded-xl bg-calendar-primary'>
          <div
            onClick={() => handleMonthChange('prev')}
            className='flex h-12 w-12 items-center justify-center font-bold text-white'
          >
            <LeftChevron />
          </div>
          <div className='h-8 w-[1px] rounded-xl bg-white'></div>
          <div
            onClick={() => handleMonthChange('next')}
            className='flex h-12 w-12 items-center justify-center font-bold text-white'
          >
            <RightChevron />
          </div>
        </div>
      </div>

      <div className='flex px-2'>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Sen</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Sel</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Rab</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Kam</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Jum</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Sab</div>
        <div className='flex h-12 w-full items-center justify-center text-sm text-slate-700'>Min</div>
      </div>

      <div className='flex flex-wrap px-1'>
        {currentViewSkippedDays.map((day) => (
          <CalendarDateTile key={day}></CalendarDateTile>
        ))}

        {currentViewDates.map((date) => (
          <CalendarDateTile
            onClick={() => handleDateChange(date)}
            key={date}
            date={date}
            active={
              currentYearView === selectedDate.getFullYear() &&
              currentMonthView === selectedDate.getMonth() &&
              selectedDate.getDate() === date
            }
          ></CalendarDateTile>
        ))}
      </div>
    </div>
  )
}

const CalendarDateTile = ({ className, onClick, date, active }) => {
  return (
    <div onClick={() => onClick(date)} className=' h-[70px] w-[calc(100%/7)] p-1'>
      <span
        className={`flex h-full w-full items-center justify-center rounded-xl font-bold hover:bg-gray-200 ${className} ${active ? '!bg-calendar-hover !text-calendar-dark' : ''}`}
      >
        {date}
      </span>
    </div>
  )
}

export default Calendar

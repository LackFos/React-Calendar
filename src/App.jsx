import { useState } from 'react'
import LeftChevron from './assets/LeftChevron'
import RightChevron from './assets/RightChevron'

function App() {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const currentWeekday = currentDate.getDay()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const currentMonthTotalday = new Date(new Date(currentYear, currentMonth + 1, 1) - 1).getDate()

  const skippedWeekdays = Array.from({ length: firstDayOfMonth - 1 }, (_, i) => i + 1)
  const currentMonthdays = Array.from({ length: currentMonthTotalday }, (_, i) => i + 1)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className='flex h-screen w-screen items-center justify-center '>
      <div className='flex w-[500px] flex-col gap-4 rounded-xl bg-white py-6 shadow-2xl'>
        <div className='flex items-center justify-between px-6'>
          <h1 className='font-bold'>{`${monthNames[currentMonth]} ${currentYear}`}</h1>

          <div className='flex items-center overflow-hidden rounded-xl bg-calendar-primary'>
            <div className='flex h-12 w-12 items-center justify-center font-bold text-white'>
              <LeftChevron />
            </div>
            <div className='h-8 w-[1px] rounded-xl bg-white'></div>
            <div className='flex h-12 w-12 items-center justify-center font-bold text-white'>
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
          {skippedWeekdays.map((day) => (
            <CalendarDateTile key={day}></CalendarDateTile>
          ))}

          {currentMonthdays.map((day) => (
            <CalendarDateTile
              className={`${day === currentDate.getDate() ? '!bg-calendar-hover !text-calendar-dark' : ''}`}
              key={day}
              date={day}
            ></CalendarDateTile>
          ))}
        </div>
      </div>
    </div>
  )
}

const CalendarDateTile = ({ className, onClick, date }) => {
  return (
    <div onClick={() => onClick(value)} className=' h-[70px] w-[calc(100%/7)] p-1'>
      <span
        className={`flex h-full w-full items-center justify-center rounded-xl font-bold hover:bg-gray-200 ${className}`}
      >
        {date}
      </span>
    </div>
  )
}

export default App

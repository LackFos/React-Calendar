import CalendarIcon from './assets/CalendarIcon'
import LeftChevron from './assets/LeftChevron'

const SelectSession = ({ value, date, onChange, onBack, locale = 'id-ID' }) => {
  const sessions = [
    { time: '10.00', user_id: 1 },
    { time: '12.00' },
    { time: '14.00' },
    { time: '16.00' },
    { time: '18.00' },
    { time: '20.00', user_id: 1 },
    { time: '22.00' },
    { time: '00.00' },
  ]

  const handleSessionChange = (session) => {
    if (!session.user_id) {
      onChange(session.time)
    }
  }

  return (
    <div className='flex w-[500px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl'>
      <div className='flex items-center justify-between border-b border-gray-200 p-4'>
        <div onClick={onBack} className='flex h-12 w-12 cursor-pointer items-center justify-center text-slate-900'>
          <LeftChevron />
        </div>
        <span className='text-lg font-bold'>Pilih Sesi</span>
        <div className='flex h-12 w-12'></div>
      </div>

      <div className='flex flex-col gap-6 py-6'>
        <div onClick={onBack} className='flex cursor-pointer items-center gap-4 px-4 font-semibold'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-calendar-hover text-calendar-primary'>
            <CalendarIcon />
          </div>
          <span>
            {date.toLocaleString(locale, {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className='flex h-[496px] flex-col gap-2 overflow-y-scroll px-4 font-bold'>
          {sessions.map((session) => (
            <div
              key={session.time}
              onClick={() => handleSessionChange(session)}
              className={`flex min-h-[64px] w-full cursor-pointer items-center justify-center rounded-2xl border hover:border-calendar-hover hover:bg-calendar-hover hover:text-calendar-primary ${session.user_id ? '!border-transparent !bg-slate-100 !text-slate-600' : 'border-gray-200'} ${session.time === value ? '!border-calendar-primary !bg-calendar-hover !text-calendar-primary' : ''}`}
            >
              {session.time} WIB
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectSession

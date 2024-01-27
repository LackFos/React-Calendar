import { useState } from 'react'

const useCalender = () => {
  const currentDate = new Date()
  currentDate.setUTCDate(currentDate)
  return useState(new Date(currentDate))
}

export default useCalender

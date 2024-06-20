import { DATE_FORMAT } from '@/config/define'
import dayjs from 'dayjs'

export const getValueFromObjectByKey = (objectArray: any, keyFrom: string, valueFrom: any) => {
  if (!Array.isArray(objectArray) || !keyFrom) {
    return ''
  }
  const foundObject = objectArray.find(item => item[keyFrom] === valueFrom)
  return foundObject
}

export const convertDate = (date: any, format?: string) => {
  return dayjs(date).format(format ?? DATE_FORMAT.DATE_DASH)
}

export const convertTime = (date: any, format?: string) => {
  return dayjs(date).format(format ?? DATE_FORMAT.TIME_DASH)
}

export const formatDate = (date: any) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

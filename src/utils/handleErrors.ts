import first from 'lodash/first'
import { UseFormSetError } from 'react-hook-form'
import { TApiResponseError } from '@/types'

export const setErrorForInput = (err: TApiResponseError, setError: UseFormSetError<any>) => {
  const errorObj = err?.response?.data.errors
  if (!errorObj) return
  Object.keys(errorObj).forEach(error => {
    setError(error, { type: 'manual', message: first(errorObj[error]) })
  })
}

export const setCustomErrorForInput = (
  field: string,
  message: string,
  setError: UseFormSetError<any>,
) => {
  if (!message) return
  setError(field, {
    type: 'manual',
    message: message,
  })
}

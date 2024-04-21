import { DEBOUNCE } from '@/config/define'
import { debounce } from '@/utils/debounce'
import { useCallback } from 'react'

export const useDebouncedCallback = (func: { (): void; (arg0: any): any }) =>
  useCallback(debounce(func, DEBOUNCE.TIME_OUT), [])

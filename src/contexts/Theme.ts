import { ThemeProviderState } from '@/types'
import React, { useContext } from 'react'

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

export const ThemeContext = React.createContext<ThemeProviderState>(initialState)

export const useTheme = () => useContext(ThemeContext)

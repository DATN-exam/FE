import { useEffect, useMemo, useState } from 'react'
import { Theme, ThemeProviderProps } from '@/types'
import state from '@/utils/localStorage'
import { ThemeContext } from '@/contexts/Theme'

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, defaultTheme = 'system', storageKey = 'theme' } = props
  const [theme, setTheme] = useState<Theme>(state.getState(storageKey) || defaultTheme)

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: Theme) => {
        state.setState(storageKey, theme)
        setTheme(theme)
      },
    }),
    [theme],
  )

  useEffect(() => {
    function setRootTheme(theme: Theme) {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        root.classList.add(systemTheme)
      } else {
        root.classList.add(theme)
      }
    }

    state.setState(storageKey, theme)
    setRootTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

import { ReactNode } from 'react'

export type LoadingProviderProps = {
  children: ReactNode
}

export type SidebarActiveProviderProps = {
  children: ReactNode
}

export type AuthProviderProps = {
  children: ReactNode
}

export type Theme = 'dark' | 'light' | 'system'

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

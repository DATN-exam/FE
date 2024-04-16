const state = {
  getState: (key: string): any => {
    try {
      const localKey = localStorage.getItem(key)
      return localKey !== null ? JSON.parse(localKey) : null
    } catch (error) {
      console.error('Error while parsing state:', error)
      return null
    }
  },
  setState: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error('Error while setting state:', error)
    }
  },
  removeState: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error while removing state:', error)
    }
  },
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error while clearing state:', error)
    }
  },
}

export default state

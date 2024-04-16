import { useEffect, useMemo, useRef, useState } from 'react'
import { LoadingContext } from '@/contexts/loading'
import { LoadingOverlay } from '@/components/ui'
import { DEBOUNCE } from '@/config/define'
import { LoadingProviderProps } from '@/types'

const LoadingProvider = (props: LoadingProviderProps) => {
  const { children } = props
  const [loading, setLoading] = useState(false)
  const bodyRef = useRef(document.querySelector('body'))

  const valueLoading = useMemo(
    () => ({
      loading,
      showLoading: () => setLoading(true),
      hideLoading: () => {
        setTimeout(() => setLoading(false), DEBOUNCE.TIME_OUT)
      },
    }),
    [loading],
  )

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.pointerEvents = loading ? 'none' : 'auto'
    }
  }, [loading])

  return (
    <LoadingContext.Provider value={valueLoading}>
      <>
        {loading && <LoadingOverlay open />}
        {children}
      </>
    </LoadingContext.Provider>
  )
}

export default LoadingProvider

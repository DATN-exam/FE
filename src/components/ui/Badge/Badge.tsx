import { cn } from '@/lib/utils'

function Badge(props: any) {
  const { className, children } = props

  return (
    <span
      className={cn(
        'inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-gray-600 text-nowrap',
        className ?? 'bg-gray-800',
      )}
    >
      {children}
    </span>
  )
}

export default Badge

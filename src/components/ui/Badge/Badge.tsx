import { cn } from '@/lib/utils'

function Badge(props: any) {
  const { className, children } = props

  return (
    <span
      className={cn(
        'inline-flex items-center gap-x-1.5 text-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-gray-600',
        className ?? 'bg-gray-800',
      )}
    >
      {children}
    </span>
  )
}

export default Badge

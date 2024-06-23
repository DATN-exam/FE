import { cn } from '@/lib/utils'
import { InfoCardProps } from '@/types'

const InfoCard = (props: InfoCardProps) => {
  const { layoutClassName, iconClassName, title, content } = props

  return (
    <div className={cn('space-y-3 rounded bg-accent p-3 shadow', layoutClassName)}>
      <div className="flex items-center justify-start gap-3">
        <div className="flex size-12 items-center justify-center">
          <i className={cn(iconClassName, 'text-xl text-primary')}></i>
        </div>
        <span>{title}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{content}</h1>
        <p className="text-primary"></p>
      </div>
    </div>
  )
}

export default InfoCard

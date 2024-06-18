import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'
import labelVariants from './labelVariants'
import { LabelProps } from '@/types'

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, isRequired = false, ...props }, ref) => {
    return (
      <>
        <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />{' '}
        {isRequired ? <span className="text-red-500">*</span> : ''}
      </>
    )
  },
)
Label.displayName = LabelPrimitive.Root.displayName

export default Label

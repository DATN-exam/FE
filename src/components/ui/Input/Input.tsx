import * as React from 'react'
import { Controller } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui'
import { BaseInputProps, InputProps } from '@/types'

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type, name, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        id={name}
        name={name}
        className={cn(
          'flex w-full text-foreground rounded-md border border-input bg-background px-2.5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          className,
        )}
        {...props}
      />
    )
  },
)

const Input = (props: InputProps) => {
  const {
    ref,
    label,
    classNameLayout = '',
    classNameLabel = '',
    className = '',
    control,
    name,
    disabled = false,
    error,
    isRequired = false,
    ...rest
  } = props

  return (
    <div className={cn(classNameLayout)}>
      <Label htmlFor={name} className={classNameLabel} isRequired={isRequired}>
        {label}
      </Label>
      {control ? (
        <Controller
          disabled={disabled}
          control={control}
          name={name || ''}
          render={({ field }) => (
            <BaseInput {...field} name={name} className={className} error={error} {...rest} />
          )}
        />
      ) : (
        <BaseInput ref={ref} name={name} className={className} error={error} {...rest} />
      )}
      {error && (
        <p className="text-red-500 text-xs italic !mt-1">{error.message?.toString() ?? ''}</p>
      )}
    </div>
  )
}

export default Input

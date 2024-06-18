import { cn } from '@/lib/utils'
import { BaseSelectProps, SelectProps } from '@/types'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui'

const BaseSelect = React.forwardRef<HTMLSelectElement, BaseSelectProps>(
  ({ className, name, zeroValueText, options, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        id={name}
        name={name}
        className={cn(
          'flex w-full text-foreground rounded-md border border-input bg-background px-2.5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          className,
        )}
        {...props}
      >
        {zeroValueText && <option value="">{zeroValueText}</option>}
        {options?.map(option => {
          const { id, name, value } = option
          return (
            <option key={id} value={value ?? id}>
              {name}
            </option>
          )
        })}
      </select>
    )
  },
)

const Select = (props: SelectProps) => {
  const {
    ref,
    label,
    options,
    classNameLayout = '',
    classNameLabel = '',
    className = '',
    control,
    name,
    disabled = false,
    zeroValueText = '',
    error,
    isRequired = false,
    ...rest
  } = props

  return (
    <div className={classNameLayout}>
      <Label htmlFor={name} className={classNameLabel} isRequired={isRequired}>
        {label}
      </Label>
      {control ? (
        <Controller
          disabled={disabled}
          control={control}
          name={name || ''}
          render={({ field }) => (
            <BaseSelect
              {...field}
              name={name}
              zeroValueText={zeroValueText}
              error={error}
              options={options}
              className={className}
              {...rest}
            />
          )}
        />
      ) : (
        <BaseSelect
          ref={ref}
          name={name}
          zeroValueText={zeroValueText}
          error={error}
          options={options}
          className={className}
          {...rest}
        />
      )}
      {error && <p className="text-red-500 text-xs italic">{error.message?.toString() ?? ''}</p>}
    </div>
  )
}

export default Select

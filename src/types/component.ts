import { DetailedHTMLProps, InputHTMLAttributes, MutableRefObject } from 'react'
import { SelectSingleEventHandler } from 'react-day-picker'
import { Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export type LoadingOverlayProps = {
  open: boolean
}

export type BaseInputProps = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
} & React.InputHTMLAttributes<HTMLInputElement>

export type InputProps = {
  label?: string
  control?: Control<any, any>
  classNameLayout?: string
  classNameLabel?: string
  className?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  ref?: MutableRefObject<HTMLInputElement | null>
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type DatePickerProps = {
  label?: string
  control?: Control<any, any>
  classNameLayout?: string
  classNameLabel?: string
  className?: string
  value?: Date | null
  dateFormat?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  onSelect?: SelectSingleEventHandler
}

export type CheckboxProps = {
  label?: string
  classNameLayout?: string
  classNameLabel?: string
  className?: string
  name?: string
  disabled?: boolean
  ref?: MutableRefObject<HTMLButtonElement | null>
} & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

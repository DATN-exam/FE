import {
  ComponentPropsWithoutRef,
  InputHTMLAttributes,
  MutableRefObject,
  SelectHTMLAttributes,
} from 'react'
import { SelectSingleEventHandler } from 'react-day-picker'
import { Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export type LoadingOverlayProps = {
  open: boolean
}

export type BaseInputProps = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
} & InputHTMLAttributes<HTMLInputElement>

export type InputProps = {
  label?: string
  control?: Control<any, any>
  classNameLayout?: string
  classNameLabel?: string
  className?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  ref?: MutableRefObject<HTMLInputElement | null>
} & InputHTMLAttributes<HTMLInputElement>

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
} & ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

export type TListOption = {
  id?: string | number
  name?: string
  value?: string | number
}

export type BaseSelectProps = {
  zeroValueText?: string
  options?: TListOption[] | []
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
} & SelectHTMLAttributes<HTMLSelectElement>

export type SelectProps = {
  label?: string
  control?: Control<any, any>
  classNameLayout?: string
  classNameLabel?: string
  className?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  ref?: MutableRefObject<HTMLSelectElement | null>
  zeroValueText?: string
  options?: TListOption[] | []
} & SelectHTMLAttributes<HTMLSelectElement>

import { DetailedHTMLProps, InputHTMLAttributes, MutableRefObject } from 'react'
import { Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

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

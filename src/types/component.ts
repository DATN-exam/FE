import {
  ComponentPropsWithoutRef,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'
import { SelectSingleEventHandler } from 'react-day-picker'
import { Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as LabelPrimitive from '@radix-ui/react-label'
import { VariantProps } from 'class-variance-authority'
import { labelVariants } from '@/components/ui/Label'

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
  isRequired?: boolean
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
  isRequired?: boolean
} & SelectHTMLAttributes<HTMLSelectElement>

export type ModalProps = {
  show: boolean
  children: ReactNode
  className?: string
  close: () => void
  afterLeave?: () => void
}

export type LabelProps = {
  isRequired?: boolean
} & React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>

export type HorizontalBarChartProps = {
  layoutClassName: string
  title: string
  dataLabel: string
  dataset: number[] | string[]
  labels: string[]
  chartBackgroundColor?: string
  chartBorderColor?: string
}

export type LineChartProps = {
  layoutClassName: string
  title: string
  dataLabel: string
  dataset: number[] | string[]
  labels: string[]
  chartBackgroundColor?: string
  chartBorderColor?: string
}

export type InfoCardProps = {
  layoutClassName?: string
  iconClassName: string
  title: string
  content: string
}

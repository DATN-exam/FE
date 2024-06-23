import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Calendar, Label, Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { DatePickerProps } from '@/types'
import { DATE_FORMAT } from '@/config/define'

function DatePicker(props: DatePickerProps) {
  const {
    label,
    classNameLayout = '',
    classNameLabel = '',
    className = '',
    error,
    value,
    dateFormat = DATE_FORMAT.DATE_DASH,
    onSelect,
  } = props

  return (
    <div className="space-y-2">
      <Label className={classNameLabel}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              classNameLayout,
              !value && 'text-muted-foreground',
              error && 'border-red-500 focus-visible:ring-red-500',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, dateFormat) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={onSelect}
            className={className}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="!mt-1 text-xs italic text-red-500">{error.message?.toString() ?? ''}</p>
      )}
    </div>
  )
}

export default DatePicker

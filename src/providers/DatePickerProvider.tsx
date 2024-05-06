import { DATE_FORMAT } from '@/config/define'
import { DatePickerProviderProps } from '@/types'
import { ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import vi from 'antd/es/date-picker/locale/vi_VN'

const DatePickerProvider = (props: DatePickerProviderProps) => {
  const { children } = props
  const buddhistLocale: typeof vi = {
    ...vi,
    lang: {
      ...vi.lang,
      fieldDateFormat: DATE_FORMAT.DATE_DASH,
      fieldDateTimeFormat: DATE_FORMAT.DATE_TIME_DASH,
      yearFormat: 'YYYY',
      cellYearFormat: 'YYYY',
      shortWeekDays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      shortMonths: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
  }

  const globalBuddhistLocale: typeof viVN = {
    ...viVN,
    DatePicker: {
      ...viVN.DatePicker!,
      lang: buddhistLocale.lang,
    },
  }

  return <ConfigProvider locale={globalBuddhistLocale}>{children}</ConfigProvider>
}

export default DatePickerProvider

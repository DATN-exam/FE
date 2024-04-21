import { ReactNode, TableHTMLAttributes } from 'react'
import { TOnChangePage, TSetPagination } from './pagination'

export type TableProps = {
  columns?: TTableColumn[]
  onSort?: (sort: TSortOrder) => void
  handleChangePage?: TOnChangePage
  rows?: any[]
  pagination?: TSetPagination
  onRowClick?: (data: any) => void
  showHeader?: boolean
  customNullDataText?: string | ReactNode
  classNameLayout?: string
  sortColumn?: string
  sortType?: string
} & TableHTMLAttributes<HTMLTableElement>

export type TSortOrder = {
  sort_column?: string
  sort_type?: string
}

export type TTableColumn = {
  headerName?: string
  field: string
  sortable?: boolean
  getAction?: (data: any) => React.ReactNode
  valueGetter?: (params: any) => React.ReactNode
}

export type TPagination = {
  current_page: number
  data: any
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: TLinkPagination
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type TLinkPagination = {
  url: string | null
  label: string
  active: boolean
}[]

export type TOnChangePage = (selected: number) => void

export type PaginationProps = {
  pageCount: number
  currentPage: number
  onChangePage: TOnChangePage
}

export type TSetPagination = {
  currentPage?: number
  lastPage?: number
  total?: number
  perPage?: number
  from?: number
  to?: number
}

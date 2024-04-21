import { TPagination, TSetPagination } from '@/types'

export const setPaginationData = (data: TPagination) => {
  const {
    current_page: currentPage,
    last_page: lastPage,
    total,
    per_page: perPage,
    from,
    to,
  } = data

  const paginationData: TSetPagination = {
    currentPage,
    lastPage,
    total,
    perPage,
    from,
    to,
  }

  return paginationData
}

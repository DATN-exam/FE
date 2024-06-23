import { PAGINATION } from '@/config/define'
import { cn } from '@/lib/utils'
import { PaginationProps } from '@/types'
import ReactPaginate from 'react-paginate'

const Pagination = (props: PaginationProps) => {
  const { pageCount, onChangePage, currentPage } = props

  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      forcePage={currentPage - 1}
      marginPagesDisplayed={PAGINATION.MARGIN_RANGE_DISPLAY}
      pageCount={pageCount ?? 0}
      disableInitialCallback={true}
      renderOnZeroPageCount={null}
      className={cn('flex select-none flex-wrap items-center justify-center gap-2')}
      breakLinkClassName={cn(
        'flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent',
      )}
      pageLinkClassName={cn(
        'flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent',
      )}
      previousLinkClassName={cn(
        'flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent',
      )}
      nextLinkClassName={cn(
        'flex items-center justify-center px-3 h-8 leading-tight bg-background text-foreground border rounded hover:bg-accent',
      )}
      activeLinkClassName={cn('!bg-primary !text-primary-foreground')}
      disabledLinkClassName={cn('!bg-muted !text-muted-foreground cursor-default')}
      onPageChange={({ selected }) => {
        onChangePage(selected + 1)
      }}
    />
  )
}

export default Pagination

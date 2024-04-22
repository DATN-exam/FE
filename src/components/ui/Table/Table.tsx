import { SORT_TYPE } from '@/config/define'
import { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui'
import { TSortOrder, TableProps } from '@/types'
import { cn } from '@/lib/utils'

const Table = (props: TableProps) => {
  const {
    rows,
    columns,
    pagination,
    onRowClick = () => {},
    handleChangePage,
    classNameLayout,
    className,
    showHeader = true,
    customNullDataText,
    onSort = () => {},
    defaultSortColumn,
    defaultSortType,
  } = props
  const { lastPage, total, currentPage } = pagination || {}
  const [sortOrder, setSortOrder] = useState<TSortOrder>({})

  const handleSort = (columnName: string) => {
    const newSortOrder = {
      sort_column: columnName,
      sort_type:
        sortOrder.sort_column === columnName && sortOrder.sort_type === SORT_TYPE.ASC
          ? SORT_TYPE.DESC
          : SORT_TYPE.ASC,
    }
    setSortOrder(newSortOrder)
    onSort(newSortOrder)
  }

  useEffect(() => {
    setSortOrder({
      sort_column: defaultSortColumn,
      sort_type: defaultSortType,
    })
  }, [defaultSortColumn, defaultSortType])

  return (
    <div className={`space-y-5 ${classNameLayout}`}>
      <div className="w-full overflow-x-auto">
        <table
          className={cn(
            'w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-foreground',
            className,
          )}
        >
          {showHeader && (
            <thead className="text-xs text-foreground uppercase bg-secondary">
              <tr>
                {columns?.map((column, index) => {
                  const { sortable, headerName, field } = column
                  return (
                    <th
                      key={index}
                      onClick={() => {
                        if (sortable) {
                          handleSort(field)
                        }
                      }}
                      className={`px-6 py-4 ${sortable ? 'cursor-pointer' : ''}`}
                    >
                      <div className={`${sortable ? 'flex justify-start items-center gap-2' : ''}`}>
                        <p>{headerName}</p>
                        {sortable && sortOrder.sort_column === field && sortOrder.sort_type && (
                          <div className="flex justify-center items-center">
                            <i
                              className={`fa-solid ${
                                sortOrder.sort_type == SORT_TYPE.ASC
                                  ? 'fa-caret-up'
                                  : 'fa-caret-down'
                              }`}
                            ></i>
                          </div>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
          )}
          <tbody className="bg-card text-foreground">
            {rows?.length ? (
              rows?.map((row, indexRow) => {
                return (
                  <tr key={indexRow} className="border-b">
                    {columns?.map((column, index) => {
                      const { getAction, valueGetter, field } = column
                      return (
                        <td
                          key={index}
                          onClick={() => {
                            onRowClick && onRowClick(row)
                          }}
                          className="px-6 py-4"
                        >
                          {valueGetter ? valueGetter(row) : getAction ? getAction(row) : row[field]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={columns?.length ?? 0} className="px-6 py-4 text-center">
                  {customNullDataText ? customNullDataText : 'Không có dữ liệu'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {handleChangePage && lastPage && currentPage ? (
        <div className="grid grid-cols-4">
          <div className="hidden md:block col-span-1"></div>
          <div className="col-span-3 md:col-span-2">
            <Pagination
              pageCount={lastPage}
              currentPage={currentPage}
              onChangePage={handleChangePage}
            />
          </div>
          <div className="flex items-end justify-end col-span-1">
            {!!total && (
              <p className="text-xs text-end text-foreground uppercase">{`Tổng: ${total}`}</p>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Table

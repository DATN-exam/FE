import { SORT_TYPE } from '@/config/define'
import { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui'
import { TSortOrder, TableProps } from '@/types'

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
    sortColumn,
    sortType,
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
      sort_column: sortColumn,
      sort_type: sortType,
    })
  }, [sortColumn, sortType])

  return (
    <div className={`space-y-5 ${classNameLayout}`}>
      <div className="w-full overflow-x-auto">
        <table
          className={`w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 ${className}`}
        >
          {showHeader && (
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
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
          <tbody>
            {rows?.length ? (
              rows?.map((row, indexRow) => {
                return (
                  <tr key={indexRow} className="bg-white border-b">
                    {columns?.map((column, index) => {
                      const { getAction, valueGetter, field } = column
                      return (
                        <td
                          key={index}
                          onClick={() => {
                            onRowClick && onRowClick(row)
                          }}
                          className="px-6 py-4 text-gray-900"
                        >
                          {valueGetter ? valueGetter(row) : getAction ? getAction(row) : row[field]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr className="bg-white">
                <td colSpan={columns?.length ?? 0} className="px-6 py-4 text-center text-gray-900">
                  {customNullDataText ? customNullDataText : 'Không có dữ liệu'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {handleChangePage && lastPage && currentPage ? (
        <div className="flex w-full overflow-x-auto">
          <div className="hidden md:flex flex-1"></div>
          <div className="flex-1">
            <Pagination
              pageCount={lastPage}
              currentPage={currentPage}
              onChangePage={handleChangePage}
            />
          </div>
          <div className="hidden md:flex flex-1 items-end justify-end">
            {!!total && (
              <p className="text-xs text-end text-gray-700 uppercase">{`Tổng: ${total}`}</p>
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

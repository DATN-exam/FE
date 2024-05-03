import { Button, Input, Select } from '@/components/ui'
import { CLASSROOM_STATUS_LIST_OPTIONS } from '@/config/define'
import { ClassroomSearchFormProps } from '@/types/teacher'
import { ChangeEvent } from 'react'

const SearchForm = (props: ClassroomSearchFormProps) => {
  const { dataSearch, setDataSearch, onReset, onSearch } = props

  const changeDataSearch = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-sm">
        <Input
          label="Tên"
          placeholder="Tên"
          name="name"
          value={dataSearch?.name ?? ''}
          onChange={changeDataSearch}
          autoComplete="off"
        />
        <Select
          label="Trạng thái"
          name="status"
          zeroValueText="Tất cả trạng thái"
          options={CLASSROOM_STATUS_LIST_OPTIONS}
          value={dataSearch?.status ?? ''}
          onChange={changeDataSearch}
        />
      </div>
      <div className="flex justify-center gap-4">
        <Button type="button" onClick={onReset}>
          <i className="fa-regular fa-rotate-right"></i>
          <span>Làm mới</span>
        </Button>
        <Button type="button" onClick={onSearch}>
          <i className="fa-regular fa-magnifying-glass"></i>
          <span>Tìm kiếm</span>
        </Button>
      </div>
    </form>
  )
}

export default SearchForm

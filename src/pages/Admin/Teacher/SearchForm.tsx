import { Button, Input, Select } from '@/components/ui'
import { TEACHER_STATUS_LIST_OPTIONS } from '@/config/define'
import { TeacherSearchFormProps } from '@/types/admin'
import { ChangeEvent } from 'react'

const SearchForm = (props: TeacherSearchFormProps) => {
  const { dataSearch, setDataSearch, onReset, onSearch } = props

  const changeDataSearch = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Input
          label="ID"
          placeholder="ID"
          name="id"
          value={dataSearch?.id ?? ''}
          onChange={changeDataSearch}
          autoComplete="off"
        />
        <Input
          label="Tên"
          placeholder="Tên"
          name="name"
          value={dataSearch?.name ?? ''}
          onChange={changeDataSearch}
          autoComplete="off"
        />
        <Input
          label="Email"
          placeholder="Email"
          name="email"
          value={dataSearch?.email ?? ''}
          onChange={changeDataSearch}
          autoComplete="off"
        />
        <Select
          label="Trạng thái"
          name="status"
          zeroValueText="Tất cả trạng thái"
          options={TEACHER_STATUS_LIST_OPTIONS}
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

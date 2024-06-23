import { Button, Input, Select } from '@/components/ui'
import { QUESTION_STATUS_LIST_OPTIONS, QUESTION_TYPE_LIST_OPTIONS } from '@/config/define'
import { QuestionSearchFormProps } from '@/types/teacher/question'
import { cx } from 'class-variance-authority'
import { ChangeEvent } from 'react'

const SearchForm = (props: QuestionSearchFormProps) => {
  const { dataSearch, setDataSearch, onReset, onSearch, className } = props

  const changeDataSearch = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className={cx('space-y-4', className)}>
      <div className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Input
          label="Câu hỏi"
          placeholder="Câu hỏi"
          name="question"
          value={dataSearch?.question ?? ''}
          onChange={changeDataSearch}
          autoComplete="off"
        />
        <Select
          label="Trạng thái"
          name="status"
          zeroValueText="Tất cả trạng thái"
          options={QUESTION_STATUS_LIST_OPTIONS}
          value={dataSearch?.status ?? ''}
          onChange={changeDataSearch}
        />
        <Select
          label="Loại"
          name="type"
          zeroValueText="Tất cả trạng thái"
          options={QUESTION_TYPE_LIST_OPTIONS}
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

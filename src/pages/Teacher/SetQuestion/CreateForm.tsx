import { Button, Input, Select, Toast } from '@/components/ui'
import { SET_QUESTION_LIST_OPTIONS } from '@/config/define'
import useHandleError from '@/hooks/useHandleError'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'
import setQuestionService from '@/services/teacher/setQuestionService'
import { useNavigate } from 'react-router-dom'
import { ROUTES_TEACHER } from '@/config/routes'

const defaultValue = {
  title: '',
  status: SET_QUESTION_LIST_OPTIONS[0],
  description: '',
  note: '',
}
const CreateForm = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: defaultValue,
  })
  const navigate = useNavigate()
  const { showLoading, hideLoading } = props
  const { handleResponseError } = useHandleError()
  const createClassroom: SubmitHandler<any> = data => {
    data = {
      ...data,
      status: data.status.value,
    }
    showLoading()
    setQuestionService
      .create(data)
      .then(data => {
        Toast.success('Tạo bộ câu hỏi thành công')
        navigate(ROUTES_TEACHER.SET_QUESTION.UPDATE.replace(':id', data.id))
      })
      .catch((err: any) => {
        if (err.response.status == 422) {
          setErrorForInput(err, setError)
        }
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  const {
    title: titleError,
    status: statusError,
    description: descriptionError,
    note: noteError,
  } = errors
  return (
    <form onSubmit={handleSubmit(createClassroom)}>
      <div className="mt-4">
        <label className="text-black">Tên bộ câu hỏi</label>
        <Input
          className="mt-1 w-full rounded-md border-gray-300 bg-white px-2 py-1 text-black"
          placeholder="Tên bộ câu hỏi"
          type="text"
          name="title"
          control={control}
          error={titleError}
        />
      </div>
      <div className="mt-4">
        <Select
          label="Trạng thái"
          name="status"
          options={SET_QUESTION_LIST_OPTIONS}
          error={statusError}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Mô tả</label>
        <Input
          className="mt-1 w-full rounded-md border-gray-300 bg-white px-2 py-1 text-black"
          placeholder="Mô tả"
          type="text"
          name="description"
          control={control}
          error={descriptionError}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Lưu ý</label>
        <Input
          className="mt-1 w-full rounded-md border-gray-300 bg-white px-2 py-1 text-black"
          placeholder="Lưu ý"
          type="text"
          name="note"
          control={control}
          error={noteError}
        />
      </div>
      <div className="mt-4">
        <Button type="submit">Tạo mới</Button>
      </div>
    </form>
  )
}

export default CreateForm

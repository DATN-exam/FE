import { useEffect } from 'react'
import { ROUTES_TEACHER } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import useHandleError from '@/hooks/useHandleError'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, Toast } from '@/components/ui'
import { SET_QUESTION_LIST_OPTIONS } from '@/config/define'
import Header from '../Header'
import setQuestionService from '@/services/teacher/setQuestionService'
import { setErrorForInput } from '@/utils/handleErrors'

function SetQuestionUpdate() {
  const defaultValues = {
    title: '',
    status: '',
    description: '',
    note: '',
  }
  const { id } = useParams()
  const { setSidebarActive } = useSidebarActive()
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const statusList = SET_QUESTION_LIST_OPTIONS
  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const {
    title: titleError,
    status: statusError,
    description: descriptionError,
    note: noteError,
  } = errors

  const fetchSetQuestion = () => {
    showLoading()
    setQuestionService
      .show(id)
      .then(data => {
        reset(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchUpdateSetQuestion = (data: any) => {
    showLoading()
    setQuestionService
      .update(id, data)
      .then(() => {
        Toast.success('Cập nhật thành công')
        debouncedSetQuestion()
      })
      .catch(err => {
        if (err.response.status == 422) {
          setErrorForInput(err, setError)
        }
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const hanldSubmitUpdate = handleSubmit((data: any) => {
    fetchUpdateSetQuestion(data)
  })

  const debouncedSetQuestion = useDebouncedCallback(fetchSetQuestion)

  useEffect(() => {
    setSidebarActive(ROUTES_TEACHER.SET_QUESTION.INDEX)
    debouncedSetQuestion()
  }, [])

  return (
    <div className="space-y-8">
      <Header />
      <h1 className="text-3xl text-foreground">Chỉnh sửa thông tin bộ câu hỏi</h1>
      <div className="space-y-6 rounded bg-card p-5 shadow">
        <form onSubmit={hanldSubmitUpdate}>
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
            <label className="text-black">Trạng thái</label>
            <Select options={statusList} name="status" control={control} error={statusError} />
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
            <Button type="submit">Cập nhật</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SetQuestionUpdate

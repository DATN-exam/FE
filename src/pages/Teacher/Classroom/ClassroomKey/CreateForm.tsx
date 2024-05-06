import { Button, Input, Select, Toast } from '@/components/ui'
import { CLASSROOM_KEY_LIST_OPTIONS } from '@/config/define'
import useHandleError from '@/hooks/useHandleError'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'
import { DatePicker } from 'antd'
import { convertDate } from '@/utils/helper'
import { ClassroomKeyPayload } from '@/types/teacher/classroomKey'
import { useParams } from 'react-router-dom'
import classroomKeyService from '@/services/teacher/classroomKeyService'

const CreateForm = (props: any) => {
  const { id } = useParams()
  const defaultValue: ClassroomKeyPayload = {
    name: '',
    status: CLASSROOM_KEY_LIST_OPTIONS[0].value,
    classroom_id: id ?? '',
    expired: '',
    quantity: 9999,
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
    clearErrors,
  } = useForm<ClassroomKeyPayload>({
    defaultValues: defaultValue,
  })
  const { showLoading, hideLoading, debouncedFetchClassroomKeys, setOpenFormAdd, dataSearch } =
    props
  const { handleResponseError } = useHandleError()
  const hanldChangeDate = (e: any) => {
    clearErrors('expired')
    setValue('expired', convertDate(e))
  }
  const createKey: SubmitHandler<ClassroomKeyPayload> = data => {
    showLoading()
    showLoading()
    classroomKeyService
      .create(id, data)
      .then(data => {
        console.log(data)
        Toast.success('Tạo lớp học thành công')
        reset(defaultValue)
        debouncedFetchClassroomKeys(dataSearch)
        setOpenFormAdd(false)
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
    name: nameError,
    status: statusError,
    quantity: quantityError,
    expired: expiredError,
  } = errors
  return (
    <form onSubmit={handleSubmit(createKey)}>
      <div className="mt-4">
        <label className="text-black">Tên mã</label>
        <Input
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
          placeholder="Tên mã"
          type="text"
          name="name"
          control={control}
          error={nameError}
        />
      </div>
      <div className="mt-4">
        <Select
          label="Trạng thái"
          name="status"
          options={CLASSROOM_KEY_LIST_OPTIONS}
          control={control}
          error={statusError}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Số lượng</label>
        <Input
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
          placeholder="Số lượng"
          type="number"
          name="quantity"
          control={control}
          error={quantityError}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Ngày hết hạn</label>
        <DatePicker
          className="w-full mt-1"
          onChange={e => hanldChangeDate(e)}
          status={expiredError ? 'error' : ''}
        />
        {expiredError && (
          <p className="text-red-500 text-xs italic !mt-1">{expiredError?.message}</p>
        )}
      </div>
      <div className="mt-4">
        <Button type="submit">Tạo mới</Button>
      </div>
    </form>
  )
}

export default CreateForm

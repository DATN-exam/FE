import { Alert, Button, Input } from '@/components/ui'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import authService from '@/services/site/authService'
import { useForm } from 'react-hook-form'

const defaultValues = {
  description: '',
}

const TeacherRegistration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })
  const { description: descriptionError } = errors
  const { handleResponseError } = useHandleError()
  const { showLoading, hideLoading } = useLoading()

  const handleRegister = (fields: any) => {
    showLoading()
    authService
      .registerTeacher(fields)
      .then(() => {
        Alert.alert(
          'Đăng kí trở thành giáo viên thành công',
          'Bạn đã đăng kí trở thành giáo viên thành công vui lòng chờ quản trị viên xét duyệt',
          'success',
        )
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
      <h1 className="text-3xl font-medium text-center text-foreground">Đăng ký làm giáo viên</h1>
      <Input
        placeholder="Lý do"
        label="Lý do"
        name="description"
        control={control}
        error={descriptionError}
        autoComplete="off"
        isRequired
      />
      <Button className="w-full">Đăng ký</Button>
    </form>
  )
}

export default TeacherRegistration

import { Alert, Button, Input } from '@/components/ui'
import { ROUTES_SITE } from '@/config/routes'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import authService from '@/services/site/authService'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const defaultValues = {
  email: '',
}

function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { email: emailError } = errors
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()

  const handleForgotPassword = (fields: any) => {
    showLoading()
    authService
      .forgotPass(fields)
      .then(() => {
        Alert.alert(
          'Thành công',
          'Yêu cầu đổi mật khẩu thành công! Vui lòng kiểm tra email của bạn',
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
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <div className="space-y-6">
        <h1 className="text-center text-3xl font-bold text-foreground">Quên mật khẩu</h1>
        <Input
          type="email"
          placeholder="m@example.com"
          label="Email"
          name="email"
          control={control}
          error={emailError}
          autoComplete="off"
          isRequired
        />
        <div className="!mt-1 flex justify-end">
          <Link to={ROUTES_SITE.AUTH.LOGIN} className="text-sm text-foreground underline">
            Đăng nhập
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Xác nhận
        </Button>
      </div>
    </form>
  )
}

export default ForgotPassword

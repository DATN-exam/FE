import { Button, Input } from '@/components/ui'
import { ROUTES_SITE } from '@/config/routes'
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

  const handleForgotPassword = (fields: any) => {
    console.log(fields)
  }

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground">Quên mật khẩu</h1>
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
        <div className="flex justify-end !mt-1">
          <Link to={ROUTES_SITE.AUTH.LOGIN} className="text-sm underline text-foreground">
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

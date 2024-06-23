import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Input,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
} from '@/components/ui'
import { useAuthAdmin } from '@/contexts/authAdmin'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import { LoginPayloads } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES_ADMIN } from '@/config/routes'
import { setErrorForInput } from '@/utils/handleErrors'

const defaultValues: LoginPayloads = {
  email: '',
  password: '',
}

function Login() {
  const { showLoading, hideLoading } = useLoading()
  const { authToken, authLogin } = useAuthAdmin()
  const { handleResponseError } = useHandleError()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { email: emailError, password: passwordError } = errors

  const login: SubmitHandler<LoginPayloads> = data => {
    showLoading()
    authLogin(data)
      .catch((err: any) => {
        if (err.response.status == 422) {
          setErrorForInput(err, setError)
        } else {
          handleResponseError(err)
        }
      })
      .finally(() => {
        hideLoading()
      })
  }

  useEffect(() => {
    if (authToken) {
      navigate(ROUTES_ADMIN.DASHBOARD, { replace: true })
    }
  }, [authToken])

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-secondary">
      <form onSubmit={handleSubmit(login)} className="w-full max-w-sm">
        <Card className="border-none bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Đăng nhập Admin</CardTitle>
          </CardHeader>
          <CardContent className="grid space-y-6">
            <Input
              type="email"
              placeholder="m@example.com"
              label="Email"
              name="email"
              control={control}
              error={emailError}
            />
            <Input
              type={`${isShowPassword ? 'text' : 'password'}`}
              label="Mật khẩu"
              name="password"
              control={control}
              error={passwordError}
            />
            <div className="!mt-2 flex justify-between">
              <Checkbox
                label="Hiển thị mật khẩu"
                name="show-password"
                checked={isShowPassword}
                onCheckedChange={checked => setIsShowPassword(!!checked)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Đăng nhập</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default Login

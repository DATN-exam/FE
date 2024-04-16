import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Input,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { useAuthAdmin } from '@/contexts/authAdmin'
import { useLoading } from '@/contexts/loading'
import useHandleError from '@/hooks/useHandleError'
import { LoginPayloads } from '@/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES_ADMIN } from '@/config/routes'

const defaultValues = {
  email: '',
  password: '',
}

function Login() {
  const { showLoading, hideLoading } = useLoading()
  const { authToken, authLogin } = useAuthAdmin()
  const { handleResponseError } = useHandleError()
  const navigate = useNavigate()

  const login: SubmitHandler<LoginPayloads> = data => {
    showLoading()
    authLogin(data)
      .catch((err: any) => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { email: emailError, password: passwordError } = errors

  useEffect(() => {
    if (authToken) {
      navigate(ROUTES_ADMIN.DASHBOARD, { replace: true })
    }
  }, [authToken])

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-200">
      <form onSubmit={handleSubmit(login)} className="w-full max-w-sm">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Đăng nhập123</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input
              type="email"
              placeholder="m@example.com"
              label="Email"
              name="email"
              control={control}
              error={emailError}
            />
            <Input
              type="password"
              label="Mật khẩu"
              name="password"
              control={control}
              error={passwordError}
            />
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

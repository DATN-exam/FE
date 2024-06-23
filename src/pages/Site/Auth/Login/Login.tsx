import { useForm } from 'react-hook-form'
import { Input, Button, Checkbox, Toast } from '@/components/ui'
import { useAuth } from '@/contexts/auth'
import { useLoading } from '@/contexts/loading'
import { LoginPayloads } from '@/types'
import { setErrorForInput } from '@/utils/handleErrors'
import { Link } from 'react-router-dom'
import { ROUTES_SITE } from '@/config/routes'
import { useState } from 'react'
import useHandleError from '@/hooks/useHandleError'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const defaultValues: LoginPayloads = {
  email: '',
  password: '',
}

function Login() {
  const { showLoading, hideLoading } = useLoading()
  const { authLogin, authLoginWithGoogle } = useAuth()
  const { handleResponseError } = useHandleError()
  const [isShowPassword, setIsShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { email: emailError, password: passwordError } = errors

  const login = (data: LoginPayloads) => {
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

  const loginWithGoogle = (token: string) => {
    if (!token) {
      Toast.error('Đăng nhập thất bại')
      return
    }
    showLoading()
    const dataDecoded = jwtDecode<any>(token)
    authLoginWithGoogle(dataDecoded)
      .catch((err: any) => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  return (
    <form onSubmit={handleSubmit(login)}>
      <div className="space-y-6">
        <h1 className="text-center text-3xl font-bold text-foreground">Đăng nhập</h1>
        <Input
          type="email"
          placeholder="m@example.com"
          label="Email"
          name="email"
          control={control}
          error={emailError}
          isRequired
        />
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          label="Mật khẩu"
          name="password"
          control={control}
          error={passwordError}
          autoComplete="off"
          isRequired
        />
        <div className="!mt-2 flex justify-between">
          <Checkbox
            label="Hiển thị mật khẩu"
            name="show-password"
            checked={isShowPassword}
            onCheckedChange={checked => setIsShowPassword(!!checked)}
          />
          <Link to={ROUTES_SITE.AUTH.FORGOT_PASSWORD} className="text-sm text-foreground underline">
            Quên mật khẩu
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Đăng nhập
        </Button>
        <div className="!mt-3">
          <GoogleLogin
            size="large"
            width="350px"
            onSuccess={credentialResponse => {
              loginWithGoogle(credentialResponse?.credential ?? '')
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
        <div className="text-center text-sm text-foreground">
          Chưa có tài khoản?{' '}
          <Link to={ROUTES_SITE.AUTH.REGISTER} className="underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Login

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState } from 'react'
import { Button, Checkbox, Input } from '@/components/ui'
import { format } from 'date-fns'
import { ROUTES_SITE } from '@/config/routes'
import { RegisterPayloads } from '@/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { DATE_FORMAT } from '@/config/define'
import authService from '@/services/site/authService'
import { useLoading } from '@/contexts/loading'
import { setErrorForInput } from '@/utils/handleErrors'

const defaultValues = {
  first_name: '',
  last_name: '',
  dob: '',
  email: '',
  password: '',
  password_confirm: '',
}

function Register() {
  const { showLoading, hideLoading } = useLoading()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const register: SubmitHandler<RegisterPayloads> = fields => {
    showLoading()
    const payloads: RegisterPayloads = {
      ...fields,
      dob: fields.dob ? format(new Date(fields.dob), DATE_FORMAT.DATE_DASH) : '',
    }
    authService
      .register(payloads)
      .then(() => {
        MySwal.fire({
          position: 'center',
          icon: 'success',
          text: 'Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác minh tài khoản',
          showConfirmButton: true,
        }).then(() => {
          navigate(ROUTES_SITE.AUTH.LOGIN)
        })
      })
      .catch(err => {
        setErrorForInput(err, setError)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues })
  const {
    first_name: firstNameError,
    last_name: lastNameError,
    dob: dobError,
    email: emailError,
    password: passwordError,
    password_confirm: passwordConfirmError,
  } = errors

  return (
    <form onSubmit={handleSubmit(register)}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center">Đăng ký</h1>
        <Input
          placeholder="Nguyen Van"
          label="Họ và tên lót"
          name="last_name"
          control={control}
          error={lastNameError}
          autoComplete="off"
        />
        <Input
          placeholder="A"
          label="Tên"
          name="first_name"
          control={control}
          error={firstNameError}
          autoComplete="off"
        />
        <Input
          type="date"
          label="Ngày sinh"
          name="dob"
          control={control}
          error={dobError}
          autoComplete="off"
        />
        <Input
          type="email"
          placeholder="m@example.com"
          label="Email"
          name="email"
          control={control}
          error={emailError}
          autoComplete="off"
        />
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          label="Mật khẩu"
          name="password"
          control={control}
          error={passwordError}
        />
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          label="Mật khẩu xác nhận"
          name="password_confirm"
          control={control}
          error={passwordConfirmError}
        />
        <div className="!mt-2">
          <Checkbox
            label="Hiển thị mật khẩu"
            name="show-password"
            checked={isShowPassword}
            onCheckedChange={checked => setIsShowPassword(!!checked)}
          />
        </div>
        <Button type="submit" className="w-full">
          Đăng ký
        </Button>
        <div className="!mt-4 text-center text-sm">
          Đã có tài khoản?{' '}
          <Link to={ROUTES_SITE.AUTH.LOGIN} className="underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Register

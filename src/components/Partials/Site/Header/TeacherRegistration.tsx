import { Button, Input } from '@/components/ui'
import { useForm } from 'react-hook-form'

const defaultValues = {
  reason: '',
}

const TeacherRegistration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })
  const { reason: reasonError } = errors

  const handleRegister = (fields: any) => {
    console.log(fields)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
      <h1 className="text-3xl font-medium text-center text-foreground">Đăng ký làm giáo viên</h1>
      <Input
        placeholder="Lý do"
        label="Lý do"
        name="reason"
        control={control}
        error={reasonError}
        autoComplete="off"
        isRequired
      />
      <Button className="w-full">Đăng ký</Button>
    </form>
  )
}

export default TeacherRegistration

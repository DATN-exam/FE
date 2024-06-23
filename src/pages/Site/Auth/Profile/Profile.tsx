import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/contexts/auth'
import userAvatarDefault from '@/assets/user-avatar-default.png'
import { cn } from '@/lib/utils'
import { useSidebarActive } from '@/contexts/sidebarActive'
import { ROUTES_SITE } from '@/config/routes'

const Profile = () => {
  const { setSidebarActive } = useSidebarActive()
  const { authProfile } = useAuth()
  const [avatarUrlPreview, setAvatarUrlPreview] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: authProfile })
  const { firstNameError, lastNameError, emailError, dobError, avatarError } = errors

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setValue('avatar', files[0])
    }
    e.target.value = ''
  }

  const handleUpdate = (fields: any) => {
    console.log(fields)
  }

  useEffect(() => {
    setSidebarActive(ROUTES_SITE.AUTH.PROFILE)
  }, [])

  useEffect(() => {
    let url: string
    if (getValues('avatar')) {
      url = URL.createObjectURL(getValues('avatar'))
      setAvatarUrlPreview(url)
      clearErrors('images')
    }

    return () => {
      url && URL.revokeObjectURL(url)
    }
  }, [watch('avatar')])

  return (
    <section>
      <div className="px-6 py-5">
        <h1 className="text-2xl font-medium text-foreground">Thông tin cá nhân</h1>
      </div>
      <hr />
      <div className="space-y-6 rounded bg-card p-5 md:p-10">
        <form
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div
            className={cn(
              'h-fit rounded border border-transparent p-5',
              avatarError && 'border-red-500',
            )}
          >
            <div className="mb-4 flex justify-center">
              <img
                src={avatarUrlPreview ?? userAvatarDefault}
                className="aspect-square w-4/5 rounded-full object-cover md:w-3/5"
                alt="avatar"
              />
            </div>
            <div className="flex justify-center">
              <div className="btn btn-primary rounded-lg">
                <label
                  className={cn(
                    'flex h-10 cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90',
                  )}
                  htmlFor="chooseAvatar"
                >
                  Choose file
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="chooseAvatar"
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
            {avatarError && (
              <p className="!mt-5 text-center text-xs italic text-red-500">
                {avatarError.message?.toString() ?? ''}
              </p>
            )}
          </div>

          <div className="space-y-5">
            <Input
              label="Họ và tên lót"
              name="last_name"
              control={control}
              error={lastNameError}
              autoComplete="off"
              isRequired
            />
            <Input
              label="Tên"
              name="first_name"
              control={control}
              error={firstNameError}
              autoComplete="off"
              isRequired
            />
            <Input
              type="date"
              label="Ngày sinh"
              name="dob"
              control={control}
              error={dobError}
              autoComplete="off"
              isRequired
            />
            <Input
              label="Email"
              name="email"
              control={control}
              error={emailError}
              autoComplete="off"
              disabled
            />
            <div className="flex justify-center">
              <Button className="ms-auto">Lưu thay đổi</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile

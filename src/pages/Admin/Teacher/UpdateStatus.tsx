import { Button, Input, Modal, Toast } from '@/components/ui'
import { TeacherStatus } from '@/config/define'
import { useLoading } from '@/contexts/loading'
import teacherService from '@/services/admin/teacherService'
import useHandleError from '@/hooks/useHandleError'
import { useState } from 'react'
import { UpdateTeacherStatusPayloads } from '@/types/admin'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'

const defaultValues: UpdateTeacherStatusPayloads = {
  reason: '',
}

function UpdateStatus(props: any) {
  const { teacher, currentPage, fetchTeachers } = props
  const { showLoading, hideLoading } = useLoading()
  const { handleResponseError } = useHandleError()
  const [isShowConfirmBanTeacherModal, setIsShowConfirmBanTeacherModal] = useState(false)
  const [isShowConfirmUnBanTeacherModal, setIsShowConfirmUnBanTeacherModal] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })
  const { reason: reasonError } = errors

  const banTeacher: SubmitHandler<UpdateTeacherStatusPayloads> = fields => {
    showLoading()
    teacherService
      .ban(teacher.id, fields)
      .then(() => {
        Toast.success('Cấm giáo viên thành công')
        fetchTeachers({ page: currentPage })
        setIsShowConfirmBanTeacherModal(false)
        reset(defaultValues)
      })
      .catch((err: any) => {
        setErrorForInput(err, setError)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const unBanTeacher: SubmitHandler<UpdateTeacherStatusPayloads> = fields => {
    showLoading()
    teacherService
      .unBan(teacher.id, fields)
      .then(() => {
        Toast.success('Ân xá giáo viên thành công')
        fetchTeachers({ page: currentPage })
        setIsShowConfirmUnBanTeacherModal(false)
        reset(defaultValues)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  switch (teacher.status) {
    case TeacherStatus.Active:
      return (
        <>
          <Button
            className="bg-red-600 hover:bg-red-500"
            onClick={() => setIsShowConfirmBanTeacherModal(true)}
          >
            <i className="fa-solid fa-ban"></i>
          </Button>
          <Modal
            show={isShowConfirmBanTeacherModal}
            close={() => {
              setIsShowConfirmBanTeacherModal(false)
            }}
          >
            <form className="space-y-6" onSubmit={handleSubmit(banTeacher)}>
              <div className="mb-8">
                <h1 className="text-3xl font-medium text-center">
                  Bạn có chắc muốn cấm giáo viên này?
                </h1>
                <p className="!mt-0 text-center text-sm font-light">
                  Nếu bạn muốn cấm giáo viên này. Vui lòng ghi lý do ở dưới
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  placeholder="Lý do"
                  label="Lý do"
                  name="reason"
                  control={control}
                  error={reasonError}
                  autoComplete="off"
                />
                <Button>Xác nhận</Button>
              </div>
            </form>
          </Modal>
        </>
      )
    case TeacherStatus.AdminBlock:
      return (
        <>
          <Button
            onClick={() => {
              setIsShowConfirmUnBanTeacherModal(true)
            }}
          >
            <i className="fa-solid fa-unlock"></i>
          </Button>
          <Modal
            show={isShowConfirmUnBanTeacherModal}
            close={() => {
              setIsShowConfirmUnBanTeacherModal(false)
            }}
          >
            <form className="space-y-6" onSubmit={handleSubmit(unBanTeacher)}>
              <div className="mb-8">
                <h1 className="text-3xl font-medium text-center">
                  Bạn có chắc muốn ân xá giáo viên này?
                </h1>
                <p className="!mt-0 text-center text-sm font-light">
                  Nếu bạn muốn ân xá giáo viên này. Vui lòng ghi lý do ở dưới
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  placeholder="Lý do"
                  label="Lý do"
                  name="reason"
                  control={control}
                  error={reasonError}
                  autoComplete="off"
                />
                <Button>Xác nhận</Button>
              </div>
            </form>
          </Modal>
        </>
      )
  }
}

export default UpdateStatus

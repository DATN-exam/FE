import { Button, Input, Modal, Toast } from '@/components/ui'
import { UserStatus } from '@/config/define'
import { useLoading } from '@/contexts/loading'
import teacherService from '@/services/admin/teacherService'
import useHandleError from '@/hooks/useHandleError'
import { useState } from 'react'
import { TeacherUpdateStatusProps, TeacherUpdateStatusPayloads } from '@/types/admin'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setErrorForInput } from '@/utils/handleErrors'

const defaultValues: TeacherUpdateStatusPayloads = {
  reason: '',
}

const TeacherAction = (props: any) => {
  const {
    buttonClassName,
    buttonText,
    modalTitle,
    modalDescription,
    showModal,
    setShowModal,
    onSubmit,
    reset,
    defaultValues,
    control,
    reasonError,
  } = props

  return (
    <>
      <Button className={buttonClassName} onClick={() => setShowModal(true)}>
        {buttonText}
      </Button>
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false)
        }}
        afterLeave={() => {
          reset(defaultValues)
        }}
      >
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="mb-8">
            <h1 className="text-center text-3xl font-medium text-foreground">{modalTitle}</h1>
            <p className="!mt-0 text-center text-sm font-light text-foreground">
              {modalDescription}
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

function UpdateStatus(props: TeacherUpdateStatusProps) {
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

  const banTeacher: SubmitHandler<TeacherUpdateStatusPayloads> = fields => {
    showLoading()
    if (!teacher.id) return
    teacherService
      .ban(teacher.id, fields)
      .then(() => {
        Toast.success('Cấm giáo viên thành công')
        fetchTeachers({ page: currentPage })
        setIsShowConfirmBanTeacherModal(false)
        reset(defaultValues)
      })
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

  const unBanTeacher: SubmitHandler<TeacherUpdateStatusPayloads> = fields => {
    showLoading()
    if (!teacher.id) return
    teacherService
      .unBan(teacher.id, fields)
      .then(() => {
        Toast.success('Ân xá giáo viên thành công')
        fetchTeachers({ page: currentPage })
        setIsShowConfirmUnBanTeacherModal(false)
        reset(defaultValues)
      })
      .catch(err => {
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

  switch (teacher.status) {
    case UserStatus.Active:
      return (
        <TeacherAction
          buttonClassName="bg-red-600 hover:bg-red-600/90 focus-visible:ring-red-600"
          buttonText={<i className="fa-solid fa-ban"></i>}
          modalTitle="Bạn có chắc muốn cấm giáo viên này?"
          modalDescription="Nếu bạn muốn cấm giáo viên này. Vui lòng ghi lý do ở dưới"
          showModal={isShowConfirmBanTeacherModal}
          setShowModal={setIsShowConfirmBanTeacherModal}
          onSubmit={handleSubmit(banTeacher)}
          reset={reset}
          defaultValues={defaultValues}
          control={control}
          reasonError={reasonError}
        />
      )
    case UserStatus.AdminBlock:
      return (
        <TeacherAction
          buttonText={<i className="fa-solid fa-unlock"></i>}
          modalTitle="Bạn có chắc muốn ân xá giáo viên này?"
          modalDescription="Nếu bạn muốn ân xá giáo viên này. Vui lòng ghi lý do ở dưới"
          showModal={isShowConfirmUnBanTeacherModal}
          setShowModal={setIsShowConfirmUnBanTeacherModal}
          onSubmit={handleSubmit(unBanTeacher)}
          reset={reset}
          defaultValues={defaultValues}
          control={control}
          reasonError={reasonError}
        />
      )
  }
}

export default UpdateStatus

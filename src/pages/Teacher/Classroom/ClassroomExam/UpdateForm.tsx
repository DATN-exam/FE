import { Button, Input, Select, Toast } from '@/components/ui'
import useHandleError from '@/hooks/useHandleError'
import { useForm } from 'react-hook-form'
import { DatePicker, Radio, TimePicker } from 'antd'
import setQuestionService from '@/services/teacher/setQuestionService'
import { useEffect, useState } from 'react'
import { convertDate, convertTime } from '@/utils/helper'
import { DATE_FORMAT } from '@/config/define'
import { useParams } from 'react-router-dom'
import examService from '@/services/teacher/examService'
import { setErrorForInput } from '@/utils/handleErrors'
import moment from 'moment'

const { RangePicker } = DatePicker
const UpdateForm = (props: any) => {
  const { showLoading, hideLoading, exam, debouncedFetchExams, setOpenFormUpdate } = props
  const defaultValue = { ...exam, title: exam.set_question_id }
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: defaultValue,
  })
  const { id } = useParams()
  const [setQuestions, setSetQuestions] = useState([])
  const [maxQuestion, setMaxQuestion] = useState({ easy: 1, medium: 1, hard: 1 })
  const { handleResponseError } = useHandleError()
  const [showResult, setShowResult] = useState(false)

  const fetchSetQuestionReady = () => {
    showLoading()
    setQuestionService
      .getListReady()
      .then(data => {
        console.log(exam)
        setValue('title', exam.set_question_id)
        setSetQuestions(data)
      })
      .catch(err => {
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }
  useEffect(() => {
    const itemSelect: any = setQuestions.find((item: any) => {
      return item.id == getValues('title')
    })
    console.log(getValues('title'))
    setMaxQuestion({
      easy: itemSelect?.question_easy_count ?? 1,
      medium: itemSelect?.question_medium_count ?? 1,
      hard: itemSelect?.question_hard_count ?? 1,
    })
  }, [watch('title')])
  useEffect(() => {
    fetchSetQuestionReady()
  }, [])
  const { name: nameError, note: noteError } = errors

  const createExam = (data: any) => {
    const payload = {
      ...data,
      set_question_id: data.title,
      is_show_result: showResult,
    }
    showLoading()
    examService
      .update(id, payload, exam.id)
      .then(() => {
        Toast.success('Cập nhật cuộc thi thành công')
        debouncedFetchExams()
        setOpenFormUpdate(false)
      })
      .catch((err: any) => {
        if (err.response.status == 422) {
          setErrorForInput(err, setError)
          clearErrors()
        }
        handleResponseError(err)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleChange = (e: any) => {
    const [start, end] = e
    setValue('start_date', convertDate(start, DATE_FORMAT.DATE_TIME_DASH))
    setValue('end_date', convertDate(end, DATE_FORMAT.DATE_TIME_DASH))
  }

  const hanldeChangeTime = (e: any) => {
    setValue('working_time', convertTime(e))
  }
  const disabledDate = (current: any) => {
    return current && current < moment().startOf('day')
  }
  return (
    <form onSubmit={handleSubmit(createExam)}>
      <div className="mt-4">
        <label className="text-black">Tên cuộc thi</label>
        <Input
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
          placeholder="Tên cuộc thi"
          type="text"
          name="name"
          control={control}
          error={nameError}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Lưu ý</label>
        <Input
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1 mt-1"
          placeholder="Lưu ý"
          type="text"
          name="note"
          control={control}
          error={noteError}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Thời gian làm bài</label>
        <RangePicker
          showTime
          className="w-full mt-1 bg-white"
          onChange={handleChange}
          disabledDate={disabledDate}
        />
      </div>
      <div className="mt-4">
        <label className="text-black mr-3">Thời gian làm bài:</label>
        <TimePicker className="mt-1 bg-white" type="time" onChange={hanldeChangeTime} />

        <Radio.Group value={showResult ? 'a' : 'b'} buttonStyle="solid" className="mt-1 block">
          <Radio.Button value="b" onClick={() => setShowResult(false)}>
            Hiển thị khi cuộc thi kết thúc
          </Radio.Button>
          <Radio.Button value="a" onClick={() => setShowResult(true)}>
            Hiển thị kết quả sau khi nộp bài
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className="mt-4">
        <label className="text-black">Bộ câu hỏi</label>
        <Select className="mt-1" name="title" options={setQuestions} control={control} />
      </div>
      <div className="mt-4">
        <label className="text-black">Chọn số lượng câu hỏi dễ (Tối đa: {maxQuestion.easy})</label>
        <Input
          type="number"
          className="mt-1"
          min={0}
          max={maxQuestion.easy}
          name="number_question_easy"
          control={control}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">
          Chọn số lượng câu hỏi trung bình (Tối đa: {maxQuestion.medium})
        </label>
        <Input
          type="number"
          className="mt-1"
          min={0}
          max={maxQuestion.medium}
          name="number_question_medium"
          control={control}
        />
      </div>
      <div className="mt-4">
        <label className="text-black">Chọn số lượng câu hỏi khó (Tối đa: {maxQuestion.hard})</label>
        <Input
          type="number"
          className="mt-1"
          min={0}
          max={maxQuestion.hard}
          name="number_question_hard"
          control={control}
        />
      </div>
      <div className="mt-4">
        <Button type="submit">Cập nhật</Button>
      </div>
    </form>
  )
}

export default UpdateForm

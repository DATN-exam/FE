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
const CreateForm = (props: any) => {
  const defaultValue = {
    name: '',
    title: '',
    number_question_hard: 1,
    number_question_medium: 1,
    number_question_easy: 1,
    start_date: '',
    end_date: '',
    working_time: '',
    note: '',
    is_show_result: false,
  }
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
  const { showLoading, hideLoading, debouncedFetchExams, setOpenFormAdd } = props
  const [setQuestions, setSetQuestions] = useState([])
  const [maxQuestion, setMaxQuestion] = useState({ easy: 1, medium: 1, hard: 1 })
  const { handleResponseError } = useHandleError()
  const [showResult, setShowResult] = useState(false)

  const fetchSetQuestionReady = () => {
    showLoading()
    setQuestionService
      .getListReady()
      .then(data => {
        setValue('title', data[0].id ?? [])
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
      .create(id, payload)
      .then(() => {
        Toast.success('Tạo cuộc thi thành công')
        setOpenFormAdd(false)
        debouncedFetchExams()
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
          className="mt-1 w-full rounded-md border-gray-300 bg-white px-2 py-1 text-black"
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
          className="mt-1 w-full rounded-md border-gray-300 bg-white px-2 py-1 text-black"
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
          className="mt-1 w-full bg-white"
          onChange={handleChange}
          disabledDate={disabledDate}
        />
      </div>
      <div className="mt-4">
        <label className="mr-3 text-black">Thời gian làm bài:</label>
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
        <Button type="submit">Tạo mới</Button>
      </div>
    </form>
  )
}

export default CreateForm

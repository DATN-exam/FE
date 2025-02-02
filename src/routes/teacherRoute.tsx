import { ROUTES_TEACHER } from '@/config/routes'
import { MainLayout } from '@/components/Layouts/Teacher'
import {
  Dashboard,
  Classroom,
  ClassroomUpdate,
  ClassroomStudent,
  ClassroomKey,
  ClassroomExam,
} from '@/pages/Teacher'
import { SetQuestion } from '@/pages/Teacher/SetQuestion'
import { SetQuestionUpdate } from '@/pages/Teacher/SetQuestion/SetQuestionUpdate'
import { Questions } from '@/pages/Teacher/SetQuestion/Question'
import { ShowResult } from '@/pages/Teacher/Classroom'

const teacherRoute = [
  {
    path: ROUTES_TEACHER.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES_TEACHER.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES_TEACHER.CLASSROOM.INDEX,
        element: <Classroom />,
      },
      {
        path: ROUTES_TEACHER.CLASSROOM.UPDATE,
        element: <ClassroomUpdate />,
      },
      {
        path: ROUTES_TEACHER.CLASSROOM.STUDENTS,
        element: <ClassroomStudent />,
      },
      {
        path: ROUTES_TEACHER.CLASSROOM.KEYS,
        element: <ClassroomKey />,
      },
      {
        path: ROUTES_TEACHER.CLASSROOM.EXAMS,
        element: <ClassroomExam />,
      },
      {
        path: ROUTES_TEACHER.SET_QUESTION.INDEX,
        element: <SetQuestion />,
      },
      {
        path: ROUTES_TEACHER.SET_QUESTION.UPDATE,
        element: <SetQuestionUpdate />,
      },
      {
        path: ROUTES_TEACHER.SET_QUESTION.QUESTIONS,
        element: <Questions />,
      },
      {
        path: ROUTES_TEACHER.CLASSROOM.SHOW_RESULT,
        element: <ShowResult />,
      },
    ],
  },
]

export default teacherRoute

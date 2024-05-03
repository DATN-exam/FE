import { ROUTES_TEACHER } from '@/config/routes'
import { MainLayout } from '@/components/Layouts/Teacher'
import {
  Dashboard,
  Classroom,
  ClassroomUpdate,
  ClassroomStudent,
  ClassroomKey,
} from '@/pages/Teacher'

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
    ],
  },
]

export default teacherRoute

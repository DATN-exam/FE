import { ROUTES_TEACHER } from '@/config/routes'
import { cx } from 'class-variance-authority'
import { Link, useParams } from 'react-router-dom'

function Header() {
  const { id } = useParams()
  const currentPath = location.pathname
  const classNameActive =
    'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
  const classNameInActive =
    'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
  return (
    <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li className="me-2">
        <Link
          to={ROUTES_TEACHER.CLASSROOM.UPDATE.replace(':id', id ?? '')}
          className={cx(
            currentPath == ROUTES_TEACHER.CLASSROOM.UPDATE.replace(':id', id ?? '')
              ? classNameActive
              : classNameInActive,
          )}
        >
          Chỉnh sửa thông tin
        </Link>
      </li>
      <li className="me-2">
        <Link
          to={ROUTES_TEACHER.CLASSROOM.STUDENTS.replace(':id', id ?? '')}
          className={cx(
            currentPath == ROUTES_TEACHER.CLASSROOM.STUDENTS.replace(':id', id ?? '')
              ? classNameActive
              : classNameInActive,
          )}
        >
          Danh sách học sinh
        </Link>
      </li>
      <li className="me-2">
        <Link
          to={ROUTES_TEACHER.CLASSROOM.KEYS.replace(':id', id ?? '')}
          className={cx(
            currentPath == ROUTES_TEACHER.CLASSROOM.KEYS.replace(':id', id ?? '')
              ? classNameActive
              : classNameInActive,
          )}
        >
          Danh sách mã
        </Link>
      </li>
      <li className="me-2">
        <Link
          to={ROUTES_TEACHER.CLASSROOM.EXAMS.replace(':id', id ?? '')}
          className={cx(
            currentPath == ROUTES_TEACHER.CLASSROOM.EXAMS.replace(':id', id ?? '')
              ? classNameActive
              : classNameInActive,
          )}
        >
          Cuộc thi
        </Link>
      </li>
    </ul>
  )
}

export default Header

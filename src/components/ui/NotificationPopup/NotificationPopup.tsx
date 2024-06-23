import { ROUTES_SITE } from '@/config/routes'
import { Link } from 'react-router-dom'

function NotificationPopup(props: any) {
  const { message } = props

  return (
    <div className="mt-3 flex select-none justify-between">
      <h3 className="select-none items-center text-xl">{message}</h3>
      <Link to={ROUTES_SITE.ACTIVITY} className="text-blue-500">
        Xem tất cả thông báo
      </Link>
    </div>
  )
}

export default NotificationPopup

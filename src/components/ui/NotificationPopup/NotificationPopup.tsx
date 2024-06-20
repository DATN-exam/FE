import { ROUTES_SITE } from '@/config/routes'
import { Link } from 'react-router-dom'

function NotificationPopup(props: any) {
  const { message } = props

  return (
    <div className="flex justify-between mt-3">
      <h3 className="text-xl items-center">{message}</h3>
      <Link to={ROUTES_SITE.ACTIVITY} className="text-blue-500">
        Xem tất cả thông báo
      </Link>
    </div>
  )
}

export default NotificationPopup

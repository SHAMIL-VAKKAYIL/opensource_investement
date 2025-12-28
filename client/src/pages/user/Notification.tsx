import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchNotificationsByUser,
  markNotificationViewed
} from '../../features/notification/notificationSlice'
import type { AppDispatch, RootState } from '../../store/store'

function Notification() {
  const dispatch = useDispatch<AppDispatch>()
  const authUser = useSelector((state: RootState) => state.auth.user)
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications
  )

  useEffect(() => {
    if (authUser?._id) {
      dispatch(fetchNotificationsByUser(authUser._id))
    }
  }, [authUser?._id, dispatch])

  const handleClick = (id: string, seen: boolean) => {
    if (seen) return
    dispatch(markNotificationViewed(id))
  }

  if (!notifications.length) {
    return (
      <div className="p-6 text-gray-500 text-sm">
        No notifications
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        Notifications
      </h2>

      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n._id}
            onClick={() => handleClick(n._id, n.seen)}
            className={`
              flex gap-3 p-4 rounded-lg border cursor-pointer
              transition
              ${n.seen
                ? 'bg-white border-gray-200 text-gray-600'
                : 'bg-blue-50 border-blue-400 text-black hover:bg-blue-100'}
            `}
          >
            {!n.seen && (
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
            )}

            <div className="flex-1">
              <p className="text-sm">
                {n.message}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {n.type}
              </p>

              <div className="mt-1 text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>

            {!n.seen && (
              <span className="text-xs font-medium text-blue-600">
                NEW
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notification

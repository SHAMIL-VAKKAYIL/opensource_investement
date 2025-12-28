import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import {
  getInvestments,
  updateInvestmentStatus,
} from '../../features/investment/InvestmentSlice'
import { fetchUsers } from '../../features/user/userSlice'

const STATUS_OPTIONS = ['pending', 'active', 'completed', 'cancelled'] as const

function AdminHome() {
  const dispatch = useDispatch<AppDispatch>()

  const investments = useSelector(
    (state: RootState) => state.investment.investments
  )

  const users = useSelector(
    (state: RootState) => state.user.users
  )

  useEffect(() => {
    dispatch(getInvestments())
    dispatch(fetchUsers())
  }, [dispatch])

  const handleStatusChange = (id: string, status: string) => {
    dispatch(updateInvestmentStatus({ id, status: { status } }))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto text-black space-y-12">
      {/* ================= USERS TABLE ================= */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Users</h2>

        <div className="overflow-x-auto border">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-center">Created</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3 font-mono text-xs">
                    {user._id}
                  </td>
                  <td className="p-3 text-center text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {!users.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= INVESTMENTS TABLE ================= */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Investments</h2>

        <div className="overflow-x-auto border">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-right">Return</th>
                <th className="p-3 text-center">Duration</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {investments.map((inv: any) => (
                <tr
                  key={inv.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-mono text-xs">
                    {inv.userId}
                  </td>

                  <td className="p-3 capitalize">
                    {inv.planType.replace('-', ' ')}
                  </td>

                  <td className="p-3 text-right">₹{inv.amount}</td>

                  <td className="p-3 text-right">
                    ₹{inv.expectedReturn}
                  </td>

                  <td className="p-3 text-center">
                    {inv.durationDays} days
                  </td>

                  <td className="p-3 text-center">
                    <StatusBadge status={inv.status} />
                  </td>

                  <td className="p-3 text-center">
                    <select
                      value={inv.status}
                      onChange={(e) =>
                        handleStatusChange(inv.id, e.target.value)
                      }
                      className="border px-2 py-1 text-sm"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              {!investments.length && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-500"
                  >
                    No investments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default AdminHome

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'border-gray-400 text-gray-600',
    active: 'border-black text-black',
    completed: 'border-green-600 text-green-600',
    cancelled: 'border-red-600 text-red-600',
  }

  return (
    <span
      className={`px-2 py-0.5 border text-xs rounded ${
        styles[status] || 'border-gray-300'
      }`}
    >
      {status}
    </span>
  )
}

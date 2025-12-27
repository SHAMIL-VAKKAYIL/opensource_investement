import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWallet } from '../../features/wallet/walletSlice'
import type { RootState, AppDispatch } from '../../store/store'
import { createDepositIntent } from '../../features/payment/paymentSlice'
import { useNavigate } from 'react-router-dom'

function Wallet() {
  const dispatch = useDispatch<AppDispatch>()

  const { wallet, loading, error } = useSelector(
    (state: RootState) => state.wallet
  )

  useEffect(() => {
    dispatch(getWallet())
  }, [dispatch])

  const navigate = useNavigate()
  const handleDeposit = async () => {
    const amount = 20000 // hardcoded for now

    await dispatch(createDepositIntent(amount)).unwrap()
    navigate('/payment')
    // setClientSecret(res.clientSecret)
  }

  if (loading) return <div className="text-white">Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-wide">
          Wallet
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your balance and transactions
        </p>
      </div>

      {/* Balance Card */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white text-black rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Available Balance
            </p>
            <h2 className="text-3xl font-bold mt-2">
              ₹{wallet?.balance ?? 0}
            </h2>
          </div>

          <div className="flex gap-3">
            <button onClick={handleDeposit} className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">
              Deposit
            </button>
            <button className="px-4 py-2 rounded-lg border border-black text-black text-sm hover:bg-gray-100 transition">
              Withdraw
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Wallet
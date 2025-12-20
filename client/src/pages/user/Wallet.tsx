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
  console.log(wallet);

  useEffect(() => {
    dispatch(getWallet())
  }, [dispatch])

  const navigate = useNavigate()
  const handleDeposit = async () => {
    const amount = 500 // hardcoded for now

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

      {/* Transactions */}
      {/* <div className="max-w-4xl mx-auto mt-10">
        <h3 className="text-lg font-semibold mb-4">
          Transactions
        </h3>

        {wallet?.transactions?.length === 0 ? (
          <div className="border border-gray-800 rounded-lg p-6 text-center text-gray-400">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-3">
            {wallet.transactions.map((tx: any) => (
              <div
                key={tx.id}
                className="flex justify-between items-center border border-gray-800 rounded-lg p-4"
              >
                <div>
                  <p className="text-sm font-medium">
                    {tx.type}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>

                <p
                  className={`text-sm font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                >
                  {tx.amount > 0 ? '+' : '-'}₹{Math.abs(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  )
}

export default Wallet
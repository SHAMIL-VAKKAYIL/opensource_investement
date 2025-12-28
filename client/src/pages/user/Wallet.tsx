import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createWithdrawal, getWallet } from '../../features/wallet/walletSlice'
import type { RootState, AppDispatch } from '../../store/store'
import { createDepositIntent } from '../../features/payment/paymentSlice'
import { useNavigate } from 'react-router-dom'
import { createInvestment } from '../../features/investment/InvestmentSlice'
import type { Investment } from '../../types/investment'

function Wallet() {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState<Investment>({
    amount: null,
    planType: '',
    expectedReturn: null,
    durationDays: null,
  })

  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [amount, setAmount] = useState(0)


  const { wallet, loading, error } = useSelector(
    (state: RootState) => state.wallet
  )

  useEffect(() => {
    dispatch(getWallet())
  }, [dispatch])



  const navigate = useNavigate()
  const handleDeposit = async () => {
    const amount = 20000

    await dispatch(createDepositIntent(amount)).unwrap()
    navigate('/payment')
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'planType' ? value : Number(value),
    }))
  }

  const handleInvestment = () => {
    if (!form.amount || !form.planType || !form.durationDays) return
    dispatch(createInvestment(form))
    setOpen(false)
  }


  const handleWithdraw = () => {

    if (!amount || amount <= 0) return alert('Enter valid amount')

    dispatch(createWithdrawal(amount))
    setAmount(0)
    setWithdrawOpen(false)
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
            <button
              onClick={() => setWithdrawOpen(true)}
              className="px-4 py-2 rounded-lg border border-black text-black text-sm hover:bg-gray-100 transition"
            >
              Withdraw
            </button>

            {withdrawOpen && (
              <WithdrawModal
                amount={amount}
                setAmount={setAmount}
                onClose={() => setWithdrawOpen(false)}
                onSubmit={handleWithdraw}
              />
            )}
            <button onClick={() => setWithdrawOpen(true)} className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">
              Investment
            </button>

            {open && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md p-6 border border-black">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Create Investment</h2>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-sm underline"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Amount"
                      name="amount"
                      type="number"
                      value={form.amount}
                      onChange={onChange}
                    />

                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-gray-600">Plan Type</label>
                      <select
                        name="planType"
                        value={form.planType}
                        onChange={onChange}
                        className="border border-black px-3 py-2 text-sm"
                      >
                        <option value="">Select plan</option>
                        <option value="short-term">short-term</option>
                        <option value="long-term">long-term</option>
                      </select>
                    </div>

                    <Input
                      label="Expected Return "
                      name="expectedReturn"
                      type="number"
                      value={form.expectedReturn}
                      onChange={onChange}
                    />

                    <Input
                      label="Duration (Days)"
                      name="durationDays"
                      type="number"
                      value={form.durationDays}
                      onChange={onChange}
                    />
                  </div>

                  <button
                    onClick={handleInvestment}
                    className="mt-6 w-full py-3 border border-black hover:bg-black hover:text-white transition"
                  >
                    Confirm Investment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Wallet

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="border border-black px-3 py-2 text-sm focus:outline-none"
      />
    </div>
  )
}

function WithdrawModal({
  amount,
  setAmount,
  onClose,
  onSubmit,
}: {
  amount: number
  setAmount: (v: number) => void
  onClose: () => void
  onSubmit: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm bg-white text-black rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Withdraw Amount</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-black px-3 py-2 mb-4 focus:outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-black hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}

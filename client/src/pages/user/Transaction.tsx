import React, { useEffect } from 'react'
import { getTransactions } from '../../features/wallet/walletSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'

function Transaction() {
  const dispatch = useDispatch<AppDispatch>()
  const { transactions } = useSelector((state: RootState) => state.wallet)

  useEffect(() => {
    dispatch(getTransactions())
  }, [dispatch])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Transactions
      </h1>

      {transactions.length === 0 ? (
        <div className="text-gray-500 text-center py-12">
          No transactions found
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {transactions.map((tx) => {
              const isCredit = tx.type === 'credit'

              return (
                <li
                  key={tx.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {tx.type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      isCredit ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isCredit ? '+' : '-'}₹{tx.amount}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Transaction

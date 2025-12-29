import React from 'react'

function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 text-black">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Overview of your account activity
        </p>
      </header>

      {/* Quick stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard title="Wallet Balance" value="₹24,500" />
        <StatCard title="Active Investments" value="3" />
        <StatCard title="Total Transactions" value="128" />
      </section>

      {/* Recent activity */}
      <section className="mb-10">
        <SectionHeader title="Recent Activity" />

        <div className="border rounded-lg divide-y">
          {[
            { label: 'Investment Created', meta: '₹5,000 • Today' },
            { label: 'Withdrawal Requested', meta: '₹1,000 • Yesterday' },
            { label: 'Return Credited', meta: '₹750 • 2 days ago' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-sm">
                {item.label}
              </span>
              <span className="text-xs text-gray-500">
                {item.meta}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <SectionHeader title="Quick Actions" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ActionCard title="Add Money" />
          <ActionCard title="Withdraw" />
          <ActionCard title="View Transactions" />
        </div>
      </section>
    </div>
  )
}

export default Home
function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-sm font-semibold mb-3">
      {title}
    </h2>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-xs text-gray-500 mb-1">
        {title}
      </p>
      <p className="text-lg font-semibold">
        {value}
      </p>
    </div>
  )
}

function ActionCard({ title }: { title: string }) {
  return (
    <button
      className="
        border rounded-lg p-4 text-sm text-left
        hover:bg-gray-50 transition
      "
    >
      {title}
    </button>
  )
}

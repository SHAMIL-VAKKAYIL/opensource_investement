import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { fetchUser, updateUser } from '../../features/user/userSlice'
import type { UserProfile } from '../../types/user'

function Profile() {
  const dispatch = useDispatch<AppDispatch>()
  const [editMode, setEditMode] = useState(false)

  const authUser = useSelector((state: RootState) => state.auth.user)
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser)

  useEffect(() => {
    if (!authUser?._id) return
    dispatch(fetchUser(authUser._id))
  }, [authUser?._id])

  if (!selectedUser) {
    return <div className="p-6 text-black">Loading profile...</div>
  }

  return (
 <div className="min-h-screen bg-white text-black">
  <div className="max-w-3xl mx-auto px-6 py-10">
    <div className="flex items-center justify-between border-b border-black pb-4">
      <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>

      <button
        onClick={() => setEditMode(!editMode)}
        className="px-4 py-2 text-sm border border-black  bg-black text-white rounded-md transition"
      >
        {editMode ? 'Cancel' : 'Edit'}
      </button>
    </div>

    {!editMode ? (
      <ProfileView user={selectedUser} />
    ) : (
      <ProfileEdit user={selectedUser} />
    )}
  </div>
</div>

  )
}

export default Profile



function ProfileView({ user }: { user: any }) {
  return (
    <div className="mt-8 space-y-8 " >
      <Section title="Personal Information">
        <Field label="Name" value={user.name} />
        <Field label="Phone" value={user.phone} />
        <Field label="Address" value={user.address} />
      </Section>

      <Section title="Bank Details">
        <Field label="Account Holder" value={user.bankDetails?.accountHolder} />
        <Field label="Account Number" value={user.bankDetails?.accountNumber} />
        <Field label="IFSC" value={user.bankDetails?.ifsc} />
      </Section>
    </div>
  )
}





function ProfileEdit({ user }: { user: UserProfile }) {
  const dispatch = useDispatch()

  console.log(user.userId);

  const [form, setForm] = useState({
    name: user.name ?? '',
    phone: user.phone ?? '',
    address: user.address ?? '',
    accountHolder: user.bankDetails?.accountHolder ?? '',
    accountNumber: user.bankDetails?.accountNumber ?? '',
    ifsc: user.bankDetails?.ifsc ?? '',
  })

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <form className="mt-8 space-y-10">
      <Section title="Personal Information">
        <Input label="Name" name="name" value={form.name} onChange={onChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={onChange} />
        <Input label="Address" name="address" value={form.address} onChange={onChange} />
      </Section>

      <Section title="Bank Details">
        <Input label="Account Holder" name="accountHolder" value={form.accountHolder} onChange={onChange} />
        <Input label="Account Number" name="accountNumber" value={form.accountNumber} onChange={onChange} />
        <Input label="IFSC" name="ifsc" value={form.ifsc} onChange={onChange} />
      </Section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => dispatch(updateUser({ id: user.userId, data: form }))}
          className="px-8 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

function Input({ label, ...props }: any) {
  return (
      <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        {...props}
        className="border border-black px-3 py-2 text-sm focus:outline-none focus:ring-0"
      />
    </div>
  )
}


function Field({ label, value }: { label: string; value?: any }) {
  return (
    <div className="grid grid-cols-3 items-center  pb-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="col-span-2 font-medium">
        {value ?? 'Not provided'}
      </span>
    </div>
  )
} 

function Section({ title, children }: any) {
  return (
    <div className="border border-black p-6 rounded-2xl">
      <h2 className="text-lg font-medium mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}


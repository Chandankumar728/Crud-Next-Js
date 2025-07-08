'use client';
import type { SerializedUser } from '@/app/query/user-query'

import { useActionState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';


interface UserFormProps {
  action: (prevstate:any,formData: FormData) => Promise<any>
  user?: SerializedUser | null
}

export default function UserForm({ action, user = null }: UserFormProps) {
   const router = useRouter();
    const [state, formAction, isPending] = useActionState(action, null)
    useEffect(() => {
        console.log("dsadasd",state)
    if (state?.message) {
      if (state.success) {
        router.push('/read')
        toast.success(state.message)
      } else {
        toast.error(state.message)
      }
    }
  }, [state])
  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user?.name || ''}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user?.email || ''}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {user ? 'Update User' : 'Create User'}
      </button>
    </form>
  )
}
'use client';
import { useActionState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';
interface UserFormProps {
  action: (prevState:any,formData: FormData) => Promise<any>;
}

export default function UserForm({ action }: UserFormProps) {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(action, null)
    useEffect(() => {
        console.log(state)
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
    <form
      action={formAction}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md w-full"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">👤 Create New User</h2>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="John Doe"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        ➕ {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}






// app/users/[id]/page.tsx - Dynamic route for single user
import { getUserById } from '@/app/query/user-query'
import { updateUser } from '@/app/actions/user-actions'
import UserForm from '../UserForm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
 params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Edit User',
  description: 'Edit user details in the dashboard'
}



export default async function page({ params }: Props) {
  const { id } = await params
  const user = await getUserById(id)
  
  // if (!user) {
  //   notFound()
  // }
  
  const updateUserWithId =  updateUser.bind(null, id)
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <UserForm action={updateUserWithId} user={user} />
    </div>
  )
}
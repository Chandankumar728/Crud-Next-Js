// app/users/[id]/page.tsx - Dynamic route for single user
import { createUser } from '@/app/actions/user-actions'
import UserForm from './UserForm'




export default async function Create() {
 
  
  const createUserForm = createUser.bind(null)
  
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      
      <UserForm action={createUserForm}  />
    </div>
  )
}
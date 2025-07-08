import { getAllUsers } from "../../query/user-query";
import { deleteUser } from "../../actions/user-actions";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import Toast from "@/components/toast";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* ✅ Page Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              👥 User Management
            </h1>
            <p className="text-gray-600">
              Manage and update user information with ease.
            </p>
          </div>

          {/* ✅ Create User Button */}
          <Link
            href="/create"
            className="inline-block px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition"
          >
            ➕ Create User
          </Link>
        </header>

        {/* ✅ User List Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            All Users{" "}
            <span className="text-sm text-gray-500">({users.length})</span>
          </h2>

          <div className="grid gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                {/* User Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-4 md:mt-0">
                  <Link
                    href={`/update/${user._id}`}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    ✏️ Edit
                  </Link>

                  <DeleteButton action={deleteUser.bind(null, user._id)} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

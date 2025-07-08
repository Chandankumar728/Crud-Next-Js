"use client";
import { useActionState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
}
export default function DeleteButton({ action }: UserFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  useEffect(() => {
    console.log("dsadasdasdasd",state);
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);
  return (
    <form action={formAction}>
      <button
        type="submit"
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        onClick={(e) => {
          if (!confirm("Are you sure you want to delete this user?")) {
            e.preventDefault();
          }
        }}
      >
        {isPending ? "Deleting..." : "🗑️ Delete"}
      </button>
    </form>
  );
}

"use client";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

type Props = {
  message?: string;
};

// Solution 1: Using useRef to track if toast was already shown
export default function Toast({ message }: Props) {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (message && !hasShownToast.current) {
      toast.success(message);
      hasShownToast.current = true;
    }
  }, [message]);

  return null;
}
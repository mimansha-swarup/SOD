"use client";

import { getUser } from "@/lib/features/user/user.slice";
import { fetchUser, fetchUsersCommunity } from "@/lib/features/user/user.thunk";
import { auth } from "@/lib/firebase";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/lib/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!user.data?.uid) {
  ;
        dispatch(fetchUser({ userId: currentUser?.uid ?? "" }));
      }
    });
  }, []);
  return <>{children}</>;
}

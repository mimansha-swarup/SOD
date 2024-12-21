import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const signUpRes = await signInWithPopup(auth, provider);

  return signUpRes;
};

export const googleSignOut = async () => {
  await auth.signOut();
};

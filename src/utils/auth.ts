import { setAuthCookie } from "@/lib/actions/cookie.action";
import { createNewUSer } from "@/lib/actions/users.action";
import { auth } from "@/lib/firebase";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

export const onGoogleSignIn =
  ({
    community,
    onSuccessfulLogin,
  }: {
    community: string;
    onSuccessfulLogin: () => void;
  }) =>
  async () => {

    const token = await googleSignIn();

    onAuthStateChanged(auth, async(user)=>{
      console.log("user", user)

      if (user) {
        const { displayName, photoURL, email, uid } = user;
        await createNewUSer({ displayName, photoURL, email, uid, community });
        await onSuccessfulLogin?.();
      }
    }
    )
  };
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  await setPersistence(auth, browserSessionPersistence);

  // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const result = await signInWithPopup(auth, provider);
  console.log("result", result);
  const token = await result.user.getIdToken();

  setAuthCookie(token);
  return token;
};

export const googleSignOut = async () => {
  await auth.signOut();
};

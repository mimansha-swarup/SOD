import { createNewUSer } from "@/lib/actions/users.action";
import { auth } from "@/lib/firebase";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

export const onGoogleSignIn =
   ({ community, onSuccessfulLogin }) => async() =>{
    const user = auth.currentUser;
    if (user) {
      console.log("New user shall be created");
      const { displayName, photoURL, email, uid } = user;
      await createNewUSer({ displayName, photoURL, email, uid, community });
      onSuccessfulLogin?.();
    }

    return user;

  }
export const googleSignIn =
  async () => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      const provider = new GoogleAuthProvider();
      // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      return signInWithPopup(auth, provider);
    });
  };

export const googleSignOut = async () => {
  await auth.signOut();
};

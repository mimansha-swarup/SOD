"use server";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { User } from "firebase/auth";
import { FIREBASE_COLLECTION } from "@/constants/firebase";
import { ICreateUserProps } from "@/types/actions/users";

const createCommunity = async ({ docId, uid }) => {
  const communityDocRef = doc(db, FIREBASE_COLLECTION.COMMUNITIES, docId);
  await setDoc(communityDocRef, {
    id: "SOD",
    name: "Skills over degree",
    incomeAverage: 0,
    members: [uid],
    characters: [
      {
        id: "1",
        name: "TrailBlazer",
        description: "Freshers looking for internship/first job ",
        photoUrl: "",
        path: "JOB",
      },
      {
        id: "2",
        name: "Climber",
        description:
          "Professional looking to switch into high paying or more fulfilling job",
        photoUrl: "",
        path: "JOB",
      },
      {
        id: "3",
        name: "Balancer",
        description:
          "Individual managing fulltime job while starting a freelancing agency or side hustle",
        photoUrl: "",
        path: "FREELANCE",
      },
      {
        id: "4",
        name: "Builder",
        description: "For fulltime business and agency owners",
        photoUrl: "",
        path: "FREELANCE",
      },
    ],
    paths: {
      JOB: {},
      FREELANCE: {},
    },
  });
};
export const createNewUSer = async ({
  displayName,
  email,
  photoURL,
  uid,
  community = "DEFAULT",
}: ICreateUserProps) => {
  try {
    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, uid);
    if (false) {
      await createCommunity({ docId: community, uid });
    }

    const communityRef = doc(db, FIREBASE_COLLECTION.COMMUNITIES, community);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        name: displayName,
        email: email,
        profilePicture: photoURL,
        uid: uid,
        communities: [{ community, communityRef }],
      });
      createSubCollectionInNewUser({ uid, docId: community });
    }
  } catch (error) {
    console.log("error Jatin", error);
  }
};

export const createSubCollectionInNewUser = async ({ uid, docId }) => {
  const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, uid);
  const subCollectionRef = doc(
    collection(userDocRef, FIREBASE_COLLECTION.COMMUNITIES),
    docId
  );
  // const masterCommunitySnapshot = getDoc(
  //   doc(db, FIREBASE_COLLECTION.COMMUNITIES, docId)
  // );

  setDoc(subCollectionRef, {
    joinedAt: new Date(),
    character: "",
    path: [],
    income: 0,
    desiredIncome: 0,
    manifestation: "I want to be rich",
    currentLevel: "Level 0",
    streak: 1,
    isPaid: true,
    metrics: [
      {
        id: 123,
        name: "Hello",
        type: "boolean",
        unit: "mg",
        description: "",
      },
    ],
    trackingData: {
      "12/11/2004": [{}],
    },
  });
};

export const updateUserCommunity = async ({ uid, community, dataToUpdate }) => {
  const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, uid);
  const userCommunityDocRef = doc(
    collection(userDocRef, FIREBASE_COLLECTION.COMMUNITIES),
    community
  );
  await updateDoc(userCommunityDocRef, dataToUpdate);
};

export const getUserData = async ({ uid }) => {
  try {
    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.id);
    return JSON.stringify(userSnapshot.data());
  } catch (error) {
    console.log("error", error);
  }
};

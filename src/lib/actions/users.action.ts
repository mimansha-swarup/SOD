"use server";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FIREBASE_COLLECTION } from "@/constants/firebase";
import { ICreateUserProps } from "@/types/actions/users";
import { DEFAULT_COMMUNITY } from "@/constants/tracker";
import { IUser } from "@/types/feature/user";
import { getCommunityId } from "@/utils/tracker";
import { getMasterMetrics } from "../features/community/community.slice";

type ActionProps = {
  docId: string;
  uid: string;
};
type UpdateActionProps = {
  uid: string;
  community: string;
  dataToUpdate?: any;
};
type CreateNewUserProps = {
  uid: string;
  communityName?: string;
};

const createCommunity = async ({ docId, uid }: ActionProps) => {
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
  community = getCommunityId(),
}: ICreateUserProps) => {
  try {
    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, uid);

    const communityRef = doc(db, FIREBASE_COLLECTION.COMMUNITIES, community);
    const userSnapshot = await getDoc(userDocRef);
    // if (true) {
    //   createCommunity({ docId: community, uid });
    // }

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        name: displayName,
        email: email,
        profilePicture: photoURL,
        uid: uid,
        communities: [
          { community, communityRef, questionnaireCompleted: false },
        ],
      });
      Promise.all([
        createCommunityInNewUser({ uid, docId: community }),
        createMetricInNewUser({ uid, docId: community }),
        addNewMemberInCommunity({
          userData: userSnapshot.data() as IUser,
          community,
          uid,
        }),
      ]).catch((error) => console.log("promise.all error", error));
    } else {
      addNewMemberInCommunity({
        userData: userSnapshot.data() as IUser,
        community,
        uid,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const addNewMemberInCommunity = async ({
  userData,
  community,
  uid,
}: {
  userData: IUser;
  community: string;
  uid: string;
}) => {
  const communityArray = userData.communities?.map(
    (community) => community.community
  );
  if (!communityArray.includes(community)) {
    const masterCommunityRef = doc(
      db,
      FIREBASE_COLLECTION.COMMUNITIES,
      community
    );
    const masterCommunitySnapshot = await getDoc(masterCommunityRef);
    if (masterCommunitySnapshot.exists()) {
      const masterCommunityData = masterCommunitySnapshot.data();
      const members = [...masterCommunityData.members, uid];
      await setDoc(masterCommunityRef, {
        members,
      });
    }
  }
};

export const createCommunityInNewUser = async ({ uid, docId }: ActionProps) => {
  const userSubCollectionDocRef = doc(
    db,
    FIREBASE_COLLECTION.USERS,
    uid,
    FIREBASE_COLLECTION.COMMUNITIES,
    docId
  );

  setDoc(userSubCollectionDocRef, {
    joinedAt: new Date(),
    character: "",
    path: [],
    income: 0,
    desiredIncome: 0,
    manifestation: "I want to be rich",
    currentLevel: "Level 0",
    streak: 1,
    isPaid: docId !== "DEFAULT" || DEFAULT_COMMUNITY,
  });
};
export const createMetricInNewUser = async ({ uid, docId }: ActionProps) => {
  const usersMetricDocRef = doc(
    db,
    FIREBASE_COLLECTION.USERS,
    uid,
    FIREBASE_COLLECTION.METRICS,
    docId
  );

  setDoc(usersMetricDocRef, {
    metrics: [],
    trackingData: {},
  });
};

export const updateUserCommunity = async ({
  uid,
  community,
  dataToUpdate,
}: UpdateActionProps) => {
  const userCommunityDocRef = doc(
    db,
    FIREBASE_COLLECTION.USERS,
    uid,
    FIREBASE_COLLECTION.COMMUNITIES,
    community
  );

  await updateDoc(userCommunityDocRef, dataToUpdate);
};

export const completeQuestionnaire = async ({
  uid,
  community,
}: UpdateActionProps) => {
  const userRef = doc(db, FIREBASE_COLLECTION.USERS, uid);

  const snapshot = await getDoc(userRef);

  const userData = snapshot.data() as IUser;

  const updatedCommunities = userData.communities?.map((communityObj) =>
    communityObj.community === community
      ? { ...communityObj, questionnaireCompleted: true }
      : communityObj
  );
  updateDoc(userRef, {
    communities: updatedCommunities,
  });
};

export const getUserData = async ({ uid }: CreateNewUserProps) => {
  try {
    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, uid);
    const userSnapshot = await getDoc(userDocRef);
    return JSON.stringify(userSnapshot.data());
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUserCommunityArray = async ({
  uid,
  communityName,
}: CreateNewUserProps) => {
  try {
    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, uid);
    const userSnapshot = await getDoc(userDocRef);
    const communityData = userSnapshot.data() as IUser;
    communityData.communities = communityData?.communities?.map((community) =>
      community.community === communityName
        ? { ...community, questionnaireCompleted: true }
        : community
    );

    updateDoc(userDocRef, {
      communities: communityData.communities,
    });

    return JSON.stringify(userSnapshot.data());
  } catch (error) {
    console.log("error", error);
  }
};

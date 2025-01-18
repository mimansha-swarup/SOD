import { FIREBASE_COLLECTION } from "@/constants/firebase";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { type NextRequest } from "next/server";

type contextType = { params: { userId: string; communityId: string } };

export async function GET(req: NextRequest, { params }: contextType) {
  const { userId, communityId } = params;

  const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, `${userId}`);
  const userCommunityDocRef = doc(
    collection(userDocRef, FIREBASE_COLLECTION.COMMUNITIES),
    communityId
  );
  const userCommunitySnapshot = await getDoc(userCommunityDocRef);

  return Response.json({ data: userCommunitySnapshot.data() }, { status: 200 });
}

export async function POST(req: NextRequest, { params }: contextType) {
  try {
    const { userId, communityId } = params;
    const body = await req.json();

    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, `${userId}`);
    const userCommunityDocRef = doc(
      collection(userDocRef, FIREBASE_COLLECTION.COMMUNITIES),
      communityId
    );
    await updateDoc(userCommunityDocRef, body);
    // const userCommunitySnapshot = await getDoc(userCommunityDocRef);

    return Response.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

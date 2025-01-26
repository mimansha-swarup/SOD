import { collection, getDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FIREBASE_COLLECTION } from "@/constants/firebase";
import { NextRequest } from "next/server";

type contextType = { params: Promise<{ communityId: string }> };
export async function GET(req: NextRequest, { params }: contextType) {
  try {
    const { communityId } = await params;

    const metricDocRef = doc(db, FIREBASE_COLLECTION.METRICS, `${communityId}`);
    const snapshot = await getDoc(metricDocRef);

    return Response.json({ data: snapshot.data() }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

import { FIREBASE_COLLECTION } from "@/constants/firebase";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { type NextRequest } from "next/server";

type contextType = { params: Promise<{ userId: string }> };

export async function GET(req: NextRequest, { params }: contextType) {
  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get("id");
  try {
    const { userId } = await params;

    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, `${userId}`);
    const userSnapshot = await getDoc(userDocRef);

    return Response.json({ data: userSnapshot.data() }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

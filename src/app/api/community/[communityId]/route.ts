import { FIREBASE_COLLECTION } from "@/constants/firebase";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { type NextRequest } from "next/server";

type contextType = { params: { communityId: string } };

export async function GET(req: NextRequest, { params }: contextType) {
  try {
    const { communityId } = params;
    // const searchParams = req.nextUrl.searchParams;
    // const query = searchParams.get("community");
    const communityDocRef = doc(
      db,
      FIREBASE_COLLECTION.COMMUNITIES,
      communityId
    );
    const communitySnapshot = await getDoc(communityDocRef);
    return Response.json({ data: communitySnapshot.data() }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

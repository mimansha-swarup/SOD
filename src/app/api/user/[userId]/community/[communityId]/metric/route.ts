import { FIREBASE_COLLECTION } from "@/constants/firebase";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

type contextType = {
  params: Promise<{ userId: string; communityId: string }>;
};

// Todo: check arrayUnion for upating an array https://firebase.google.com/docs/firestore/manage-data/add-data

// Get  Metric data
export async function GET(req: NextRequest, { params }: contextType) {
  try {
    const { userId, communityId } = await params;
    // const searchParams = req.nextUrl.searchParams;
    // const metricDate = searchParams.get("metricDate");

    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, `${userId}`);
    const userMetricDocRef = doc(
      collection(userDocRef, FIREBASE_COLLECTION.METRICS),
      communityId
    );
    const snapshot = await getDoc(userMetricDocRef);
    const userMetric = snapshot.data();

    if (userMetric) {
      return Response.json({ data: userMetric }, { status: 200 });
    }

    return Response.json({ message: "Metric not found" }, { status: 404 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
// Create New Metric
export async function POST(req: NextRequest, { params }: contextType) {
  try {
    const { userId, communityId } = await params;
    const body = await req.json();

    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, `${userId}`);
    const userMetricDocRef = doc(
      collection(userDocRef, FIREBASE_COLLECTION.METRICS),
      communityId
    );
    const snapshot = await getDoc(userMetricDocRef);
    const userMetric = snapshot.data();

    if (userMetric) {
      userMetric.metrics = [...userMetric.metric, { ...body, id: uuidv4() }];
      await updateDoc(userMetricDocRef, userMetric);

      return Response.json({ data: userMetric }, { status: 200 });
    }

    return Response.json({ message: "Metric not found" }, { status: 404 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
// Update Metric
export async function UPDATE(req: NextRequest, { params }: contextType) {
  try {
    const { userId, communityId } = await params;
    const searchParams = req.nextUrl.searchParams;
    const metricId = searchParams.get("id");

    const body = await req.json();

    const userDocRef = doc(db, FIREBASE_COLLECTION.USERS, `${userId}`);
    const userMetricDocRef = doc(
      collection(userDocRef, FIREBASE_COLLECTION.METRICS),
      communityId
    );
    const snapshot = await getDoc(userMetricDocRef);
    const userMetric = snapshot.data() ;

    if (userMetric) {
      userMetric.metrics = userMetric.metrics?.map((metric) =>
        metric.id === metricId ? body : metric
      );

      await updateDoc(userMetricDocRef, userMetric);

      return Response.json({ data: userMetric }, { status: 200 });
    }

    return Response.json({ message: "Metric not found" }, { status: 404 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_COLLECTION } from "./firebase";
import { db } from "@/lib/firebase";

export const TRACKER_MODE = {
  add: "add",
  edit: "edit",
};

export const trackerData = [
  {
    color: "#4CAF50",
    description: "Complete online courses to improve skills",
    id: "201",
    name: "Skill Development",
    quantity: "2 courses per month",
    type: "BOOLEAN",
  },
  {
    color: "#2196F3",
    description: "Network with professionals on LinkedIn or at events",
    id: "202",
    name: "Networking",
    quantity: "5 connections per week",
    type: "BOOLEAN",
  },
  {
    color: "#FFC107",
    description: "Revise and update your resume",
    id: "203",
    name: "Resume Update",
    quantity: "1 update every 3 months",
    type: "BOOLEAN",
  },
  {
    color: "#FF5722",
    description: "Apply to relevant job openings",
    id: "204",
    name: "Job Applications",
    quantity: "5 applications per week",
    type: "BOOLEAN",
  },
  {
    color: "#9C27B0",
    description: "Attend interviews to assess opportunities",
    id: "205",
    name: "Interview Attendance",
    quantity: "2 interviews per month",
    type: "BOOLEAN",
  },
  {
    color: "#00BCD4",
    description: "Learn and improve technical tools or certifications",
    id: "206",
    name: "Technical Upskilling",
    quantity: "1 certification every 6 months",
    type: "BOOLEAN",
  },
  {
    color: "#8BC34A",
    description: "Track industry trends and company news",
    id: "207",
    name: "Industry Awareness",
    quantity: "Read 3 articles per week",
    type: "BOOLEAN",
  },
  {
    color: "#FF9800",
    description: "Attend professional development workshops",
    id: "208",
    name: "Workshops and Seminars",
    quantity: "1 workshop per quarter",
    type: "BOOLEAN",
  },
];

export const MetricsCommunityMock = [
  {
    color: "#39FF14",
    description: "Complete courses to grow skills",
    id: "201",
    name: "Courses",
    type: "BOOLEAN",
  },
  {
    color: "#FF073A",
    description: "Make new professional connections",
    id: "202",
    name: "Connects",
    type: "NUMBER",
    quantity: "connections",
  },
  {
    color: "#00FFFF",
    description: "Update and refine your resume",
    id: "203",
    name: "Resume",
    type: "BOOLEAN",
  },
  {
    color: "#FF4500",
    description: "Submit job applications",
    id: "204",
    name: "Jobs",
    type: "NUMBER",
    quantity: "jobs",
  },
  {
    color: "#DA70D6",
    description: "Prepare and attend interviews",
    id: "205",
    name: "Interviews",
    type: "NUMBER",
    // "quantity": "2/month"
  },
  {
    color: "#FFD700",
    description: "Improve technical skills or certifications",
    id: "206",
    name: "Skills",
    type: "BOOLEAN",
  },
  {
    color: "#FF00FF",
    description: "Read industry news and trends",
    id: "207",
    name: "Trends",
    type: "NUMBER",
    quantity: "blogs",
  },
  {
    color: "#00FF7F",
    description: "Attend growth workshops",
    id: "208",
    name: "Workshops",
    type: "BOOLEAN",
  },
];

export const createMockCoummnityMetrics = async()  =>{
  const docRef = doc(db , FIREBASE_COLLECTION.METRICS, "SOD" )
  const snapshot = await getDoc(docRef)
  if(!snapshot.exists()){
   await setDoc(
      docRef,
      {
        list: MetricsCommunityMock
      }
    )
  }
}
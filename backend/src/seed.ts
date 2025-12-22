import mongoose from "mongoose";
import { JobApplicationModel } from "./db/models";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL =""
const USER_ID = new mongoose.Types.ObjectId("");

async function seed() {
  await mongoose.connect(MONGO_URL);

  const jobs = [
    {
      UserId: USER_ID,
      JobTitle: "Backend Developer",
      company: "Google",
      location: "Bangalore",
      source: "LinkedIn",
      JobUrl: "https://google.com/job1",
      status: "Applied",
      appliedDate: new Date(),
      lastUpdate: new Date(),
      notes: [],
      timeline: [],
    },
    {
      UserId: USER_ID,
      JobTitle: "Full Stack Developer",
      company: "Amazon",
      location: "Hyderabad",
      source: "Careers Page",
      JobUrl: "https://amazon.com/job2",
      status: "HR Call",
      appliedDate: new Date(),
      lastUpdate: new Date(),
      notes: [],
      timeline: [],
    },
    {
      UserId: USER_ID,
      JobTitle: "Node.js Developer",
      company: "Flipkart",
      location: "Bangalore",
      source: "Referral",
      JobUrl: "https://flipkart.com/job3",
      status: "Interview 1",
      appliedDate: new Date(),
      lastUpdate: new Date(),
      notes: [],
      timeline: [],
    },
    {
      UserId: USER_ID,
      JobTitle: "Software Engineer",
      company: "Microsoft",
      location: "Remote",
      source: "LinkedIn",
      JobUrl: "https://microsoft.com/job4",
      status: "Interview 2",
      appliedDate: new Date(),
      lastUpdate: new Date(),
      notes: [],
      timeline: [],
    },
    {
      UserId: USER_ID,
      JobTitle: "Backend Engineer",
      company: "Razorpay",
      location: "Remote",
      source: "Website",
      JobUrl: "https://razorpay.com/job5",
      status: "Test",
      appliedDate: new Date(),
      lastUpdate: new Date(),
      notes: [],
      timeline: [],
    },
  ];

  await JobApplicationModel.insertMany(jobs);
  console.log("✅ Seeded job applications correctly");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

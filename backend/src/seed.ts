
import mongoose from "mongoose"
import { JobApplicationModel } from "./db/models"
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL = ""
const USER_ID = ""
async function seed(){
    await mongoose.connect(MONGO_URL)
    const jobs = [
    {
      userId: USER_ID,
      jobTitle: "Backend Developer",
      company: "Google",
      location: "Bangalore",
      source: "LinkedIn",
      jobUrl: "https://google.com/job1",
      status: "Applied",
      appliedDate: new Date()
    },
    {
      userId: USER_ID,
      jobTitle: "Full Stack Developer",
      company: "Amazon",
      location: "Hyderabad",
      source: "Careers Page",
      jobUrl: "https://amazon.com/job2",
      status: "HR Call",
      appliedDate: new Date()
    },
    {
      userId: USER_ID,
      jobTitle: "Node.js Developer",
      company: "Flipkart",
      location: "Bangalore",
      source: "Referral",
      jobUrl: "https://flipkart.com/job3",
      status: "Interview 1"
    },
    {
      userId: USER_ID,
      jobTitle: "Software Engineer",
      company: "Microsoft",
      location: "Remote",
      source: "LinkedIn",
      jobUrl: "https://microsoft.com/job4",
      status: "Interview 2"
    },
    {
      userId: USER_ID,
      jobTitle: "Backend Engineer",
      company: "Razorpay",
      location: "Remote",
      source: "Website",
      jobUrl: "https://razorpay.com/job5",
      status: "Test"
    },
    {
      userId: USER_ID,
      jobTitle: "API Developer",
      company: "Swiggy",
      location: "Bangalore",
      source: "LinkedIn",
      jobUrl: "https://swiggy.com/job6",
      status: "Rejected"
    },
    {
      userId: USER_ID,
      jobTitle: "Junior Backend Developer",
      company: "Zomato",
      location: "Gurgaon",
      source: "Website",
      jobUrl: "https://zomato.com/job7",
      status: "Ghosted"
    },
    {
      userId: USER_ID,
      jobTitle: "Software Engineer",
      company: "Paytm",
      location: "Noida",
      source: "Referral",
      jobUrl: "https://paytm.com/job8",
      status: "Applied"
    },
    {
      userId: USER_ID,
      jobTitle: "Node Developer",
      company: "CRED",
      location: "Remote",
      source: "LinkedIn",
      jobUrl: "https://cred.club/job9",
      status: "Offer"
    },
    {
      userId: USER_ID,
      jobTitle: "Backend Intern",
      company: "StartupX",
      location: "Remote",
      source: "AngelList",
      jobUrl: "https://angel.co/job10",
      status: "Applied"
    }
  ]
  await JobApplicationModel.insertMany(jobs)
  console.log("✅ Seeded 10 job applications")
  process.exit(0)
}
seed().catch((err) => {
    console.error(err)
    process.exit(1)
})
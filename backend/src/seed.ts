import mongoose from "mongoose";
import dotenv from "dotenv";
import { FollowUpReminderModel } from "./db/models";

dotenv.config();

const MONGO_URL ="mongodb+srv://shrivastavvedant15_db_user:vedant123@job-tracking.fug2alw.mongodb.net/?appName=Job-Tracking"

const USER_ID = "6942be4b3b4f55377a861832";

// ✅ JobApplication IDs FROM YOUR DATABASE
const JOBS = {
  flipkart: "6949668b63f36fea49107801", // Interview 1
  microsoft: "6949668b63f36fea49107802", // Interview 2
  razorpay: "6949668b63f36fea49107803", // Test
};

async function seed() {
  await mongoose.connect(MONGO_URL);

  const followUps = [
    // 🔔 Upcoming follow-up (Interview 1)
    {
      jobId: JOBS.flipkart,
      userId: USER_ID,
      scheduledFor: new Date("2025-12-27T10:00:00"),
      sent: false,
    },

    // 🔔 Upcoming follow-up (Interview 2)
    {
      jobId: JOBS.microsoft,
      userId: USER_ID,
      scheduledFor: new Date("2025-12-29T11:30:00"),
      sent: false,
    },

    // ✅ Already sent follow-up (Test completed)
    {
      jobId: JOBS.razorpay,
      userId: USER_ID,
      scheduledFor: new Date("2025-12-24T09:00:00"),
      sent: true,
      sentAt: new Date("2025-12-24T09:15:00"),
    },
  ];

  await FollowUpReminderModel.insertMany(followUps);

  console.log("✅ Follow-up reminders seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

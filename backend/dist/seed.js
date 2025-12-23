"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./db/models");
dotenv_1.default.config();
const MONGO_URL = "mongodb+srv://shrivastavvedant15_db_user:vedant123@job-tracking.fug2alw.mongodb.net/?appName=Job-Tracking";
const USER_ID = "6942be4b3b4f55377a861832";
// ✅ JobApplication IDs FROM YOUR DATABASE
const JOBS = {
    flipkart: "6949668b63f36fea49107801", // Interview 1
    microsoft: "6949668b63f36fea49107802", // Interview 2
    razorpay: "6949668b63f36fea49107803", // Test
};
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(MONGO_URL);
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
        yield models_1.FollowUpReminderModel.insertMany(followUps);
        console.log("✅ Follow-up reminders seeded successfully");
        process.exit(0);
    });
}
seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});

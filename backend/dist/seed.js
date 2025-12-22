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
const models_1 = require("./db/models");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = "";
const USER_ID = new mongoose_1.default.Types.ObjectId("");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(MONGO_URL);
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
        yield models_1.JobApplicationModel.insertMany(jobs);
        console.log("✅ Seeded job applications correctly");
        process.exit(0);
    });
}
seed().catch((err) => {
    console.error(err);
    process.exit(1);
});

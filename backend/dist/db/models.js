"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowUpReminderModel = exports.AnalyticsSnapshotModel = exports.TimelineModel = exports.NotesModel = exports.JobApplicationModel = exports.ResumeVersionModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique?
    password: { type: String, required: true },
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
const ResumeVersionSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    skills: { type: String },
    summary: { type: String }
});
exports.ResumeVersionModel = mongoose_1.default.model("ResumeVersion", ResumeVersionSchema);
const JobApplicationSchema = new mongoose_1.default.Schema({
    UserId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    resumeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "ResumeVersion" },
    JobTitle: { type: String },
    company: { type: String },
    location: { type: String },
    source: { type: String },
    JobUrl: { type: String },
    status: { type: String, default: "Applied", enum: [
            "Applied",
            "HR Call",
            "Interview 1",
            "Interview 2",
            "Test",
            "Rejected",
            "Offer",
            "Ghosted",
        ], },
    appliedDate: Date,
    lastUpdate: Date,
    followUpDate: Date,
    // we can also add AI analysis here later
    notes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Notes' }],
    timeline: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Timeline' }]
});
exports.JobApplicationModel = mongoose_1.default.model('JobApplication', JobApplicationSchema);
const NotesSchema = new mongoose_1.default.Schema({
    JobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'JobApplication', required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String }
});
exports.NotesModel = mongoose_1.default.model('Notes', NotesSchema);
const TimelineEventSchema = new mongoose_1.default.Schema({
    JobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'JobApplication' },
    type: { type: String, required: true }, // Applied,Interview,followUp
    description: { type: String },
    date: Date
});
exports.TimelineModel = mongoose_1.default.model('Timeline', TimelineEventSchema);
const AnalyticsSnapshotSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    totalApplications: Number,
    interviews: Number,
    offers: Number,
    rejections: Number,
    ghosted: Number,
    applicationsBySource: {
        LinkedIn: Number,
        Naukri: Number,
        CompanySite: Number,
        Other: Number,
    },
}, { timestamps: true });
exports.AnalyticsSnapshotModel = mongoose_1.default.model("AnalyticsSnapshot", AnalyticsSnapshotSchema);
const FollowUpReminderSchema = new mongoose_1.default.Schema({
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "JobApplication", required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    scheduledFor: Date,
    sent: { type: Boolean, default: false },
    sentAt: Date,
}, { timestamps: true });
exports.FollowUpReminderModel = mongoose_1.default.model("FollowUpReminder", FollowUpReminderSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignUpSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().min(3),
    password: zod_1.default.string().min(3).max(10)
});
exports.SignInSchema = zod_1.default.object({
    email: zod_1.default.string().min(3),
    password: zod_1.default.string().min(3).max(10)
});
exports.JobApplicationSchema = zod_1.default.object({
    UserId: zod_1.default.string(),
    resumeId: zod_1.default.string().optional(),
    jobTitle: zod_1.default.string().min(1),
    company: zod_1.default.string().min(1),
    location: zod_1.default.string().optional(),
    source: zod_1.default.string().optional(),
    jobUrl: zod_1.default.string().url().optional(),
    status: zod_1.default.enum([
        "Applied",
        "HR Call",
        "Interview 1",
        "Interview 2",
        "Test",
        "Rejected",
        "Offer",
        "Ghosted"
    ]).default("Applied"),
    appliedDate: zod_1.default.coerce.date().optional(),
    lastUpdate: zod_1.default.coerce.date().optional(),
    followUpDate: zod_1.default.coerce.date().optional(),
    notes: zod_1.default.array(zod_1.default.string()).optional(),
    timeline: zod_1.default.array(zod_1.default.string()).optional()
});

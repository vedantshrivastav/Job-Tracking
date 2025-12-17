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
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const middleware_1 = require("./middleware");
const models_1 = require("./db/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./db/config");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const JWT_SECRET = 'shdjshdwuieiwoeiow';
//AUTH ROUTES
app.post('/SignUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.SignUpSchema.safeParse(req.body);
    console.log("this is data", data);
    if (!success) {
        res.status(403).json({ message: 'Incorrect Request' });
        return;
    }
    try {
        const existing_user = yield models_1.UserModel.findOne({
            email: data.email
        });
        if (existing_user) {
            return res.status(403).json({ message: 'User already exists' });
        }
        const user = yield models_1.UserModel.create({
            name: data.name,
            email: data.email,
            password: data.password
        });
        res.status(200).json({ message: 'User Signed Up succesfully' });
    }
    catch (e) {
        res.status(403).json({ message: 'Something went wrong' });
        console.error(e);
    }
}));
app.post('/SignIn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.SignInSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({ messge: 'Incorrect request' });
        return;
    }
    try {
        const user = yield models_1.UserModel.findOne({
            email: data.email,
            password: data.password
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
            res.status(200).json({ id: user.id, token });
        }
        else {
            res.status(404).json({
                message: 'Incorrect Credentials'
            });
        }
    }
    catch (e) {
        res.status(403).json({ message: 'Something went wrong' });
        console.error(e);
    }
}));
// POST   /jobs              // create job
// GET    /jobs              // get all jobs (for logged-in user)
// GET    /jobs/:id          // get single job
// PUT    /jobs/:id          // update job / status
// DELETE /jobs/:id          // delete job
app.post('/job', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = req.UserId;
    const { success, data } = types_1.JobApplicationSchema.safeParse(req.body);
    if (!success) {
        return res.status(403).json({ message: "Invalid inputs" });
    }
    try {
        const existing_job = yield models_1.JobApplicationModel.findOne({
            JobUrl: data.jobUrl
        });
        if (existing_job) {
            return res.status(409).json({ message: "This Job already exists in your dashboard" });
        }
        const new_Job_Application = yield models_1.JobApplicationModel.create({
            UserId,
            resumeId: data.resumeId,
            JobTitle: data.jobTitle,
            company: data.company,
            location: data.location,
            source: data.source,
            JobUrl: data.jobUrl,
            status: data.status,
            appliedDate: data.appliedDate || new Date(),
            lastUpdate: new Date(),
            followUpDate: data.followUpDate,
            notes: [],
            timeline: []
        });
        res.status(200).json({ new_job_id: new_Job_Application._id });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong', });
        console.log(e);
    }
}));
app.get('/jobs', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = req.UserId;
    try {
        const all_jobs = yield models_1.JobApplicationModel.find({
            UserId
        });
        res.status(200).json({ all_jobs });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(e);
    }
}));
app.get('/job/:id', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job_id = req.params.id;
    const UserId = req.UserId;
    try {
        const job = yield models_1.JobApplicationModel.findOne({
            _id: job_id,
            UserId
        });
        if (!job) {
            return res.status(404).json({ message: "Job Not found" });
        }
        res.status(200).json({ job });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
app.patch('/job/:id', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job_id = req.params.id;
    const UserId = req.UserId;
    const { status } = req.body;
    const allowedStatus = [
        "Applied",
        "HR Call",
        "Interview 1",
        "Interview 2",
        "Test",
        "Rejected",
        "Offer",
        "Ghosted"
    ];
    if (!allowedStatus.includes(status)) {
        return res.status(403).json({ message: 'Invalid status' });
    }
    try {
        const job = yield models_1.JobApplicationModel.findOneAndUpdate({ _id: job_id, UserId }, { status, lastUpdated: new Date() }, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
app.delete('/job/:id', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job_id = req.params.id;
    const UserId = req.UserId;
    try {
        const job = yield models_1.JobApplicationModel.findOneAndDelete({
            _id: job_id,
            UserId
        });
        if (!job) {
            return res.status(403).json({ message: 'Job not found' });
        }
        res.status(200).json(job._id);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(e);
    }
}));
// Follow up endpoints
app.post('/jobs/:id/follow-up', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const JobId = req.params.id;
    const UserId = req.UserId;
    const scheduledFor = new Date();
    scheduledFor.setDate(scheduledFor.getDate() + 3);
    try {
        const followUp = yield models_1.FollowUpReminderModel.create({
            jobId: JobId,
            userId: UserId,
            scheduledFor
        });
        res.status(201).json(followUp);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
app.get('/follow-ups', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.UserId;
    const now = new Date();
    try {
        const followUps = yield models_1.FollowUpReminderModel.find({
            userId: userId,
            sent: false,
            scheduledFor: { $lte: now }
        }).populate('jobId');
        res.status(200).json(followUps);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
//Notes Routes
app.post('/job/:id/notes', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const JobId = req.params.id;
    const UserId = req.UserId;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Notes content required' });
    }
    try {
        const note = yield models_1.NotesModel.create({
            JobId: JobId,
            userId: UserId,
            content
        });
        // update the jobApplicationModel also
        yield models_1.JobApplicationModel.findByIdAndUpdate({
            _id: JobId
        }, { $push: { notes: note._id } });
        res.status(201).json(note);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
app.get('/job/:id/notes', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const JobId = req.params.id;
    const UserId = req.UserId;
    try {
        const note = yield models_1.NotesModel.find({
            JobId: JobId,
            userId: UserId
        }).sort({ createdAt: -1 });
        res.status(200).json(note);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
app.delete('/notes/:id', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const userId = req.UserId;
    try {
        const note = yield models_1.NotesModel.findByIdAndDelete({
            _id: noteId,
            userId: userId
        });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        yield models_1.JobApplicationModel.findByIdAndUpdate(note._id, { $pull: { notes: note._id } });
        res.status(200).json(note._id);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
//Timeline routes
app.post('/jobs/:id/timeline', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const JobId = req.params.id;
    const UserId = req.UserId;
    const { type, description } = req.body;
    if (!type) {
        return res.status(403).json({ message: 'Type required' });
    }
    try {
        const new_timeline = yield models_1.TimelineModel.create({
            JobId: JobId,
            type: type,
            description: description
        });
        yield models_1.JobApplicationModel.findByIdAndUpdate({ _id: JobId }, { $push: { timeline: new_timeline._id } });
        res.status(200).json(new_timeline);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
app.get('/jobs/:id/timeline', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const JobId = req.params.id;
    const UserId = req.UserId;
    try {
        const timeline = yield models_1.TimelineModel.find({
            JobId: JobId,
        }).sort({ createdAt: -1 });
        res.status(200).json(timeline);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
// Dashboard routes
app.get('/dashboard', middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = req.UserId;
    try {
        const total = yield models_1.JobApplicationModel.countDocuments({ UserId: UserId });
        const byStatus = yield models_1.JobApplicationModel.aggregate([
            { $match: { UserId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        const jobs = yield models_1.JobApplicationModel.find({ UserId: UserId }, { _id: 1 });
        const jobs_id = jobs.map(j => j._id);
        const UpcomingFollowUps = yield models_1.FollowUpReminderModel.countDocuments({
            jobId: { $in: jobs_id },
            sent: false,
            scheduledFor: { $lte: new Date() }
        });
        res.status(200).json({
            totalApplications: total,
            StatusBreakdown: byStatus,
            followUpDues: UpcomingFollowUps
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
app.listen(PORT, () => {
    (0, config_1.connectDB)();
    console.log('MONGO DB Connected');
    console.log(`the server is running on ${PORT}`);
});

import express from 'express'
import { JobApplicationSchema, SignInSchema,SignUpSchema } from './types'
import { AuthMiddleware } from './middleware'
import { FollowUpReminderModel, JobApplicationModel, NotesModel, TimelineModel, UserModel } from './db/models'
import jwt from 'jsonwebtoken'
import { connectDB } from './db/config'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()
const PORT = 3001
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

interface JobApplicationPopulated {
  company: string;
  JobTitle: string;
  status: string;
  lastUpdate?: Date;
}
interface FollowUpPopulated {
  jobId: JobApplicationPopulated;
  scheduledFor: Date;
  sent: boolean;
}



const JWT_SECRET = 'shdjshdwuieiwoeiow'

//AUTH ROUTES

app.post('/SignUp', async(req,res) => {
    const {success,data} = SignUpSchema.safeParse(req.body)
    console.log("this is data",data)
    if(!success){
        res.status(403).json({message : 'Incorrect Request'})
        return
    }
    try{
        const existing_user = await UserModel.findOne({
            email : data.email
        })
        if(existing_user){
            return res.status(403).json({message : 'User already exists'})
        }
        const user = await UserModel.create({
            name : data.name,
            email : data.email,
            password : data.password
        })
        res.status(200).json({message : 'User Signed Up succesfully'})
    }
    catch(e){
        res.status(403).json({message : 'Something went wrong'})
        console.error(e)
    }
})

app.post('/SignIn',async(req,res) => {
    const {success,data} = SignInSchema.safeParse(req.body)
    if(!success){
        res.status(403).json({messge : 'Incorrect request'})
        return
    }
     try{
        const user = await UserModel.findOne({
            email : data.email,
            password : data.password
        })
        if(user){
            const token = jwt.sign({id : user._id},JWT_SECRET)
            res.status(200).json({id : user.id,token})
        } else{
            res.status(404).json({
                message : 'Incorrect Credentials'
            })
        }
    }
    catch(e){
        res.status(403).json({message : 'Something went wrong'})
        console.error(e)
    }

})

// POST   /jobs              // create job
// GET    /jobs              // get all jobs (for logged-in user)
// GET    /jobs/:id          // get single job
// PUT    /jobs/:id          // update job / status
// DELETE /jobs/:id          // delete job

app.post("/job", AuthMiddleware, async (req, res) => {
  const UserId = req.UserId;

  const parsed = JobApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: parsed.error.flatten(),
    });
  }

  const data = parsed.data;

  try {
    // ✅ Only check duplicate if jobUrl exists
    if (data.jobUrl) {
      const existingJob = await JobApplicationModel.findOne({
        UserId,
        JobUrl: data.jobUrl,
      });

      if (existingJob) {
        return res
          .status(409)
          .json({ message: "This job already exists in your dashboard" });
      }
    }

   const newJob = await JobApplicationModel.create({
  UserId: new mongoose.Types.ObjectId(UserId),
  resumeId: data.resumeId || undefined,
  JobTitle: data.jobTitle,
  company: data.company,
  location: data.location,
  source: data.source,
  JobUrl: data.jobUrl || undefined,
  status: data.status,
  appliedDate: data.appliedDate ?? new Date(),
  lastUpdate: new Date(),
  followUpDate: data.followUpDate,
  notes: [],
  timeline: [],
});


    return res.status(201).json({
      new_job_id: newJob._id,
    });
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    return res.status(500).json({
      message: "Database error while creating job",
    });
  }
});


app.get('/jobs',AuthMiddleware,async(req,res) => {
    const UserId = req.UserId
    console.log("UserId",UserId)
    try{
        const all_jobs = await JobApplicationModel.find({
            UserId
        })
        console.log(all_jobs)
        res.status(200).json({all_jobs})
    }
    catch(e){
        res.status(500).json({message : 'Something went wrong'})
        console.log(e)
    }
})
app.get('/job/:id',AuthMiddleware,async(req,res) => {
    const job_id = req.params.id
    const UserId = req.UserId
    try{
        const job = await JobApplicationModel.findOne({
            _id : job_id,
            UserId
        })
        if(!job){
            return res.status(404).json({message : "Job Not found"})
        }
        res.status(200).json({job})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message : 'Something went wrong'})
    }
})
app.patch('/job/:id',AuthMiddleware,async(req,res) => {
    const job_id = req.params.id
    const UserId = req.UserId
    const {status} = req.body
    const allowedStatus = [
    "Applied",
    "HR Call",
    "Interview 1",
    "Interview 2",
    "Test",
    "Rejected",
    "Offer",
    "Ghosted"
  ]
  if(!allowedStatus.includes(status)){
    return res.status(403).json({message : 'Invalid status'})
  }
  try{
    const job = await JobApplicationModel.findOneAndUpdate(
        {_id : job_id,UserId},
        {status, lastUpdated : new Date() },
        {new : true}
    )
    if(!job){
        return res.status(404).json({message : 'Job not found'})
    }
    res.status(200).json(job)
  }
  catch(e){
     console.error(e)
    res.status(500).json({ message: "Something went wrong" })
  }
})
app.delete('/job/:id',AuthMiddleware,async(req,res) => {
    const job_id = req.params.id
    const UserId = req.UserId
    try{
        const job = await JobApplicationModel.findOneAndDelete({
            _id : job_id,
            UserId
        })
        if(!job){
            return res.status(403).json({message : 'Job not found'})
        }
        res.status(200).json(job._id)
    }
    catch(e){
        res.status(500).json({message : 'Something went wrong'})
        console.log(e)
    }
})
// Follow up endpoints
app.post('/jobs/:id/follow-up',AuthMiddleware,async(req,res) => {
    const JobId = req.params.id
    const UserId = req.UserId
    const scheduledFor = new Date()
    const {notes} = req.body
    scheduledFor.setDate(scheduledFor.getDate() + 3)
    try{
        const followUp = await FollowUpReminderModel.create({
            jobId : JobId,
            userId : UserId,
            notes : notes,
            scheduledFor
        })
        res.status(201).json(followUp)
    }
    catch(e){
        console.error(e)
    res.status(500).json({ message: "Something went wrong" })
    }
})
app.get("/follow-ups", AuthMiddleware, async (req, res) => {
  try {
    const followUps = await FollowUpReminderModel.find({
      userId: req.UserId,
    })
      .populate("jobId")
      .sort({ scheduledFor: 1 });

    res.status(200).json(followUps);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//Notes Routes
app.post('/job/:id/notes',AuthMiddleware,async(req,res) => {
    const JobId = req.params.id
    const UserId = req.UserId
    const {content} = req.body
    if(!content){
        return res.status(400).json({message: 'Notes content required'})
    }
    try{
        const note = await NotesModel.create({
            JobId : JobId,
            userId : UserId,
            content
        })
        // update the jobApplicationModel also
        await JobApplicationModel.findByIdAndUpdate({
            _id : JobId
        },{$push : {notes : note._id}})
        res.status(201).json(note)
    }
    catch(e){
        console.error(e)
        res.status(500).json({ message: "Something went wrong" })
    }
})
app.get('/job/:id/notes',AuthMiddleware,async(req,res) => {
    const JobId = req.params.id
    const UserId = req.UserId
    try{
        const note = await NotesModel.find({
            JobId : JobId,
            userId : UserId
        }).sort({createdAt : -1})
        res.status(200).json(note)
    }
    catch(e){
        console.error(e)
    res.status(500).json({ message: "Something went wrong" })
    }
})
app.delete('/notes/:id',AuthMiddleware,async(req,res) => {
    const noteId = req.params.id
    const userId = req.UserId
    try{
        const note = await NotesModel.findByIdAndDelete({
            _id : noteId,
            userId : userId
        })
        if(!note){
            return res.status(404).json({message : 'Note not found'})
        }
        await JobApplicationModel.findByIdAndUpdate(note._id,{$pull : {notes : note._id}})
        res.status(200).json(note._id)
    }catch(e){
         console.error(e)
    res.status(500).json({ message: "Something went wrong" })
    }
})
//Timeline routes
app.post('/jobs/:id/timeline',AuthMiddleware,async(req,res) => {
    const JobId = req.params.id
    const UserId = req.UserId
    const {type,description} = req.body
    if(!type){
        return res.status(403).json({message : 'Type required'})
    }
    try{
        const new_timeline = await TimelineModel.create({
             JobId : JobId,
             type: type,
             description : description
        })
        await JobApplicationModel.findByIdAndUpdate({_id : JobId},{$push : {timeline : new_timeline._id}})
        res.status(200).json(new_timeline)
    }
    catch(e){
        console.log(e)
        res.status(500).json({message : 'Something went wrong'})
    }
})
app.get('/jobs/:id/timeline',AuthMiddleware,async(req,res) => {
    const JobId = req.params.id
    const UserId = req.UserId
    try{
        const timeline = await TimelineModel.find({
            JobId : JobId,
        }).sort({createdAt : -1})
        res.status(200).json(timeline)
    }
    catch(e){
        console.error(e)
    res.status(500).json({ message: "Something went wrong" })
    }
})
// Dashboard routes
app.get("/dashboard", AuthMiddleware, async (req, res) => {
  const UserId = req.UserId;

  try {
    /* ------------------ Stats ------------------ */
    const totalApplications = await JobApplicationModel.countDocuments({
      UserId,
    });

    const activeInterviews = await JobApplicationModel.countDocuments({
      UserId,
      status: { $in: ["HR Call", "Interview 1", "Interview 2", "Test"] },
    });

    const offers = await JobApplicationModel.countDocuments({
      UserId,
      status: "Offer",
    });

    /* ------------------ Status Breakdown ------------------ */
    const statusAggregation = await JobApplicationModel.aggregate([
      { $match: { UserId : new mongoose.Types.ObjectId(UserId) } },
      { $group: { _id: "$status", total: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id", total: 1 } },
    ]);
    console.log("STATUS AGG RAW:", statusAggregation);

    /* ------------------ Recent Jobs ------------------ */
    const recentJobs = await JobApplicationModel.find(
      { UserId },
      {
        JobTitle: 1,
        company: 1,
        status: 1,
        appliedDate: 1,
      }
    )
      .sort({ appliedDate: -1 })
      .limit(5);

    /* ------------------ Follow-ups ------------------ */
  const followUps = await FollowUpReminderModel.find({
  userId: UserId,
  sent: false,
  scheduledFor: { $lte: new Date() },
})
.populate("jobId", "company JobTitle status lastUpdate")
.lean<FollowUpPopulated[]>();


    /* ------------------ Response ------------------ */


    res.status(200).json({
      stats: {
        totalApplications,
        activeInterviews,
        offers,
        followUps: followUps.length,
      },

      statusBreakdown: statusAggregation,

      recentJobs,

      followUps: followUps.map((f) => ({
  target: f.jobId.company,
  action: `Follow up for ${f.jobId.JobTitle}`,
  due: f.scheduledFor,
}))

    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(PORT,() => {
     connectDB()
     console.log('MONGO DB Connected')
    console.log(`the server is running on ${PORT}`)
})
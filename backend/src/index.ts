import express from 'express'
import { JobApplicationSchema, SignInSchema,SignUpSchema } from './types'
import { AuthMiddleware } from './middleware'
import { JobApplicationModel, UserModel } from './db/models'
import jwt from 'jsonwebtoken'
import { connectDB } from './db/config'
const app = express()
const PORT = 3000
app.use(express.json())

const JWT_SECRET = 'shdjshdwuieiwoeiow'

//AUTH ROUTES

app.post('/SignUp', async(req,res) => {
    const {success,data} = SignUpSchema.safeParse(req.body)
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

app.post('/job',AuthMiddleware,async(req,res) => {
    const UserId = req.UserId
    const {success,data} = JobApplicationSchema.safeParse(req.body)
    if(!success){
        return res.status(403).json({message : "Invalid inputs"})
    }
    try{
        const existing_job = await JobApplicationModel.findOne({
            JobUrl : data.jobUrl
        })
        if(existing_job){
            return res.status(409).json({message : "This Job already exists in your dashboard"})
        }
      const new_Job_Application = await JobApplicationModel.create({
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
    })
       res.status(200).json({new_job_id : new_Job_Application._id})
    }
    catch(e){
         res.status(500).json({message : 'Something went wrong',})
         console.log(e)
    }
})

app.get('/jobs',AuthMiddleware,async(req,res) => {
    const UserId = req.UserId
    try{
        const all_jobs = await JobApplicationModel.find({
            UserId
        })
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
app.listen(PORT,() => {
     connectDB()
     console.log('MONGO DB Connected')
    console.log(`the server is running on ${PORT}`)
})
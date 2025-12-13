import express from 'express'
import { SignInSchema,SignUpSchema } from './types'
import { AuthMiddleware } from './middleware'
import { UserModel } from './db/models'
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

app.post('/job',async(req,res) => {
    
})
app.listen(PORT,() => {
     connectDB()
     console.log('MONGO DB Connected')
    console.log(`the server is running on ${PORT}`)
})
import z from 'zod'

export const SignUpSchema = z.object({
    name : z.string(),
    email : z.string().min(3).max(10),
    password : z.string().min(3).max(10) 
})
export const SignInSchema = z.object({
    email : z.string().min(3).max(10),
    password : z.string().min(3).max(10) 
})
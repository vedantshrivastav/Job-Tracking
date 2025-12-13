import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import type { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "SJDSJDWIWEU2923923AQ"
export function AuthMiddleware(req : Request,res:Response,next:NextFunction){
    const header = req.headers['authorization'] as string
    try{
        const response = jwt.verify(header,JWT_SECRET) as JwtPayload
        req.userId = response.id
        next()
    }
    catch(e){
        res.status(403).json({message : "You are not logged In"})
    }
}
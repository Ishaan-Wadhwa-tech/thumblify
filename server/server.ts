import dotenv from "dotenv";
dotenv.config(); 
import express, { Request, Response } from 'express';
import cors from 'cors'
import connectDb from "./configs/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRouter from "./routes/AuthRoutes.js";
import thumbnailRouter from "./routes/ThumbnailRoutes.js";
import { userRouter } from "./routes/UserRoutes.js";
import ai from './configs/ai.js'
declare module 'express-session'{
interface SessionData{
    isLoggedIn:boolean;
    userId:string;

}
}
const app = express();
app.set('trust proxy',1)
app.use(cors({
    origin:['http://localhost:5173','http://localhost:3000',"https://thumblify-drab.vercel.app"],
    credentials:true
}))
await connectDb()
app.use(session({
    secret:process.env.SESSION_SECRET as string,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24*7,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'?'none':'lax',
        path:'/'
    },
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI,
        collectionName:'sessions'
    })
}))
app.use(express.json())


const port = process.env.PORT
app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});
app.use('/api/auth',authRouter)
app.use('/api/thumbnail',thumbnailRouter)
app.use('/api/user',userRouter)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
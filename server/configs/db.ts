import mongoose from 'mongoose'
const connectDb = async()=>{
try{
    mongoose.connection.on('connected',()=>console.log('mongo db connected'))
    await mongoose.connect(process.env.MONGODB_URI as string)
}
catch(e){
console.error('error connecting to mongo db: ',e);
}
}
export default connectDb
import mongoose from 'mongoose';

const MONGO_URL=process.env.NEXT_PUBLIC_MONGO_URL

export async function connectDB (){
  await mongoose.connect(MONGO_URL);
}

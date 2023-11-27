import mongoose from 'mongoose'

// 비동기 함수를 선언 해야함
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

export default connectMongoDB

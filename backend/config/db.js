import mongoose from 'mongoose'
import colors from 'colors' 
const connectDB =async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to mongodb DATABASE ${conn.connection.host}`.bgGreen);
    } catch (error) {
        console.log(`eror mongoDB ${error}`.bgRed);
    }
}
export default connectDB ;
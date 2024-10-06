import mongoose from "mongoose";


const DbCon=async()=>{
    try {
        console.log('6')
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
       console.log('mongo db is connected')
    } catch (error) {
        console.log('error at db')
        console.log(error)
    }
}

export default DbCon
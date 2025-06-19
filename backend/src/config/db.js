import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI) ;
        console.log("Mongo DB Connected") ;
    } catch (error) {
        console.error("Error connecting to mongodb ", error);
        process.exit(1) ; // 1 : exit with failure , 0 : means success
    }

}

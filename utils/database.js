import mongoose from "mongoose";
 
let isConnected = false;

export default async function connectToDB() {
    mongoose.set('strictQuery', true);
    
    if (isConnected) {
        console.log("Already connected to DB");
        return ;
    }
    try {
        const database = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "unicon"
        })
        isConnected = true;
        console.log("Connected MongoDB: ", database);
    } catch (error) {
        console.log("Err connecting DB", error)
    }
}
import mongoose from "mongoose";


type ConnectionObject = {
    isConnected ?: number;
}

const connection : ConnectionObject = {};

async function dbConnect() : Promise<any>{
    if(connection.isConnected){
        console.log("Already connected to the DB");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI! , {});
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting to DB",error);
        process.exit(1);
    }
}

export default dbConnect;

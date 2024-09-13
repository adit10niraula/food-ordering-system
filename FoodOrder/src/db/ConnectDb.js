import mongoose from "mongoose";



const connectDb = async(port, app)=>{
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("database connected success in ")

        app.listen(port, ()=>{
            console.log("app runnign in port ", port)
        })
        
    } catch (error) {
        console.log("error connecting databse",error)
        process.exit(1)
        
    }
}

export {connectDb}
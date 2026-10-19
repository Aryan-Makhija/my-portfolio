import mongoose from "mongoose";



export async function connectToDb() {

    await mongoose.connect(process.env.DBURL).then(() => {
        console.log("Connected To Db Successfully !")
    }).catch(err => console.log(err))
}


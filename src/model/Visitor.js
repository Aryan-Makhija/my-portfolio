import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const VisitorModel = mongoose.models.visitor || mongoose.model("Visitor", VisitorSchema)

export default VisitorModel
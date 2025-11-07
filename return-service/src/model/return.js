import mongoose from "mongoose";


const retrunSchema = new mongoose.Schema({
    userId: { type: String, required:true },
    returnAmount: { type: Number, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id,
                delete ret._id
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id,
                delete ret._id
        }
    }
})

const Return = mongoose.model('ReturnData',retrunSchema)

export default Return
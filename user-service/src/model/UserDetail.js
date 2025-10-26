import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    name: { type: String },
    phone: { type: Number },
    address: { type: String },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
        }
    }
})

const UserDetails = mongoose.model('UserData', userDataSchema)

export default UserDetails
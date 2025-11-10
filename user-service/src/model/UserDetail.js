import mongoose from "mongoose";


const bankSchema = new mongoose.Schema({
    accountNumber: { type: String},
    ifsc: { type: String},
    accountHolder: { type: String}
})
const userDataSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String },
    phone: { type: Number },
    bankDetails : bankSchema,
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
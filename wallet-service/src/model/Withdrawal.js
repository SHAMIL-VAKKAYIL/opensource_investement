import mongoose from "mongoose";



const bankSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true },
    ifsc: { type: String, required: true },
    accountHolder: { type: String, required: true }
})
const withdrawSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    bankDetails: bankSchema,
    createdAt: Date,
    updatedAt: Date
},
    {
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
    }
)

const Withdraw = mongoose.model('Withdraw', withdrawSchema)

export default Withdraw
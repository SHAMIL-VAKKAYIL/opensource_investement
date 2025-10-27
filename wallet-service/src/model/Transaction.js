import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
    userId: { type: String, required: true },
    amount: Number,
    type: { type: String, enum: ["credit", "debit"], required: true },
    description: String,
    createdAt: { type: Date, default: Date.now },
}, {
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
});

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
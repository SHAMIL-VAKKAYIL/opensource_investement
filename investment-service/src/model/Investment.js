import mongoose from "mongoose";


const investmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    walletId: { type: String, required: true },
    amount: { type: Number, required: true },

    planType: { type: String, enum: ["short-term", "long-term"], default: "short-term" },
    expectedReturn: { type: Number, required: true },
    durationDays: { type: Number, required: true },

    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" },
}, {
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
});

const Investment = mongoose.model('Investment', investmentSchema)

export default Investment
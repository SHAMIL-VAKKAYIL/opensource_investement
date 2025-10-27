import mongoose from 'mongoose'


const walletSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    balance: { type: Number, default: 0 },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
},
    {
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
    }
);


const Wallet = mongoose.model('Wallet', walletSchema)

export default Wallet
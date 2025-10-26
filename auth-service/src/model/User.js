import mongoose from "mongoose";
import { HashPassword } from "../utils/password.util.js"
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{ type: String, enum: ["user", "admin"], default: "user" }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret.password
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret.password
        }
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await HashPassword(this.password)
})

userSchema.methods.isPasswordMatch = async function (Enteredpassword) {
    const isMatch = await bcrypt.compare(Enteredpassword, this.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema)

export default User
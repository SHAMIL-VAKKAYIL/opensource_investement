import mongoose from "mongoose";
import { HashPassword, passwordCheck } from "../utils/password.util.js";


const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    timestamps:true,
    toJSON:{
        virtuals:true,
        versionKey:false,
        transform:(doc,ret)=>{
            delete ret.password
        }
    },
    toObject:{
        virtuals:true,
        versionKey:false,
        transform:(doc,ret)=>{
            delete ret.password
        }
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await HashPassword(this.password)
})

userSchema.methods.isPasswordMatch=async function(Enteredpassword){
    return await passwordCheck(Enteredpassword,this.password)
}

const User = mongoose.model('User', userSchema)

export default User
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: [true, "User with this name already exists"] },
    email: { type: String },
    mobileNo: { type: String, required: true, unique: [true, "User with this mobileNo already exists"] },
    password: { type: String, required: true },
    isMfaActive: { type: Boolean, default: false },
    twoFactorSecret: { type: String }
}, {
    timestamps: true
})

const User = mongoose.model("Users", userSchema);

export default User;
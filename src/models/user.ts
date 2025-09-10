import { NextFunction } from "express";
import { comparePassword, hashPassword } from "../lib/hash";

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password قبل از ذخیره
//@ts-ignore
UserSchema.pre('save', async function (next: NextFunction) {
    //@ts-ignore
    if (!this.isModified('password')) return next();

    try {
        //@ts-ignore
        this.password = await hashPassword(this.password)
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await comparePassword(candidatePassword, this.password);
};

const userModel = mongoose.model('User', UserSchema)
export default userModel
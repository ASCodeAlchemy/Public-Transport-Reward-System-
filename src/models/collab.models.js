import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const collabSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
}, { timestamps: true });

collabSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const Collab = mongoose.model("Collab", collabSchema);
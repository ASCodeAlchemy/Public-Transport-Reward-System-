import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

const userSchema = new mongoose.Schema({

    // avatar: {
    //     type: String, 

    //  },
     
       username: {
         type: String,
         required: true,
         unique: true
       },
       firstname: {
         type: String,
         required: true
       },
       lastname: {
         type: String,
         required: true
       },
       email: {
         type: String,
         required: true,
         unique: true 
       },
       password: {
         type: String,
         required: true
       },

       totalTrips: {
        type: Number,
        default: 0
        },

        totalReward: {
          type: Number,
          default: 0
         },
       
    refreshToken : { 
        type : String,
        default: null
      },

      trips: [{ type: Object }]

},{timestamps: true})

userSchema.pre("save",async function(next){ 
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){ 
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            firstname: this.firstname,
             
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    
}

userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({ 
       _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
 )
    }

export const User = mongoose.model("User",userSchema)
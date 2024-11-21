import mongoose from "mongoose";


const UserSchema= new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String },
  role: { type: String, enum: ['admin', 'manager', 'customer'], default: 'customer' },
  googleId : {type: String},
 

},
{timestamps: true,

});


export const User = mongoose.model('User', UserSchema);
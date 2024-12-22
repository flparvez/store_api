import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const orderSchema= new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true, 
    default: () => `ORD-${uuidv4()}-${Date.now()}` // Generate a unique order ID with UUID and timestamp
  },
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: Number, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        user: { type:String},
        
    
     products: [],  // Array of product details
    
        total: { type: Number},
    
        status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
        paymentType: { type: String},
        transaction: { type: String, required: true },
        ordertrack: { type: String, default: '/test/order' },
        // add
      },
      { timestamps: true }
    );



export const Order = mongoose.model('Order', orderSchema);
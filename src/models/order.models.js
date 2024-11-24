import mongoose from "mongoose";


const orderSchema= new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: Number, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        user: { type:String},
        
    
     products: [],  // Array of product details
    
        total: { type: Number},
    
        status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
        paymentType: { type: String, enum: ['full', 'partial', ]},
        transaction: { type: String, required: true },
        ordertrack: { type: String, default: '/test/order' },
        // add
      },
      { timestamps: true }
    );



export const Order = mongoose.model('Order', orderSchema);
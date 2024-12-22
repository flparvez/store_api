import mongoose from "mongoose";
// Helper function to generate a random 4-digit order ID
const generateOrderId = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number between 1000 and 9999
};

const orderSchema= new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
    default: generateOrderId, // Call the helper function to generate orderId
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
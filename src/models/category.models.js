import mongoose from "mongoose";


const categorySchema= new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
},{timestamps: true});
export const Category = mongoose.model('Category', categorySchema);
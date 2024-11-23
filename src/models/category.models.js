import mongoose from "mongoose";


const categorySchema= new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
},{timestamps: true});




// Pre-save hook to generate slug from name
categorySchema.pre('save', async function(next) {
    if (this.isModified('title')) {
      this.slug = slugify(this.title, { lower: true, strict: true });
  
      // Ensure slug is unique
      const slugExists = await mongoose.models.Category.findOne({ slug: this.slug });
      if (slugExists) {
        this.slug = `${this.slug}-${Date.now()}`;
      }
    }
    next();
  });
  

export const Category = mongoose.model('Category', categorySchema);
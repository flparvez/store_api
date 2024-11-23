import mongoose from "mongoose";
import slugify from "slugify";


const categorySchema= new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    slug: { type: String, unique: true },
},{timestamps: true});




// Pre-save hook to generate slug from name
categorySchema.pre('save', async function(next) {
    if (this.isModified('name')) {
      this.slug = slugify(this.name, { lower: true, strict: true });
  
      // Ensure slug is unique
      const slugExists = await mongoose.models.Category.findOne({ slug: this.slug });
      if (slugExists) {
        this.slug = `${this.slug}-${Date.now()}`;
      }
    }
    next();
  });
  

export const Category = mongoose.model('Category', categorySchema);
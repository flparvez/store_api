import mongoose from 'mongoose';
import slugify from 'slugify';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sname: { type: String},
    slug: {
      type: String,
      unique: true,   // Slug should be unique
    },
    description: {
      type: String,  // Rich text description (HTML)
      required: true,
    },
    price: { type: Number, required: true },
    mprice: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    images: { type: String },
    video: { type: String },
    stock: { type: Number, required: true, default: 0 },
    sold: { type: Number, default: 0 },
    tags: { type: String },
    warrenty: { type: String },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from name
ProductSchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });

    // Ensure slug is unique
    const slugExists = await mongoose.models.Product.findOne({ slug: this.slug });
    if (slugExists) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  next();
});



export const Product = mongoose.model('Product', ProductSchema);
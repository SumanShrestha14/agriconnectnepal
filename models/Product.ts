import mongoose, { Schema, model, models } from "mongoose"

const ProductSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  unit: String,
  quantity: Number,
  description: String,
  harvestDate: String,
  expiryDate: String,
  images: [String],
  organic: Boolean,
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
  },
}, { timestamps: true })

export default models.Product || model("Product", ProductSchema)

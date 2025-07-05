import mongoose, { Schema, model, models } from "mongoose"

export interface Review {
  _id?: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  farmerId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<Review>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  images: [{
    type: String,
  }],
  helpful: {
    type: Number,
    default: 0,
  },
}, { timestamps: true })

// Ensure one review per customer per product
ReviewSchema.index({ customerId: 1, productId: 1 }, { unique: true })

export default models.Review || model<Review>("Review", ReviewSchema) 
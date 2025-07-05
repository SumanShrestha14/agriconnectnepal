import mongoose, { Schema, model, models } from "mongoose"

export interface Order {
  _id?: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  farmerId: mongoose.Types.ObjectId;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    unit: string;
  }>;
  totalAmount: number;
  deliveryFee: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  deliveryInstructions?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<Order>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryFee: {
    type: Number,
    default: 5.99,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryInstructions: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  estimatedDelivery: {
    type: Date,
  },
  actualDelivery: {
    type: Date,
  },
}, { timestamps: true })

export default models.Order || model<Order>("Order", OrderSchema) 
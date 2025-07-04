import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models } from "mongoose";

export interface Customer {
  _id?: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
  profilePicture?: { 
    data: Buffer;
    contentType: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const customerSchema = new Schema<Customer>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"], 
    },
    phoneNumber: {
      type: Number, 
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePicture: {
      data: {
        type: Buffer,
        required: false, 
      },
      contentType: {
        type: String,
        required: false, 
      },
    },
  },
  {
    timestamps: true, 
  }
);

customerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
  }
  next();
});

const Customer = models.Customer || model<Customer>("Customer", customerSchema);

export default Customer;
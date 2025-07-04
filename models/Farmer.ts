import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models } from "mongoose";

export interface Farmer {
  _id?: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  phoneNumber: number;
  FarmName: string;
  FarmLocation: string;
  FarmDescription: string;
  password: string;
  profilePicture : {
    data:Buffer,
    contentType : string,
  };
  deliveryRadius : number ;
  createdAt?: Date;
  updatedAt?: Date;
}

const FarmerSchema = new Schema<Farmer>(
  {
    fullname: {
      type: String,
      required: true,
      trim : true,
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
      unique : true,
    },
    FarmName: {
      type: String,
      required: true,
    },
    FarmLocation: {
      type: String,
      required: true,
    },
    FarmDescription: {
      type: String,
      required: true,
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

FarmerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
  }
  next();
});

const Farmer = models.Farmer || model<Farmer>("Farmer", FarmerSchema);

export default Farmer;
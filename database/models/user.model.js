import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trime: true },
    email: { type: String, required: true, unique: true, trime: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    forgetPassword: { type: String },
    address: [addressSchema],
    deactivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);

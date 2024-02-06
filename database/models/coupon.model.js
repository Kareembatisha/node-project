import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      min: 0,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    isDeleted: { type: Boolean, default: false },
    isUsed: { type: Boolean, default: false },
    expirein: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const couponModel = mongoose.model("coupon", couponSchema);

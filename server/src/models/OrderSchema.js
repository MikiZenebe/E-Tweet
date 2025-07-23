import mongoose, { model, Schema } from "mongoose";

const OrderItemSchema = new Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new Schema({
  items: [OrderItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "preparing", "ready", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderSchema);

export default Order;

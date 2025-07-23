import Order from "../models/OrderSchema.js";
import Food from "../models/FoodMenuSchema.js";

export const createOrder = async (req, res) => {
  try {
    // Validate items and calculate total price
    let totalPrice = 0;
    const items = [];

    for (const item of req.body.items) {
      const foodItem = await Food.findById(item.itemId);

      if (!foodItem) {
        return res
          .status(404)
          .json({ message: `Food item with ID ${item.itemId} not found` });
      }

      totalPrice += foodItem.price * item.quantity;
      items.push({
        itemId: foodItem._id,
        quantity: item.quantity,
      });

      const order = new Order({
        items,
        totalPrice,
        status: "pending",
      });

      const newOrder = await order.save();
      res.status(201).json(newOrder);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.itemId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

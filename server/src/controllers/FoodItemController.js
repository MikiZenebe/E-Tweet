import Food from "../models/FoodMenuSchema.js";
import cloudinary from "../lib/cloudinary.js";

export const createFood = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //upload image to cloudinary
    const uploadRes = await cloudinary.uploader.upload(image);
    const imageUrl = uploadRes.secure_url;

    //save to database
    const newFood = new Food({
      name,
      description,
      price,
      image: imageUrl,
    });
    await newFood.save();

    res.status(201).json(newFood);
  } catch (error) {
    console.log("Error in creating food", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.send({
      foods: foods,
    });
  } catch (error) {
    console.log("Error in fetching food", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleFood = async (req, res) => {
  try {
    const singleFood = await Food.findById(req.params.id);
    if (!singleFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.json(singleFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

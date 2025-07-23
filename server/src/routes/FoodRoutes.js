import express from "express";
import {
  createFood,
  getAllFoods,
  getSingleFood,
} from "../controllers/FoodItemController";

const router = express.Router();

router.post("/create/food", createFood);
router.post("/foods", getAllFoods);
router.post("/food/:id", getSingleFood);

export default router;

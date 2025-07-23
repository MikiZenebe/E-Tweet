import express from "express";
import { createOrder, getOrder } from "../controllers/OrderController";

const router = express.Router();

router.post("/create/order", createOrder);
router.post("/orders", getOrder);

export default router;

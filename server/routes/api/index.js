import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
// import paymentRoute from "./payment.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
// router.use("/payment", paymentRoute);

export default router;

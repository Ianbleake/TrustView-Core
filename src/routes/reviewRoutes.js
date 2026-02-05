import { Router } from "express";
import { createReview } from "../controllers/reviewsController.js";

const router = Router();

router.post("/", createReview);

export default router;

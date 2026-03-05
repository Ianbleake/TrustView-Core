import { Router } from "express"
import { getProduct, getProducts } from "../controllers/productsController.js";

const router = Router();

router.get("/all/:storeId",
  getProducts
)

router.get("/:productId",
  getProduct
)

export default router
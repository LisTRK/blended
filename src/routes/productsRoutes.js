import { Router } from "express";
import { createProduct, getAllProducts,getProductById } from "../controllers/productsController.js";

const router = Router();

router.get('/products', getAllProducts);
router.get("/products/:productId", getProductById);
router.post("/products",createProduct);

export default router;

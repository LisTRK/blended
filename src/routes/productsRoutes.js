import { Router } from "express";
import { createProduct, getAllProducts,getProductById, updateProduct } from "../controllers/productsController.js";

const router = Router();

router.get('/products', getAllProducts);
router.get("/products/:productId", getProductById);
router.post("/products", createProduct);
router.patch('/products/:productId', updateProduct);

export default router;

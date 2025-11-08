import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
}

export const getProductById = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
        throw createHttpError(404, "Product not found");
    }

    res.status(200).json(product);
}



export const createProduct = async (req, res)=>{
const newProduct = await Product.create(req.body);
res.status(201).json(newProduct);
}

export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) {
    throw createHttpError(404, 'Product not found');
    }

    res.status(200).json(updatedProduct);
}


export const deleteProduct = async ( req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(deleteProduct);
}
import axios from "axios";
import { Product } from "../models/Product";

export const getProducts = () => {
  return axios.get<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/products`);
};

export const getProduct = (productId: number) => {
  return axios.get<Product>(
    `${import.meta.env.VITE_API_BASE_URL}/products/${productId}`
  );
};

export const deleteProduct = (productId: number) => {
  return axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/products/${productId}`
  );
};
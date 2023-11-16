import axios from "axios";
import { Category } from "../models/Category";

export const getCategories = () => {
  return axios.get<Category[]>(
    `${import.meta.env.VITE_API_BASE_URL}/categories`
  );
};

export const getCategory = (categoryId: number) => {
  return axios.get<Category>(
    `${import.meta.env.VITE_API_BASE_URL}/categories/${categoryId}`
  );
};

export const deleteCategory = (categoryId: number) => {
  return axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/categories/${categoryId}`
  );
};

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormAddNew from "./FormAddNew";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { getProducts } from "../services/ProductService";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { getCategories } from "../services/CategoryService";

const PageContent: React.FC = () => {
  let { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("s");
    setSearchValue(searchQuery || null);
  }, [location.search]);

  useEffect(() => {
    if (type === "products") {
      if (products.length === 0) {
        getProducts()
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error("Error while fetching products:", error);
          });
      }
    } else if (type === "categories") {
      if (categories.length === 0) {
        getCategories()
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.error("Error while fetching categories:", error);
          });
      }
    }
  }, [type]);

  const renderTable = () => {
    const tableData: (Product | Category)[] =
      type === "products" ? products : categories;
    const src = searchValue
      ? tableData.filter((data) =>
          data.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : tableData;
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            {type === "products" && (
              <>
                <th>Stock</th>
                <th>Prix</th>
              </>
            )}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {src.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.image}</td>
              {"stock" in data && "price" in data && (
                <>
                  <td>{(data as Product).stock}</td>
                  <td>{(data as Product).price}</td>
                </>
              )}
              <td>
                <FaEye color="blue" />
                <FaEdit color="green" />
                <FaTrash color="red" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <div className="container">
      <h1>
        {type
          ? type === "products"
            ? "Liste des produits"
            : "Liste des catégories"
          : "Accueil"}
      </h1>
      <div>{/* <FormAddNew type={type} /> */}</div>
      {type === "products" || type === "categories" ? renderTable() : null}
    </div>
  );
};

export default PageContent;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormAddNew from "./FormAddNew";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { getProducts } from "../services/ProductService";
import { Product } from "../models/Product";

const PageContent: React.FC = () => {
  let { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
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
            console.error("Error fetching products:", error);
          });
      }
    }
  }, [type]);

  const renderTable = () => {
    const src = searchValue
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : products;
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
          {src.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.image}</td>
              {type === "products" && (
                <>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
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

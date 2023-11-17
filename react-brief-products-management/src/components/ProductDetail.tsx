import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { getProduct } from "../services/ProductService";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
    getProduct(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching product:", error);
      });
  }}, [id]);

  return (
    <div className="container">
      <h1>Détails du Produit</h1>
      {product ? (
        <div>
          <p>Id: {product.id}</p>
          <p>Nom: {product.name}</p>
          <p>Description: {product.description}</p>
        </div>
      ) : (
        <p>Chargement ...</p>
      )}
    </div>
  );
};

export default ProductDetail;

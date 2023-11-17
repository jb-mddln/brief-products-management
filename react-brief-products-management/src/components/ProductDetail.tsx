import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { getProduct } from "../services/ProductService";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(id)
        .then((response) => {
          console.log(response.data.image);
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error while fetching product:", error);
        });
    }
  }, [id]);

  return (
    <div className="container">
      <h1>Détails du Produit</h1>
      {product ? (
        <div className="flex">
          <div className="card">
            <div className="card-wrapper">
              <div className="card-back">
                <FaArrowLeft />
              </div>
              <div className="card-menu">
                <FaTrash color="red" />
              </div>
            </div>
            <div className="card-img">
              <img
                src={`data:image/png;base64,${product.image}`}
                alt={product.name}
              ></img>
            </div>
            <div className="card-title">
              {product.id} - {product.name}
            </div>
            <div className="card-subtitle">{product.description}</div>
            <div className="card-wrapper" style={{ marginTop: "30px" }}>
              <div className="card-price">{product.price} €</div>
              <div className="card-stock">
                <div className="card-stock-txt">{product.stock}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Chargement ...</p>
      )}
    </div>
  );
};

export default ProductDetail;
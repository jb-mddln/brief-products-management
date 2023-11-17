import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { deleteProduct, getProduct } from "../services/ProductService";
import { FaArrowLeft, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isEditable, setEditable] = useState(false);

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

  const handleDeleteClick = async () => {
    if (product === null) return;
    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error("Error while deleting product:", error);
      setErrorMessage(
        "Une erreur s'est produite lors de la suppression du produit."
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const toggleEditMode = () => {
    setEditable(!isEditable);
  };

  return (
    <div className="container">
      <h1>Détails du Produit</h1>
      {product ? (
        <>
          {errorMessage && (
            <div className="alert alert-danger">
              <h3 className="alert-title">Erreur</h3>
              <p className="alert-content">{errorMessage}</p>
            </div>
          )}
          <div className="flex">
            <div className="card">
              <div className="card-wrapper">
                <div className="card-back">
                  <FaArrowLeft onClick={() => navigate(-1)} />
                </div>
                <div className="card-menu">
                  {isEditable ? (
                    <>
                      <FaSave color="green" onClick={() => toggleEditMode()} />
                    </>
                  ) : (
                    <>
                      <FaEdit color="green" onClick={() => toggleEditMode()} />
                    </>
                  )}
                  <FaTrash color="red" onClick={handleDeleteClick} />
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
        </>
      ) : (
        <p>Chargement ...</p>
      )}
    </div>
  );
};

export default ProductDetail;

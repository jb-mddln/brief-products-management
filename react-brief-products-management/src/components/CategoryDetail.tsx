import { useParams , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategory } from "../services/CategoryService";
import { Category } from "../models/Category";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCategory(id)
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error while fetching category:", error);
        });
    }
  }, [id]);

  return (
    <div className="container">
      <h1>Détails du Produit</h1>
      {category ? (
        <div className="flex">
          <div className="card">
            <div className="card-wrapper">
              <div className="card-back">
                <FaArrowLeft onClick={() => navigate(-1)} />
              </div>
              <div className="card-menu">
                <FaTrash color="red" />
              </div>
            </div>
            <div className="card-img">
              <img
                src={`data:image/png;base64,${category.image}`}
                alt={category.name}
              ></img>
            </div>
            <div className="card-title">
              {category.id} - {category.name}
            </div>
            <div className="card-subtitle">{category.description}</div>
          </div>
        </div>
      ) : (
        <p>Chargement ...</p>
      )}
    </div>
  );
};

export default CategoryDetail;

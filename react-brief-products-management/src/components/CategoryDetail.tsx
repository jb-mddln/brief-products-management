import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategory } from "../services/CategoryService";
import { Category } from "../models/Category";

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (id) {
    getCategory(id)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching category:", error);
      });
  }}, [id]);

  return (
    <div className="container">
      <h1>Détails de la Catégorie</h1>
      {category ? (
        <div>
          <p>Id: {category.id}</p>
          <p>Nom: {category.name}</p>
          <p>Description: {category.description}</p>
        </div>
      ) : (
        <p>Chargement ...</p>
      )}
    </div>
  );
};

export default CategoryDetail;

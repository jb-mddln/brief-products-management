import React from "react";
import { useParams } from "react-router-dom";

const PageContent: React.FC = () => {
  let { type } = useParams();

  const renderTable = () => {
    if (type === "products") {
      return (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Image</th>
              <th>Stock</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Produit 1</td>
              <td>Description du produit 1</td>
              <td>Image du produit 1</td>
              <td>10</td>
              <td>19.99</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Produit 2</td>
              <td>Description du produit 2</td>
              <td>Image du produit 2</td>
              <td>40</td>
              <td>39.99</td>
            </tr>
          </tbody>
        </table>
      );
    } else if (type === "categories") {
      return (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Catégorie 1</td>
              <td>Description de la catégorie 1</td>
              <td>Image de la catégorie 1</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return null;
    }
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
      {renderTable()}
    </div>
  );
};

export default PageContent;

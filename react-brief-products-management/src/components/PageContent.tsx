import React from "react";
import { useParams } from "react-router-dom";
import FormAddNew from "./FormAddNew";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const PageContent: React.FC = () => {
  let { type } = useParams<{ type: string }>();

  const renderTable = () => {
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
          {type === "products" ? (
            <>
              <tr>
                <td>1</td>
                <td>Produit 1</td>
                <td>Description du produit 1</td>
                <td>Image du produit 1</td>
                <td>10</td>
                <td>19.99</td>
                <td>
                  <FaEye color="blue" />
                  <FaEdit color="green" />
                  <FaTrash color="red" />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Produit 2</td>
                <td>Description du produit 2</td>
                <td>Image du produit 2</td>
                <td>40</td>
                <td>39.99</td>
                <td>
                  <FaEye color="blue" />
                  <FaEdit color="green" />
                  <FaTrash color="red" />
                </td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td>1</td>
                <td>Catégorie 1</td>
                <td>Description de la catégorie 1</td>
                <td>Image de la catégorie 1</td>
                <td>
                  <FaEye color="blue" />
                  <FaEdit color="green" />
                  <FaTrash color="red" />
                </td>
              </tr>
            </>
          )}
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
      {renderTable()}
    </div>
  );
};

export default PageContent;

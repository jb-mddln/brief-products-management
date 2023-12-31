import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormAddNew from "./FormAddNew";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaSave,
  FaPlusCircle,
  FaTimes,
} from "react-icons/fa";
import { getProducts } from "../services/ProductService";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { getCategories } from "../services/CategoryService";
import { Link } from "react-router-dom";

const PageContent: React.FC = () => {
  let { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [isModalOpened, setModalOpen] = useState(false);

  const isRowEditable = (id: number) => editableRow === id;

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

  const toggleEditMode = (id: number) => {
    if (isRowEditable(id)) {
      // todo save edit
      setEditableRow(null);
    } else {
      if (editableRow !== null) {
        const confirmMessage = window.confirm(
          "Vous avez des changements non sauvegardés. Voulez-vous continuer?"
        );
        if (!confirmMessage) {
          return;
        }
      }
      setEditableRow(id);
    }
  };

  const onModalToggle = (
    event: React.MouseEvent<HTMLDetailsElement, MouseEvent>
  ) => {
    event.preventDefault();
    setModalOpen(!isModalOpened);
  };

  const renderTable = () => {
    const tableData: (Product | Category)[] =
      type === "products" ? products : categories;
    const src = searchValue
      ? tableData.filter((data) =>
          data.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : tableData;
    return (
      <table className="table round-corners">
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
              <td>
                {isRowEditable(data.id) ? (
                  <input type="text" value={data.name} />
                ) : (
                  data.name
                )}
              </td>
              <td>{data.description}</td>
              <td>
                <img
                  src={`data:image/png;base64,${data.image}`}
                  alt={data.name}
                ></img>
              </td>
              {"stock" in data && "price" in data && (
                <>
                  <td>{(data as Product).stock}</td>
                  <td>{(data as Product).price} €</td>
                </>
              )}
              <td>
                <Link
                  to={`/${type === "products" ? "products" : "categories"}/${
                    data.id
                  }`}
                >
                  <FaEye color="blue" />
                </Link>
                {isRowEditable(data.id) ? (
                  <>
                    <FaSave
                      color="green"
                      onClick={() => toggleEditMode(data.id)}
                    />
                  </>
                ) : (
                  <>
                    <FaEdit
                      color="green"
                      onClick={() => toggleEditMode(data.id)}
                    />
                  </>
                )}
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
      <details open={isModalOpened} onClick={onModalToggle}>
        <summary>
          {type === "products" || type === "categories" ? (
            <div className="button">
              <span>
                <FaPlusCircle style={{ marginRight: "5px" }} />
                Ajouter {type === "products" ? "un produit" : "une catégorie"}
              </span>
            </div>
          ) : null}
          <div className="details-modal-overlay"></div>
        </summary>
        <div className="details-modal">
          <div className="details-modal-close">
            <FaTimes />
          </div>
          <div className="details-modal-title">
            <h1 onClick={(e) => e.stopPropagation()}>
              Ajouter {type === "products" ? "un produit" : "une catégorie"}
            </h1>
          </div>
          <div
            className="details-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <FormAddNew type={type} />
          </div>
        </div>
      </details>
      {type === "products" || type === "categories" ? renderTable() : null}
    </div>
  );
};

export default PageContent;

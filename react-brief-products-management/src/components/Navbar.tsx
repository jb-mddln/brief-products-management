import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInputText, setSearchInputText] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInputText(inputText);
    const path = location.pathname;
    const query = inputText !== "" ? `?s=${inputText}` : "";

    navigate(path);

    if (path.includes("/list/products")) {
      navigate(`/list/products${query}`);
    } else if (path.includes("/list/categories")) {
      navigate(`/list/categories${query}`);
    }
  };

  const placeholderText = location.pathname.includes("/list/products")
    ? "Rechercher un produit"
    : location.pathname.includes("/list/categories")
    ? "Rechercher une catégorie"
    : "Rechercher un produit ou une catégorie";

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link onClick={() => setSearchInputText("")} to="/list/products">
            Liste des produits
          </Link>
        </li>
        <li>
          <Link onClick={() => setSearchInputText("")} to="/list/categories">
            Liste des catégories
          </Link>
        </li>
      </ul>
      {(location.pathname.includes("/list/products") ||
        location.pathname.includes("/list/categories")) && (
        <input
          type="text"
          value={searchInputText}
          placeholder={placeholderText}
          style={{ width: `${placeholderText.length}ch` }}
          onChange={handleSearch}
        />
      )}
    </nav>
  );
};

export default Navbar;
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const placeholderText = location.pathname.includes("/list/products")
    ? "Rechercher un produit"
    : location.pathname.includes("/list/categories")
    ? "Rechercher une catégorie"
    : "Recherche un produit ou une catégorie";

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/list/products">Liste des produits</Link>
        </li>
        <li>
          <Link to="/list/categories">Liste des catégories</Link>
        </li>
      </ul>
      <input type="text" placeholder={placeholderText} style={{ width: `${placeholderText.length}ch`}} />
    </nav>
  );
};

export default Navbar;

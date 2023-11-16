-- Utilisation de noms et valeurs explicite pour faciliter la vérification des résultats

--		    --
-- PRODUCTS --
--		    --

INSERT INTO products (Name, Description, Image, Price, Stock) VALUES
('Produit #1', 'Description du produit #1 Catégorie #3', 'image_1.png', 10.99, 13),
('Produit #2', 'Description du produit #2 Catégorie #2', 'image_2.png', 15.99, 18),
('Produit #3', 'Description du produit #3 Catégorie #1', 'image_3.png', 19.99, 0);

--		    --
-- CATEGORIES --
--		    --

INSERT INTO products_categories (Name, Description, Image) VALUES
('Catégorie #1', 'Description de la catégorie #1', 'image_cat_1.png'),
('Catégorie #2', 'Description de la catégorie #2', 'image_cat_2.png'),
('Catégorie #3', 'Description de la catégorie #3', 'image_cat_3.png');

SELECT * FROM products;
SELECT * FROM products_categories;

INSERT INTO products_categories_association (ProductId, CategoryId) VALUES
(1, 1),
(2, 2),
(3, 3);
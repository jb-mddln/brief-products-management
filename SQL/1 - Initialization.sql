-- postgreSQL pgAdmin4
DROP DATABASE IF EXISTS "products_management";

-- Créez une base de données nommée "products_management".
CREATE DATABASE "products_management" ENCODING "UTF8";

-- Réinitialisation auto-incrémentation si tables déjà existante
DO $$
BEGIN
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products') THEN
        SELECT SETVAL(pg_get_serial_sequence('products', 'id'), 1, false);
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products_categories') THEN
        SELECT SETVAL(pg_get_serial_sequence('products_categories', 'id'), 1, false);
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products_promotions') THEN
        SELECT SETVAL(pg_get_serial_sequence('products_promotions', 'id'), 1, false);
    END IF;
    
END $$;

-- Maintenir l'ordre ici afin d'éviter les échecs de suppression dus aux contraintes de clé étrangère (FK)
DROP TABLE IF EXISTS products_categories_association;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS products_categories;

CREATE TABLE products
(
   Id SERIAL PRIMARY KEY,
   Name VARCHAR(50) NOT NULL,
   Description VARCHAR(100),
   Image VARCHAR(50),
   Price DECIMAL(15,2) NOT NULL,
   Stock INT NOT NULL
);

CREATE TABLE products_categories
(
   Id SERIAL PRIMARY KEY,
   Name VARCHAR(50) NOT NULL,
   Description VARCHAR(100),
   Image VARCHAR(50)
);

CREATE TABLE products_categories_association
(
   ProductId INT,
   CategoryId INT,
   PRIMARY KEY(ProductId, CategoryId),
   FOREIGN KEY(ProductId) REFERENCES products(Id),
   FOREIGN KEY(CategoryId) REFERENCES products_categories(Id)
);
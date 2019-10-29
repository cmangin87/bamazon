DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(7) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock_quantity INTEGER(7) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Saved by the Bell Season 6 on DVD', 'Movies & TV', 19.99, 7), 
('101 Dad Jokes', 'Books', 7.95, 200), 
('Mini-Fridge', 'Appliances', 209.98, 103), 
('Lock of George Washington"s Hair', 'Collectibles & Fine Art', 795.95, 1), 
('$50 Olive Garden Gift Card', 'Gift Cards', 50, 750), 
('Calming Thunder Vest', 'Pet Supplies', 29.95, 110), 
('Mandolin (w/ gig bag)', 'Musical Instruments', 89.99, 45), 
('86 Inch Television', 'Electronics', 2149.98, 15), 
('Balexa', 'Bamazon Devices', 79.99, 3500), 
('Plastic Pencil Sharpener', 'Office Products', 3.89, 10);
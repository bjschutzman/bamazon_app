CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department VARCHAR(100) NOT NULL,
price INT(50),
stock_quantity int(100),
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ('gpu', 'computer hardware', 899, 15),
            ('cpu', 'computer hardware', 399, 25 ),
            ('keyboard', 'computer accesories', 120, 30),
            ('windows 10', 'computer software', 99, 80),
            ('nano leaf light panels', 'lighting', 250, 7),
            ('coffe mug', 'kitchen', 9, 300),
            ('monitor', 'tv and monitor', 500, 35),
            ('mouse pad', 'computer accesories', 45, 10),
            ('dog bed', 'pet supplies', 50, 27),
            ('couch', 'furniture', 12, 1200);


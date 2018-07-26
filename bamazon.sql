DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kitchen Rug", "Household_Items",10, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lantern", "Camping",40, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Camping",50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports",70, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Mat", "Fitness",30, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dumbell Set", "Fitness",100, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping Bag", "Camping",40, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Gloves", "Sports",20, 40);

SELECT * FROM products WHERE department_name='Camping'

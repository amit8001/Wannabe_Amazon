DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    product_sales DECIMAL(10 , 2 ) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Kitchen Rug", "Household_Items",10, 40, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Lantern", "Camping",40, 40, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Tent", "Camping",50, 30, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Football", "Sports",70, 50, 1400);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Yoga Mat", "Fitness",30, 60, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Dumbell Set", "Fitness",100, 30, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sleeping Bag", "Camping",40, 50, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Baseball Gloves", "Sports",20, 40, 400);



CREATE TABLE departments (
	-- Unique id for each department --
    department_id INT(11) AUTO_INCREMENT NOT NULL,
    -- Name of department --
	department_name VARCHAR(100) NOT NULL,
    -- Dummy number set for each department --
	overhead_costs VARCHAR(100) NOT NULL,
	PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Household_Items", 500),
("Camping", 2000),
("Sports", 2000),
("Fitness", 2500);

SELECT * FROM products WHERE department_name='Camping';

SELECT * FROM products where stock_quantity < 5;

select * from departments;

select d.department_id, 
d.department_name, 
d.overhead_costs, 
dept_rollup.Product_Sales, 
(dept_rollup.Product_Sales-d.overhead_costs) as total_profit
from departments d inner join 
			(select department_name, sum(product_sales) as Product_Sales 
            from products group by department_name)dept_rollup
            on d.department_name = dept_rollup.department_name
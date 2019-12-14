DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE DATABASE bamazon_db;

CREATE TABLE products (
    id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price INT(20) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);
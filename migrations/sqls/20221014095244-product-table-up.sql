/* Replace with your SQL commands */

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(20) NOT NULL,
    product_quantity INT NOT NULL default 0,
    product_price  DECIMAL(13, 2) NOT NULL
);

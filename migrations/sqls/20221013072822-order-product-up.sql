/* Replace with your SQL commands */
CREATE TABLE order_product (
    order_id  INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    PRIMARY KEY(order_id,product_id),
    foreign key (order_id) references orders(order_id) ON DELETE CASCADE,
    foreign key (product_id) references products(product_id) ON DELETE CASCADE
);
/* Replace with your SQL commands */
CREATE TABLE orders(
    userid INT,
    productid INT, 
    product_quantity INT,
    total_price INT,
    PRIMARY KEY (userid, productid),
    foreign key (userID) references users(user_id) ON DELETE CASCADE,
    foreign key (productID) references products(product_id)ON DELETE CASCADE
);


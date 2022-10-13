/* Replace with your SQL commands */

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(12,2),
    foreign key (user_id) references users(user_id) ON DELETE CASCADE
);

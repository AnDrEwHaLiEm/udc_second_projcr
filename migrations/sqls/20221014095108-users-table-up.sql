/* Replace with your SQL commands */
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    admin_authority VARCHAR(10) NOT NULL CHECK (admin_authority IN('admin', 'client'))
);

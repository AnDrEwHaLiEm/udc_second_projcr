<pre>
server port numbere = 3000
db port number = 5432

Database setup =>{
    CREATE DATABASE udc_second_project;
}

Environment variables =>{
    POSTGRES_HOST
    POSTGRES_DB
    POSTGRES_USER
    POSTGRES_PASSWORD
    PRIVATE_KEY
}



Package installation instructions =>{
    "devDependencies": {
        "@types/bcryptjs": "^2.4.2",
        "@types/cors": "^2.8.12",
        "@types/express": "^4.17.14",
        "@types/jasmine": "^4.3.0",
        "@types/jsonwebtoken": "^8.5.9",
        "@types/node": "^18.7.18",
        "@types/pg": "^8.6.5",
        "@types/supertest": "^2.0.12",
        "@typescript-eslint/eslint-plugin": "^5.40.0",
        "@typescript-eslint/parser": "^5.40.0",
        "eslint": "^8.24.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-prettier": "^4.2.1",
        "nodemon": "^2.0.20",
        "prettier": "^2.7.1",
        "ts-node": "^10.9.1",
        "typescript": "^4.8.3"
    },
    "dependencies": {
        "@types/sharp": "^0.31.0",
        "bcryptjs": "^2.4.3",
        "cors": "^2.8.5",
        "db-migrate": "^0.11.13",
        "db-migrate-pg": "^1.2.2",
        "dotenv": "^16.0.3",
        "express": "^4.18.1",
        "jasmine": "^4.4.0",
        "jasmine-spec-reporter": "^7.0.0",
        "jsonwebtoken": "^8.5.1",
        "pg": "^8.8.0",
        "sharp": "^0.31.0",
        "supertest": "^6.2.4"
    }
}

Setup db and server instructions --> postgres database

Database schema with column name and type =>{
    user{
        user_id SERIAL PRIMARY KEY,
        user_name VARCHAR(50),
        user_password VARCHAR(200),
        user_email VARCHAR(255) UNIQUE,
        admin_authority VARCHAR(10) CHECK (admin_authority IN('admin', 'client'))
    }
    products{
        product_id SERIAL PRIMARY KEY,
        product_name VARCHAR(20),
        product_quantity INT,
        product_price  DECIMAL,
    }
    orders{
         order_id SERIAL PRIMARY KEY,
         user_id INT,
         total_price DECIMAL(12,2),
         foreign key (user_id) references users(user_id) ON DELETE CASCADE
    }
    order_product{
        order_id  INT,
        product_id INT,
        quantity INT,
        price DECIMAL(12,2),
        PRIMARY KEY(order_id,product_id),
        foreign key (order_id) references orders(order_id) ON DELETE CASCADE,
        foreign key (product_id) references products(product_id) ON DELETE CASCADE
    }
}

End Point--->{
    user API
    {
        log in 
        {
            POST/login
            body{
                user_email:string
                password:string 
            } ==> 
            (user_email = admin@admin.com  , password  = admin) 
            OR
            (user_email = an.roooof@gmail.com  , password  = admin) ==> (create Default)
        }
        sign up
        {
            POST/user/signup
            body{
                 user_name: string,
                 admin_authority: string , ==> {client Or admin}
                 user_email: string,
                 user_password: string
            }
        }
    }
    product API
    {
        add new Product
        {
            POST/product/create
            body
            {
                product_name: string,
                product_price: number,
                product_quantity: number,
            }
            header{
                'authorization' : adminToken  ===> adminToken should start with '123=' then token that come to you when log in
            }
        }
        edit exist product
        {
            PUT/product/edit
            body
            {
                product_id: string,
                product_name: string,
                product_price: number,
                product_quantity: number,
            }
            header{
                'authorization' : adminToken  ===> adminToken should start with '123=' then token that come to you when log in
            }
        }
        delete Product{
            DELETE/product/delete/:_id
            header{
                'authorization' : adminToken  ===> adminToken should start with '123=' then token that come to you when log in
            }
        }
        get All {
           GET/product/getAll ==> Any One Can see ALl Product
    
        }
        getOne{
           GET/product/getOne/:_id   ==>Any One can get One Product
        }
    }
    
    Order{
        add new product
        {
            POST/order/add
            body
            { 
                products: [
                    { product_id: number, product_quantity: number },
                ],
            }
            header
            {
                'authorization' : clientToken  ===> clientToken should start with '123=' then token that come to you when log in
                ===> (must be a client not admin)
            }
        }
        get One Order
        {
            GET/order/getOne/:order_id
            header
            {
                'authorization' : clientToken  ===> clientToken should start with '123=' then token that come to you when log in
                ===> (must be a client not admin)
            }
        }
        get All Order for one user
        {
            GET/order/getAll
            header
            {
                'authorization' : clientToken  ===> clientToken should start with '123=' then token that come to you when log in
                ===> (must be a client not admin)
            }
        }

    }
}

</pre>



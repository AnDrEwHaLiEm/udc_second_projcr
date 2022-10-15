<pre>
Database schema with column name and type =>{
    user{
        user_id number,
        user_name string,
        user_password string,
        user_email string,
        admin_authority string enum['admin','client]
    }
    products{
        product_id number,
        product_name string,
        product_quantity number,
        product_price  number
    }
    orders{
         order_id number,
        user_id number,
        total_price number
    }
    order_product{
        order_id  number,
        product_id number,
        quantity number,
        price number,
    }
}

End Point--->{
    user API
    {
        log in 
        {
            POST/login
            request.body{
                user_email:string
                user_password:string 
            } ==> 
            (user_email = admin@admin.com  , password  = admin) 
            OR
            (user_email = an.roooof@gmail.com  , password  = admin) ==> (create Default)
            response{
                token
            }
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
            response{
                user_id,
                user_name,
                admin_authority,
                user_email,
                user_password,
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
            response{
                status = 200
                text = Success
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
            response{
                status = 200
                text = Success
            }
        }
        delete Product{
            DELETE/product/delete/:_id
            header{
                'authorization' : adminToken  ===> adminToken should start with '123=' then token that come to you when log in
            }
            response{
                status = 200
                text = DELETED
            }
        }
        get All {
           GET/product/getAll ==> Any One Can see ALl Product
           response{
            status 200
            result[
                {
                    product_id:string
                    product_name:string
                    product_price:number
                    product_quantity:number
                }
            ]
            }
    
        }
        getOne{
           GET/product/getOne/:_id   ==>Any One can get One Product
        }
        response{
            status 200
            result{
                product_id:string
                product_name:string
                product_price:number
                product_quantity:number
            }
            or
            status = 404
            text = Not Found
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
            response{
                status 200
                text Success
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
            response{
                result {
                    order_id"string
                    total_price:number
                    product_info{
                        product_id:string
                        product_name:string
                        quantity:string
                        price:string
                    }
                }
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
            response{
                result [
                    order_id"string
                    total_price:number
                    product_info{
                        product_id:string
                        product_name:string
                        quantity:string
                        price:string
                    }
                ]
            }
        }

    }
}
</pre>

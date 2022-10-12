<pre>
user API
{
    log in 
    {
        POST ==>  localhost:3000/login
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
        POST ==> localhost:3000//user/signup
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
        POST ==> localhost:3000/product/create
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
        PUT ==> localhost:3000/product/edit
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
        DELETE ==> localhost:3000/product/delete/:_id
        header{
            'authorization' : adminToken  ===> adminToken should start with '123=' then token that come to you when log in
        }
    }
    get All {
       GET ==> localhost:3000/product/getAll ==> Any One Can see ALl Product

    }
    getOne{
       GET ==> localhost:3000/product/getOne/:_id   ==>Any One can get One Product
    }
}

Order{
    add new product
    {
        POST ==> localhost:3000/order/add
        body
        { 
            product_id: string,
            product_quantity: number
        }
        header
        {
            'authorization' : clientToken  ===> clientToken should start with '123=' then token that come to you when log in
            ===> (must be a client not admin)
        }
    }
    get One Order
    {
        GET ==> localhost:3000/order/getOne/:product_id
        header
        {
            'authorization' : clientToken  ===> clientToken should start with '123=' then token that come to you when log in
            ===> (must be a client not admin)
        }
    }
    get All Order for one user
    {
        GET ==> localhost:3000/order/getAll
        header
        {
            'authorization' : clientToken  ===> clientToken should start with '123=' then token that come to you when log in
            ===> (must be a client not admin)
        }
    }

    delete One Order
    {
        DELETE ==> localhost:3000/order/delete/:product_id
        header
        {
            'authorization' : clientToken  ===> clientToken should start with '123=' then token that come to you when log in
            ===> (must be a client not admin)
        }
    }
}

</pre>



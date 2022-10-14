import supertest from 'supertest';
import app from '../';
const request = supertest(app);
let AdminToken = '123=';
let clientToken = '123=';
describe('User Tests', () => {
  it('login with main admin', async () => {
    const req = { user_email: 'admin@admin.com', password: 'admin' };
    const response = await request.post('/login').send(req);
    expect(response.status).toEqual(200);
    AdminToken += response.body.token;
    expect(response.body.token).toBeTruthy();
  });

  it('create new user', async () => {
    const Random = Math.random() * 100;
    const userData = {
      user_name: 'Andrew',
      admin_authority: 'client',
      user_email: `an.roooof${Random}@gmail.com`,
      user_password: 'admin',
    };

    const response = await request.post('/user/signup').send(userData);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Success');
  });

  it('create exist user', async () => {
    const userData = {
      user_name: 'Andrew',
      admin_authority: 'client',
      user_email: 'an.roooof@gmail.com',
      user_password: 'admin',
    };
    const response = await request.post('/user/signup').send(userData);
    expect(response.status).toEqual(409);
    expect(response.text).toEqual('User is Exist');
  });

  it('login with new user', async () => {
    const req = { user_email: 'an.roooof@gmail.com', password: 'admin' };
    const response = await request.post('/login').send(req);
    clientToken += response.body.token;
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  it('login with wrong password', async () => {
    const req = { user_email: 'an.roooof@gmail.com', password: '012456' };
    const response = await request.post('/login').send(req);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Email or password is uncorrect');
  });
});

describe('Product Tests', () => {
  it('Admin Create  product', async () => {
    const productData = {
      product_name: 'Chipsi',
      product_price: 100,
      product_quantity: 100,
    };
    const response = await request
      .post('/product/create')
      .send(productData)
      .set('authorization', AdminToken);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Success');
  });

  it('Client Create  product', async () => {
    const productData = {
      product_name: 'Chipsi',
      product_price: 100,
      product_quantity: 100,
    };
    const response = await request
      .post('/product/create')
      .send(productData)
      .set('authorization', clientToken);
    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Unauthorized');
  });

  it('Admin Edit Product', async () => {
    const productData = {
      product_id: 4,
      product_name: 'Tiger',
      product_price: 100,
      product_quantity: 100,
    };
    const response = await request
      .put('/product/edit')
      .send(productData)
      .set('authorization', AdminToken);
    expect(response.status).toEqual(200);
  });

  it('any One show Products', async () => {
    const response = await request.get('/product/getAll');
    const product = response.body.result[0];
    expect(response.status).toEqual(200);
    expect(response.body.result.length).toEqual(4);
    expect(product.product_id).toEqual(1);
    expect(product.product_name).toEqual('Apple');
    expect(product.product_price).toEqual('10.00');
    expect(product.product_quantity).toEqual(60);
  });

  it('Any One get Exist One Product', async () => {
    const response = await request.get(`/product/getOne/1`);
    const product = response.body.result;
    expect(response.status).toEqual(200);
    expect(product.product_id).toEqual(1);
    expect(product.product_name).toEqual('Apple');
    expect(product.product_price).toEqual('10.00');
    expect(product.product_quantity).toEqual(60);
  });

  it('Any One get Not Exist One Product', async () => {
    const response = await request.get('/product/getOne/-1');
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Not Found');
  });

  it('admin delete Product', async () => {
    const response = await request
      .delete(`/product/delete/4`)
      .set('authorization', AdminToken);
    expect(response.status).toEqual(200);
  });

  it('user delete Product', async () => {
    const response = await request
      .delete(`/product/delete/4`)
      .set('authorization', clientToken);
    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Unauthorized');
  });
});

describe('order Test', () => {
  it('add new Order', async () => {
    const req = {
      products: [
        { product_id: 1, product_quantity: 2 },
        { product_id: 2, product_quantity: 3 },
        { product_id: 3, product_quantity: 4 },
      ],
    };
    const result = await request
      .post('/order/add')
      .send(req)
      .set('authorization', clientToken);
    expect(result.status).toEqual(200);
  });
  it('get one order ', async () => {
    const result = await request
      .get(`/order/getOne/1`)
      .set('authorization', clientToken);
    const order = result.body.result;
    expect(result.status).toEqual(200);
    expect(order.total_price).toEqual('68.00');
    expect(order.product_info[0].product_id).toEqual(1);
    expect(order.product_info[0].product_name).toEqual('Apple');
    expect(order.product_info[0].quantity).toEqual(2);
    expect(order.product_info[0].price).toEqual(20);
  });

  it('get  All order for one user', async () => {
    const result = await request
      .get(`/order/getAll`)
      .set('authorization', clientToken);
    const order = result.body.result;
    expect(result.status).toEqual(200);
    expect(order[0].order_id).toEqual(1);
    expect(order[0].total_price).toEqual('68.00');
    expect(order[0].product_info[0].product_id).toEqual(1);
    expect(order[0].product_info[0].product_name).toEqual('Apple');
    expect(order[0].product_info[0].quantity).toEqual(2);
    expect(order[0].product_info[0].price).toEqual(20);
  });
});

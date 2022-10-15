import supertest from 'supertest';
import app from '..';
import { AdminToken, clientToken } from './indexSpec';
const request = supertest(app);

describe('product Tests', () => {
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
        expect(product.product_quantity).toBeLessThanOrEqual(60);
    });

    it('Any One get Exist One Product', async () => {
        const response = await request.get(`/product/getOne/1`);
        const product = response.body.result;
        expect(response.status).toEqual(200);
        expect(product.product_id).toEqual(1);
        expect(product.product_name).toEqual('Apple');
        expect(product.product_price).toEqual('10.00');
        expect(product.product_quantity).toBeLessThanOrEqual(60);
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
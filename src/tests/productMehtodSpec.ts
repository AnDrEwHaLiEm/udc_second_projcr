import product from '../utilities/Model Method/product';
import { ProductModel } from '../utilities/model/productModel';

describe('product Tests Model', () => {
  it('Create product Model', async () => {
    const productData: ProductModel = {
      product_name: 'Chipsi',
      product_price: 5,
      product_quantity: 100,
    };
    const response = await product.createNewProduct(productData);
    expect(response.product_name).toEqual('Chipsi');
    expect(response.product_price).toBeCloseTo(5.0);
    expect(response.product_quantity).toEqual(100);
  });

  it('Edit Product Model', async () => {
    const productData: ProductModel = {
      product_id: 5,
      product_name: 'Potatos',
      product_price: 6,
      product_quantity: 70,
    };
    const response = await product.edit(productData);
    expect(response.product_name).toEqual('Potatos');
    expect(response.product_price).toBeCloseTo(6.0);
    expect(response.product_quantity).toEqual(70);
  });

  it('get All Products Model', async () => {
    const response = await product.getAll();
    expect(response.length).toEqual(4);
    expect(response[0].product_id).toEqual(1);
    expect(response[0].product_name).toEqual('Apple');
    expect(response[0].product_price).toBeCloseTo(10.0);
    expect(response[0].product_quantity).toBeLessThanOrEqual(60);
  });

  it('get One Product Model', async () => {
    const req: ProductModel = {
      product_id: 1,
    };
    const response = await product.getOne(req);
    expect(response.product_id).toEqual(1);
    expect(response.product_name).toEqual('Apple');
    expect(response.product_price).toBeCloseTo(10.0);
    expect(response.product_quantity).toBeLessThanOrEqual(60);
  });

  it('get Not Exist Product Model', async () => {
    const req: ProductModel = {
      product_id: -1,
    };
    await expectAsync(product.getOne(req)).toBeRejectedWith('Not Found');
  });

  it('delete Product Model', async () => {
    const req: ProductModel = {
      product_id: 5,
    };
    const response = await product.delete(req);
    expect(response).toEqual('Deleted');
  });

  it('Delte Not Exist Product Model', async () => {
    const req: ProductModel = {
      product_id: -1,
    };
    await expectAsync(product.delete(req)).toBeRejectedWith(
      'Error when Delete Product'
    );
  });
});

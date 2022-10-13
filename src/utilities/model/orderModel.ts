interface products {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}
export default interface OrderModel {
  order_id: string;
  total_price: number;
  product_info: [products];
}

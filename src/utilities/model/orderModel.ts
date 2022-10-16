export type productInfo = {
  order_id?: number;
  product_id: number;
  product_name?: string;
  quantity: number;
  price?: number | string;
};

export type OrderModel = {
  order_id?: number;
  user_id?: number;
  total_price?: number;
  product_info?: Array<productInfo>;
};

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY, 
    quantity Integer, 
    product_id  Integer REFERENCES products (id),
    order_id Integer REFERENCES orders (id)
);
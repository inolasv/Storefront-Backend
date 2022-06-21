# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index --> '/products' [GET] 
- Show  --> '/products/:id' [GET]
- Create [token required] -->
- [OPTIONAL] Top 5 most popular products --> '/most-popular-products' [GET]
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] --> '/users' [GET]
- Show [token required] --> '/users/:id' [GET] 
- Create N[token required] -->

#### Orders
- Current Order by user (args: user id)[token required] --> '/orders/users/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] --> 

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Design

### TABLE: users
- id (serial primary key)
- first_name (varchar)
- last_name (varchar)
- password (string)

### TABLE: products
- id (serial primary key)
- name (varchar)
- price (number)

### TABLE: orders
- id (serial primary key)
- user_id (string) (foreign key to users table)
- status (string)

### TABLE: order_products
- id (serial primary key)
- quantity (number)
- product_id (string) (foreign key to products table)
- order_id (string) (foreign key to orders table)

node node_modules/db-migrate/bin/db-migrate
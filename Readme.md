# Inventory Management API

Inventory Management API implemented using Node.js and Express. The API allows for adding, removing items from inventory, adding items to a customer's cart, and applying discount coupons.

## Installation
    ```sh
    npm install express body-parser
    ```
    Run above to download all dependencies.

## Running the Server

To start the server, run:

```sh
node server.js
```

The server will start on port 8080.

# API Endpoints

# 1. Add Item to Inventory

- **URL**: `/inventory/add`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Description**: Adds the specified quantity of the item to the inventory.

# 2. Remove Item from Inventory

- **URL**: `/inventory/remove`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Description**: Removes the specified quantity of the item from the inventory.

# 3. Add Item to Cart

- **URL**: `/cart/add`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "customerId": "string",
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Description**: Adds the specified quantity of the item to the customers cart.

# 4. Apply Discount Coupon

- **URL**: `/cart/discount`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "cartValue": "number",
    "discountId": "string"
  }
  ```
- **Description**: Applies the specified discount coupon to the cart value and returns the discounted price.

# Hard-Coded Discount Coupons

The following discount coupons are available:

- `DEVDYNAMIC`: 25% discount, maximum discount cap of 250 Rs.
- `DHIRAJ`: 20% discount, maximum discount cap of 150 Rs.
- `BACKEND`: 7% discount, maximum discount cap of 90 Rs.
- `EXPRESS`: 10% discount, maximum discount cap of 100 Rs.

# Example Usage

### Adding an Item to Inventory

```sh
curl -X POST http://localhost:8080/inventory/add -H "Content-Type: application/json" -d '{"productId":"123", "quantity":10}'
```

### Removing an Item from Inventory

```sh
curl -X POST http://localhost:8080/inventory/remove -H "Content-Type: application/json" -d '{"productId":"123", "quantity":5}'
```

### Adding an Item to Cart

```sh
curl -X POST http://localhost:8080/cart/add -H "Content-Type: application/json" -d '{"customerId":"cust1", "productId":"123", "quantity":2}'
```

### Applying a Discount Coupon

```sh
curl -X POST http://localhost:8080/cart/discount -H "Content-Type: application/json" -d '{"cartValue":1000, "discountId":"DEVDYNAMIC"}'
```

# SMALL PROJECT BY DHIRAJ JAGTAP
    
# [GITHUB](https://github.com/dhirajdj30)
# [LINKEDN](https://www.linkedin.com/in/dhiraj-jagtap-297a7322b/)
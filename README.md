# Car Store App

Welcome to my Car store app a robust, scalable and feature-rich API for managing car order management, checking and monitoring car store stock and more. built with node.js, express.js, mongodb. It will help you to take customer order processing get immidiate error response on client if any occured by client side and many more.

## Features 

### Car management
You can do crud application for a car management like (add, update, delete, get, get result by a search term etc.)

manage the car inventory with details such as
  - Brand
  - Model
  - Year
  - Price
  - Category 
  - Description
  - Quantity and Stock Availability

### Order Management
for order management you can place orders for cars by specifying:
  - Email
  - Car ID (selected from the inventory)
  - Quantity
  - Total Price

Also you can get all the calculated revenue. 

### Error Handling
you can get a consistant error response with a details of each errors.

## Getting Started
Follow these instructions to set up the project locally.

### Prerequisites
Make sure you have the following installed:

 - node.js (v22.11.0)
 - mongoose
 - express
 - dotenv
 - cors
 - zod

use a package manager such as (npm, yarn)

also use "typescript" for devDependencies. 

here is the all dependency lists with versions

"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "mongoose": "^8.8.1",
    "zod": "^3.23.8"
  },

### Installation guide

Here is github repositories link : https://github.com/Ridwan-Suhel/car-store-api
please use: git clone https://github.com/Ridwan-Suhel/car-store-api.git

then install npm: npm install

Setup .env file in locally  

DATABASE_URL=""  
PORT=5000

use "npm run start" to run the server
use "npm run lint" to check for any issues

## API Endpoints

 - Create a car
   - use : http://localhost:5000/api/cars
 - get all cars
   - use : http://localhost:5000/api/cars
 - get single car
   - use : http://localhost:5000/api/cars/123 (use car id)
 - update single car
   - use : http://localhost:5000/api/cars/123 (use car id)
 - delete single car
   - use : http://localhost:5000/api/cars/123 (use car id)
 - get cars by search term (expacting values: categories, model, brand)
   - use http://localhost:5000/api/cars?searchTerm=BMW (your search term after "=")

 - For ordering a car
   - use http://localhost:5000/api/orders
 - get calculated order revenue 
   - use http://localhost:5000/api/orders/revenue

## more details demo data for api endpoints 

1. Create a Car
 Endpoint: /api/cars  
 Method: POST    
 Request Body:
```json
{
  "brand": "Toyota",
  "model": "Camry",
  "year": 2024,
  "price": 25000,
  "category": "Sedan",
  "description": "A reliable family sedan with modern features.",
  "quantity": 50,
  "inStock": true
}
```

2. Get All Cars
Endpoint: /api/cars  
Method: GET  
Response: A list of all cars with details like brand, model, price, category, etc.  
Query: A list of all cars from the same category, you’ll take this as /api/cars?searchTerm=category searchTerm can be brand, model, category  

3. Get a Specific Car  
Endpoint: /api/cars/:carId  
Method: GET  
Response: The details of a specific car by ID.  


4. Update a Car
Endpoint: /api/cars/:carId
Method: PUT
Request Body: (Car details to update)

```json
{
  "price": 27000,
  "quantity": 30
}
```
5. Delete a Car  
Endpoint: /api/cars/:carId  
Method: DELETE  
Response: Success message confirming the car has been deleted.  

6. Order a Car  
Endpoint: /api/orders  
Method: POST  

Request Body:
```json
{
  "email": "customer@example.com",
  "car": "648a45e5f0123c45678d9012", your car id
  "quantity": 1,
  "totalPrice": 27000
}
```

7. Calculate Revenue from Orders  
Endpoint: /api/orders/revenue  
Method: GET  

### Built with 💗

 - Node.js - JavaScript runtime
 - Express.js - Web framework for Node.js
 - MongoDB - NoSQL database
 - Mongoose - MongoDB object modeling for Node.js
 - Typescript - JavaScript with syntax for types
 - Zod - TypeScript-first schema validation with static type inference

### About Me 🙋‍♂️
Hi! My name is **Ridwan Suhel**. I'm a passionate developer who loves creating efficient and user-friendly solutions. This project reflects my skills in backend development and API design.

### Links 🔗
- **GitHub Repository**: [Car Store App Github Repo](https://github.com/Ridwan-Suhel/car-store-api)
- **Live API**: [Car Store API on Vercel](https://car-store-api.vercel.app)

Feel free to explore the API
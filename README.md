# ShopSphere

## Project Overview
ShopSphere is a full-stack e-commerce web application built with a Node.js and Express backend, MongoDB database, and a React + TypeScript frontend styled with Tailwind CSS. It provides user authentication, product management, and a responsive shopping interface.

## Technology Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion
- **Other:** dotenv for environment variables, body-parser, cors

## Backend Setup

### Prerequisites
- Node.js and npm installed
- MongoDB database (local or cloud like MongoDB Atlas)
- Create a `.env` file in the `Backend` directory with the following variable:
  ```
  MONGODB_URI=your_mongodb_connection_string
  ```

### Installation
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the backend
Start the backend server with Nodemon:
```bash
npm start
```
The server will run at [http://localhost:5000](http://localhost:5000)

---

## Frontend Setup

### Prerequisites
- Node.js and npm installed

### Installation
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the frontend
Start the development server:
```bash
npm run dev
```
The frontend will be accessible at [http://localhost:5173](http://localhost:5173) (or the port Vite assigns)

---

## Backend API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product by ID
- `DELETE /api/products/:id` - Delete a product by ID

### User Authentication
- `POST /api/login` - User login with email and password

### Users
- `GET /api/users` - Get all users (for testing purposes)

### Contact
- `POST /api/contact` - Send a contact message (currently a stub)

---

## Frontend Overview

The frontend is built with React and TypeScript, using Tailwind CSS for styling and Vite as the build tool. Key components/pages include:

- `Shop.tsx` - Main shopping page displaying products
- `Login.tsx` - User login page
- `Signup.tsx` - User registration page
- `AdminDashboard.tsx` - Admin control panel
- `Categories.tsx` - Product categories listing
- `About.tsx` - About us page
- `Contact.tsx` - Contact form page
- `Deals.tsx` - Deals and promotions page
- `ShopFooter.tsx` - Footer component

---

## Contributing

Contributions are welcome! Feel free to fork the repository and create pull requests.

---

## License

This project is licensed under the ISC License.

---

## Contact

For any questions or support, please contact the project maintainer.

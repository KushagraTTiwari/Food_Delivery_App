# Food Delivery App

## Overview
The **Food Delivery App** is a full-stack application designed to provide users with a seamless food ordering experience. Users can sign up, log in, and add items to their cart. The application ensures secure access using JWT (JSON Web Token) for authentication.

## Features
- **Signup and Login**: New users can sign up, and existing users can log in.
- **Cart Management**: Users can add items to their cart and remove them as needed.
- **Authentication**: Users must log in to add items to the cart.
- **Security**: JWT is implemented to ensure secure user sessions.

## Technology Stack
The application is built using the following technologies:

### Frontend
- **React.js**: For building the user interface.

### Backend
- **Node.js**: For server-side programming.
- **Express.js**: For handling API requests.

### Database
- **MongoDB**: For data storage.

### Security
- **JWT (JSON Web Token)**: For secure user authentication.

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/KushagraTTiwari/Food_Delivery_App.git
   ```

2. Navigate to the project directory:
   ```bash
   cd food_delivery_app
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd ./Frontend
   npm install
   cd ./backend
   npm install
   ```


4. Start the MongoDB server:
   ```bash
   mongod
   ```

5. Start the application:
   - For the backend:
     ```bash
     cd ./backend
     node index.js
     ```
   - For the frontend:
     ```bash
     cd ./Frontend
     npm start
     ```

7. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## How to Use
1. **Sign Up**: Create a new account on the signup page.
2. **Log In**: Log in with your credentials to access the app.
3. **Add to Cart**: Browse food items and add them to your cart.
4. **Remove from Cart**: Remove any item from the cart if needed.


## Contact
For any inquiries, reach out at: kushagratiwari811@gmail.com


# MSMS - Mobile Shop Management System

## Overview

MSMS CNWEB (Mobile Shop Management System) is a web-based platform designed to manage the buying and selling of mobile phones. The system provides various features to facilitate user registration, shopping cart management, order processing, and payment handling.

## Features

-   **Customer Registration & Management**: Users can register and manage their profiles.
-   **Shopping Cart Management**: Customers can add, update, and remove products from their cart.
-   **Order Placement & Processing**: Customers can place orders, and administrators can manage order statuses.
-   **Payment Management**: Integrated payment system for secure transactions.
-   **Product Management**: Admins can add, edit, and remove products.

## Technologies Used

-   **Frontend**: React (with Vite), Tailwind CSS
-   **Backend**: Express
-   **Database**: MongoDB
-   **Authentication**: JWT, Bcrypt
-   **Deployment**:

## Installation & Setup

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/yourusername/msms-cnweb.git
    cd msms-cnweb
    ```

2. **Backend Setup**:

    - Navigate to the backend folder:
        ```sh
        cd backend
        ```
    - Install dependencies:
        ```sh
        dotnet restore
        ```
    - Run the backend server:
        ```sh
        dotnet run
        ```

3. **Frontend Setup**:

    - Navigate to the frontend folder:
        ```sh
        cd frontend
        ```
    - Install dependencies:
        ```sh
        npm install
        ```
    - Start the development server:
        ```sh
        npm run dev
        ```

4. **Database Setup**:
    - Ensure you have SQL Server or PostgreSQL running.
    - Update the connection string in `appsettings.json`.
    - Run database migrations:
        ```sh
        dotnet ef database update
        ```

## Usage

-   Login as an admin to manage products and orders.
-   Customers can browse, add to cart, and complete purchases.

## License

This project is licensed under the MIT License.

## Bug

1. Chua right update when click button in seller order
2. Cancelled badge wrong color
3. Cart controller have many problems
4. Want to have sign up & log in with google

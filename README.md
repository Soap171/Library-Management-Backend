# MERN Stack Backend Project

## Overview

This is a comprehensive backend project developed using  (MongoDB, Node.js, Express Js and JWT). The project focuses on managing user roles, book reservations, and CRUD operations.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Features

### User Roles

#### Admin
- View reservations for each book
- Perform CRUD operations on books
- Search books
- Lend books to users based on reservations
- Manage book returns

#### Member
- Sign up and log in with Google
- Register and sign in
- Update profile
- Search books by category
- Make reservations for books

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo.git
    ```

2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    ```

5. Start the server:
    cd into the server folder and,
    npm run dev
    

## Usage

- Use Postman or any other API client to interact with the backend endpoints.
- Admin and member functionalities are differentiated by their roles.

## Contributing

Feel free to fork this repository and contribute by submitting a pull request. Any contributions are highly appreciated!

## License

This project is licensed under the MIT License.

---

Feel free to replace the placeholders with your actual information, such as the repository link and any specific details about your project.

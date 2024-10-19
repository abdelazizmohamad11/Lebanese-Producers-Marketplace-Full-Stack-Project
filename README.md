# Lebanese Producers Marketplace

This platform connects local Lebanese producers, artisans, and farmers to consumers, enabling them to showcase and sell high-quality products directly. Built with **React.js** for the frontend, **Node.js** for the backend, and **MySQL** as the database, this project demonstrates advanced full-stack development skills and a user-friendly interface.

## Project Overview
- Created by: Abdelaziz Mohamad
- Date of Completion: Feb 2024
- Project Type: Full-Stack Web Application (React.js, Node.js, MySQL)

## Features
- **Public Browsing**: Users can view products and producers on the platform without logging in.
- **User Authentication**: Fully secure authentication using JWT (JSON Web Tokens) is implemented to ensure data security and user privacy.
- **Logged-In Features**: Users must log in to send messages to producers, contact them, rate products, or make use of advanced features.
- **Role Flexibility**: Consumers can promote themselves to producers at any time, allowing them to start listing their own products.
- **Profile Management**: Users can edit their profiles, upload images, and update personal details such as names and contact information.
- **Product Management for Producers**: Producers have the ability to add, edit, or delete their products from the platform, ensuring flexibility in managing their inventory.
- **Full Functional Search**: Users can easily search for producers and products using a search bar that provides efficient access to the platform’s listings.
- **Advanced Filtering Options**: Users can filter search results based on product origin, type, business category, and location to refine their searches and find exactly what they’re looking for.
- **Direct Communication with Platform Owners**: Users can contact the platform's owners via email for any concerns or feedback, whether it's an issue with a producer or other platform-related matters.
- **Scalability**: The platform is built to handle a growing number of users and products efficiently.
...and more.
## How to Start the App

To get the project up and running locally, follow these steps:

### Prerequisites
1. **MySQL** should be installed on your machine.
2. **Node.js** and **npm** (Node Package Manager) should be installed.
3. **Visual Studio Code** or any preferred code editor.

### Setup Instructions

1. **Download the Project:**
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/Lebanese-Producers-Marketplace.git

2. Import the MySQL Database:
   Navigate to the Database folder in the project.
   Import the SQL files to your MySQL server to set up the necessary tables and data:
   ```bash
    mysql -u username -p < Database/schema.sql
   
3. Set up the Backend:
   Open a terminal and navigate to the backend folder:
   ```bash
    cd backend
    npm install
    npm run
This will start the backend server.

4. Set up the Frontend:
Open another terminal and navigate to the client folder:
    ```bash
    cd client
    npm install
    npm start
The frontend React application will now be running at http://localhost:3000.

## Screenshots
You can find screenshots of the platform's main features and user flow in the screenshots folder. This will help you get a visual overview of the project.

## Future Improvements
-In-Platform Purchase System: Future plans include implementing an integrated payment system, allowing users to complete purchases directly within the platform, rather than simply getting in touch with producers.

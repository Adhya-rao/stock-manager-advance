The Stock Manager Advance project is a comprehensive system for managing inventory and invoices, designed with a clear separation between the front-end and back-end functionalities. The front-end resides in the views folder and consists of multiple EJS files that render dynamic HTML pages. The home.ejs serves as the central hub after user login, displaying a welcoming interface with links to "Inventory Management" (/inventory) and "Invoice Management" (/create-invoice). It utilizes Bootstrap 4.5.2 for responsiveness and an external style.css for additional styling, which is located in the public folder.
The login.ejs and signup.ejs pages are designed for user authentication. The login.ejs includes a form with fields for username and password, as well as a link to redirect users to the signup page. In the future, this page will feature "Forgot Password" and "Reset Password" functionalities along with notification messages for errors like "Wrong Password" or "User Not Found." Similarly, signup.ejs facilitates new user registration with a straightforward form. Both pages share consistent styling for forms, buttons, and headings through the style.css file.
The inventory.ejs page allows users to view and manage the inventory. It displays product details such as category and price, and supports CRUD operations (Create, Read, Update, and Delete). The database is integrated to reflect real-time changes made by users, such as adding or deleting products. The create-invoice.ejs page provides an interface for generating invoices, equipped with fields for necessary details like product information and quantity. Both these pages aim to streamline the inventory and invoice management workflows.
The back-end logic is implemented in the src folder. The index.js file handles server setup and routing for all major functionalities, including user authentication, inventory display, and invoice creation. It uses Node.js and Express.js for server-side operations, along with Mongoose to connect to the MongoDB database. A user database is configured in the config.js file to store user authentication details, and additional configurations are being planned to create a dedicated inventory database, ensuring data segregation. Passwords are securely hashed using bcrypt with salting, ensuring robust user security.
Routing is designed for smooth navigation between pages, with basic error handling and debugging logs to catch issues during development. The back-end integrates with the EJS views to dynamically fetch and render data. For instance, upon logging in, users are redirected to the home.ejs page, and from there, they can access the inventory.ejs or create-invoice.ejs functionalities. The project is built to ensure user-friendliness and security, with additional planned features like enhanced notifications for login/signup status and refined inventory database management.
This setup creates a well-rounded system that efficiently handles inventory and invoice management while maintaining a clean and modular codebase.
Front-End
The front-end of your project is implemented using EJS templates stored in the views folder. These templates dynamically generate HTML pages with user-specific data. The main pages include:

home.ejs: Serves as the dashboard after login, providing links to "Inventory Management" and "Invoice Management." It is styled with Bootstrap 4.5.2 for responsiveness and a custom CSS file (style.css) for additional layout and design enhancements.
login.ejs: Displays a login form with fields for username and password. It includes a link to the signup page for new users. Future improvements include adding "Forgot Password" and "Reset Password" options along with real-time error notifications for invalid credentials.
signup.ejs: Provides a simple registration form for new users. Like login.ejs, it uses the shared style.css for consistent form design.
inventory.ejs: Displays inventory details such as product categories, prices, and stock levels. It supports CRUD operations (add, update, delete products), with seamless integration to the back-end for real-time updates.
create-invoice.ejs: Facilitates invoice creation with fields for product details, quantities, and pricing, designed to simplify the billing process.
All these views share styling through the style.css file located in the public folder. The CSS includes form styling, responsive layouts, and button designs for an intuitive user interface.

Back-End
The back-end of your project is powered by Node.js and Express.js, with routing logic defined in the index.js file under the src folder. Key functionalities include:

Authentication: Secure login and signup routes implemented using bcrypt for password hashing. The system ensures unique usernames and encrypted password storage.
Inventory Management: Routes to fetch and update inventory data, enabling operations like viewing, adding, or deleting products.
Invoice Generation: Routes for processing and storing invoice data.
Server Configuration: The server listens on port 8080 and handles HTTP requests efficiently. Error handling and console logs are implemented for debugging.
The back-end interacts with the front-end through EJS templates, dynamically fetching and displaying data.

Database
The project uses MongoDB as the database, connected via Mongoose for seamless interaction. The current setup involves:

user Database: Stores user authentication data (username and hashed passwords).
Planned extension for a dedicated inventory database to store inventory-related data separately, ensuring modularity and better organization.
In summary, the front-end handles user interactions and provides a visually appealing interface; the back-end processes logic, manages routing, and integrates with the database; and the database ensures secure storage and retrieval of user and inventory data. Together, these components create a powerful system for managing stock and invoices.







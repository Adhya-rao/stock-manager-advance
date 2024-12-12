const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const { check, validationResult } = require('express-validator');
const { User, Product, Customer } = require('./config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/login', (req, res) => {
    res.render('login');  // Make sure this matches the file name (login.ejs)
});


// Login User
// Signup User
// Signup User
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ name: username });

        if (existingUser) {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f4f4f9;
                        }
                        .message {
                            font-size: 24px;
                            font-weight: bold;
                            text-align: center;
                            color: red;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">User already exists. Please choose a different username.</div>
                </body>
                </html>
            `);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name: username, password: hashedPassword });

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f4f4f9;
                    }
                    .message {
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                        color: green;
                    }
                </style>
            </head>
            <body>
                <div class="message">User registered successfully.</div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
});

// Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ name: username });
        if (!user) {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f4f4f9;
                        }
                        .message {
                            font-size: 24px;
                            font-weight: bold;
                            text-align: center;
                            color: red;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">Username not found.</div>
                </body>
                </html>
            `);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f4f4f9;
                        }
                        .message {
                            font-size: 24px;
                            font-weight: bold;
                            text-align: center;
                            color: green;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">Login successful! Redirecting to home...</div>
                    <script>
                        setTimeout(() => {
                            window.location.href = "/home";
                        }, 2000);
                    </script>
                </body>
                </html>
            `);
        } else {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f4f4f9;
                        }
                        .message {
                            font-size: 24px;
                            font-weight: bold;
                            text-align: center;
                            color: red;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">Wrong password.</div>
                </body>
                </html>
            `);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
});





// Home Page
app.get('/about-us', (req, res) => {
    res.render('about-us');  // renders about-us.ejs
});

// Contact Us route
app.get('/contact-us', (req, res) => {
    res.render('contact-us');  // renders contact-us.ejs
});

// Dashboard with product and customer data
app.get('/dashboard', async (req, res) => {
    try {
        const products = await Product.find();
        const customers = await Customer.find();
        res.render('dashboard', { products, customers });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Failed to load dashboard.");
    }
});

// CRUD operations for products
app.post('/add-product', async (req, res) => {
    const {
        name,
        category,
        price,
        discount,
        location,
        stock,
        description,
        supplier,
        sku,
        warranty
    } = req.body;

    // Calculate finalPrice on the server based on price and discount
    const finalPrice = price - (price * (discount / 100));

    try {
        const product = await Product.create({
            name,
            category,
            price,
            discount,
            finalPrice,  // Calculated on server
            location,
            stock,
            description,
            supplier,
            sku,
            warranty
        });
        console.log("Product added successfully:", product);
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).send("Failed to add product.");
    }
});
app.use(express.static('public'));



app.post('/update-product/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name,
        category,
        price,
        discount,
        finalPrice,
        stock,
        description,
        supplier,
        sku,
        warranty
    } = req.body;

    const validPrice = !isNaN(price) && price > 0 ? parseFloat(price) : 0;
    const validDiscount = !isNaN(discount) && discount >= 0 && discount <= 100 ? parseFloat(discount) : 0;
    const validFinalPrice = finalPrice && !isNaN(finalPrice) ? parseFloat(finalPrice) : (validPrice - (validPrice * (validDiscount / 100)));

    try {
        await Product.findByIdAndUpdate(id, {
            name,
            category,
            price: validPrice,
            discount: validDiscount,
            finalPrice: validFinalPrice,
            stock,
            description,
            supplier,
            sku,
            warranty
        });
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Failed to update product.");
    }
});






app.post('/delete-product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Failed to delete product.");
    }
});

// CRUD operations for customers
app.post('/add-customer', async (req, res) => {
    const {
        name,
        email,
        phone,
        address,
        itemPurchased,
        paymentDue,
        paymentStatus,
        paymentMethod,
        loyaltyPoints,
        additionalNotes,
        purchaseDate,
        paymentPaid,
        quantity
    } = req.body;

    // Log request data to help debug
    console.log(req.body);

    // Validate required fields
    if (!itemPurchased || itemPurchased.trim() === '') {
        return res.status(400).send("Item Purchased is required.");
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).send("Valid quantity is required.");
    }

    try {
        // Add the customer to the database
        const customer = await Customer.create({
            name,
            email,
            phone,
            address,
            itemPurchased,
            paymentDue,
            paymentStatus,
            paymentMethod,
            loyaltyPoints,
            additionalNotes,
            purchaseDate,
            paymentPaid,
            quantity
        });

        console.log("Customer added successfully:", customer);

        // Update the product's stock
        const productName = itemPurchased.trim(); // Remove extra spaces
        const purchasedQuantity = parseInt(quantity);

        const product = await Product.findOne({ name: productName });
        if (product) {
            product.stock -= purchasedQuantity; // Deduct purchased quantity
            if (product.stock < 0) {
                product.stock = 0; // Prevent negative stock
            }
            await product.save();
            console.log(`Stock updated for product: ${product.name}`);
        } else {
            console.error(`Product not found: ${productName}`);
        }

        // Redirect to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error adding customer:", error.message);
        res.status(500).send("Failed to add customer.");
    }
});


app.post('/update-customer/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Updating customer with ID:', id); // Log the ID to check if it’s correct
    const { name, email, phone, address, itemPurchased, paymentDue, paymentPaid, paymentMethod, purchaseDate, notes } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            address,
            itemPurchased,
            paymentDue,
            paymentPaid,
            paymentMethod,
            purchaseDate,
            notes
        }, { new: true });

        if (!updatedCustomer) {
            console.log('Customer not found');
            return res.status(404).send('Customer not found');
        }

        console.log('Customer updated:', updatedCustomer);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating customer');
    }
});






app.post('/delete-customer/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Customer.findByIdAndDelete(id);
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).send("Failed to delete customer.");
    }
});

// Logout
app.get('/logout', (req, res) => {
    // Clear session data (if using session)
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/home'); // Redirect to home in case of error
        }

        // Redirect to the home page (home.ejs)
        res.redirect('/home');
    });
});

// Route to serve the home page (home.ejs)
app.get('/home', (req, res) => {
    res.render('home'); // Ensure home.ejs exists in the views folder
});


// Port Setup
const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

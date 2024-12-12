const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Login-tut")
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection error:", error.message));

// User Schema and Model
const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("users", LoginSchema);

// Product Schema and Model
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    supplier: { type: String, required: true },
    sku: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true }
});
const Product = mongoose.model("products", ProductSchema);

// Customer Schema and Model
const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    itemPurchased: { type: String, required: true },
    paymentDue: { type: Number, required: true },
    paymentPaid: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    quantity: { type: Number, required: true }
});
const Customer = mongoose.model("customers", CustomerSchema);

module.exports = { User, Product, Customer };

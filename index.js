const express = require("express");
const app = express();

app.use(express.json());

// const cors = require("cors");

const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 799,
        stock: 25,
        rating: 4.3
    },
    {
        id: 2,
        name: "Running Shoes",
        category: "Footwear",
        price: 2499,
        stock: 40,
        rating: 4.5
    },
    {
        id: 3,
        name: "Laptop Stand",
        category: "Accessories",
        price: 999,
        stock: 30,
        rating: 4.2
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 4999,
        stock: 12,
        rating: 4.4
    },
    {
        id: 5,
        name: "Backpack",
        category: "Fashion",
        price: 1599,
        stock: 50,
        rating: 4.1
    }
];

app.get("/", (req, res) => {
    res.send("server RUN");
});
// app.use(express());
// app.use(cors);

app.get("/products", (req, res) => {//All products
    res.status(200).json(products);
})

app.get("/products/:id", (req, res) => {
    const userId = Number(req.params.id);

    const user = products.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(user);
})

app.get("/products/category/:categoryName", (req, res) => {
    const cat = req.params.categoryName;

    const user = products.find(u => u.category === cat);

    if (!user) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(user);
})


app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        category: req.body.category,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        rating: Number(req.body.rating)
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
});

app.put("/products/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = products.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    products[index] = {
        id: userId,
        name: req.body.name,
        category: req.body.category,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        rating: Number(req.body.rating)
    };

    res.status(200).json({
        message: "User replaced",
        user: products[index]
    });
});

app.put("/products/:id/stock", (req, res) => {
    const userId = Number(req.params.id);
    const index = products.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    products[index].stock = Number(req.body.stock);

    res.status(200).json({
        message: "User replaced",
        user: products[index]
    });
});

app.put("/products/:id/price", (req, res) => {
    const userId = Number(req.params.id);
    const index = products.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    products[index].price = Number(req.body.price);
        

    res.status(200).json({
        message: "User replaced",
        user: products[index]
    });
});

app.listen(3000, () => {
    console.log("SERVER started buddy!");
})
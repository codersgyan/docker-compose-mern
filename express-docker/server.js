const express = require('express');
const PORT = process.env.PORT || 5500;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://root:secret@mongo:27017/products?authSource=admin');
const Product = mongoose.model('Product', { name: String, price: Number });
app.get('/', (req, res) => {
    return res.send('Welcome to Node js, express js in Docker');
});

app.post('/api/products', async (req, res) => {
    const product = new Product({ name: req.body.name, price: req.body.price });
    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
});

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    return res.json(products);
});

app.delete('/api/products/:id', async (req, res) => {
    const product = await Product.deleteOne({ id: req.params.id });
    return res.json(product);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

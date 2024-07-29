const express = require('express');
const router = express.Router();

let products = [];

router.post('/', (req, res) => {
    const product = req.body;
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    res.status(201).json(product);
});

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

router.put('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Product not found');

    products[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(products[index]);
});

router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Product not found');

    products.splice(index, 1);
    res.status(204).send();
});

module.exports = router;
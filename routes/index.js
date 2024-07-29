const express = require('express');
const app = express();
const productsRouter = require('../Models/products');

app.use(express.json());
app.use('/products', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

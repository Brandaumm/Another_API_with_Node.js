const request = require('supertest');
const app = require('../routes/index');

let productId;

describe('Products API', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .send({ name: 'Product 1', price: 10.0 });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Product 1');
        expect(res.body.price).toBe(10.0);

        productId = res.body.id; // Armazena o ID para testes posteriores
    });

    it('should list all products', async () => {
        const res = await request(app).get('/products');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a product by ID', async () => {
        const res = await request(app).get(`/products/${productId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', productId);
    });

    it('should update a product by ID', async () => {
        const res = await request(app)
            .put(`/products/${productId}`)
            .send({ name: 'Updated Product', price: 20.0 });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Product');
        expect(res.body.price).toBe(20.0);
    });

    it('should delete a product by ID', async () => {
        const res = await request(app).delete(`/products/${productId}`);

        expect(res.statusCode).toBe(204);

        const resAfterDelete = await request(app).get(`/products/${productId}`);
        expect(resAfterDelete.statusCode).toBe(404);
    });
});

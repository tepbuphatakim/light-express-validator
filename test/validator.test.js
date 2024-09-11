const express = require('express');
const request = require('supertest');
const { validate } = require('../lib/validator');

describe('validator', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  test('should fail required validation', async () => {
    app.post(
      '/test',
      validate({
        name: 'required',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ name: '' });
    expect(response.status).toBe(400);
    expect(response.body.fields.name).toBe('The name field is required.');
  });

  test('should pass required validation', async () => {
    app.post(
      '/test',
      validate({
        name: 'required',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ name: 0 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should fail minimum validation', async () => {
    app.post(
      '/test',
      validate({
        password: 'required|min:8',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app)
      .post('/test')
      .send({ password: '1234567' });
    expect(response.status).toBe(400);
    expect(response.body.fields.password).toBe(
      'The password field must be at least 8 characters.'
    );
  });

  test('should pass minimum validation', async () => {
    app.post(
      '/test',
      validate({
        password: 'required|min:8',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app)
      .post('/test')
      .send({ password: '12345678' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should fail maximum validation', async () => {
    app.post(
      '/test',
      validate({
        name: 'required|max:10',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app)
      .post('/test')
      .send({ name: '12345678900' });
    expect(response.status).toBe(400);
    expect(response.body.fields.name).toBe(
      'The name field must be at most 10 characters.'
    );
  });

  test('should pass maximum validation', async () => {
    app.post(
      '/test',
      validate({
        name: 'required|max:10',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app)
      .post('/test')
      .send({ name: '1234567890' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should fail numeric validation', async () => {
    app.post(
      '/test',
      validate({
        amount: 'numeric',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ amount: '1,1' });
    expect(response.status).toBe(400);
    expect(response.body.fields.amount).toBe(
      'The amount field must be a number.'
    );
  });

  test('should pass numeric validation', async () => {
    app.post(
      '/test',
      validate({
        amount: 'numeric',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ amount: 1.1 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should fail decimal validation', async () => {
    app.post(
      '/test',
      validate({
        amount: 'decimal:2',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ amount: 1.233 });
    expect(response.status).toBe(400);
    expect(response.body.fields.amount).toBe(
      'The amount field must have 2 decimal places.'
    );
  });

  test('should pass decimal validation', async () => {
    app.post(
      '/test',
      validate({
        amount: 'decimal:2',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ amount: 1.12 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });
});

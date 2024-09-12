const express = require('express');
const request = require('supertest');
const validate = require('../index');

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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
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
      (_, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ amount: 1.12 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should fail boolean validation', async () => {
    app.post(
      '/test',
      validate({
        is_vote: 'required|boolean',
      }),
      (_, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ is_vote: 1 });
    expect(response.status).toBe(400);
    expect(response.body.fields.is_vote).toBe(
      'The is_vote field must be true or false.'
    );
  });

  test('should pass boolean validation', async () => {
    app.post(
      '/test',
      validate({
        is_vote: 'required|boolean',
      }),
      (_, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ is_vote: false });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should fail date validation', async () => {
    app.post(
      '/test',
      validate({
        date: 'date',
      }),
      (_, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app)
      .post('/test')
      .send({ date: '2023-13-45' });
    expect(response.status).toBe(400);
    expect(response.body.fields.date).toBe(
      'The date field must be a valid date.'
    );
  });

  test('should pass date validation', async () => {
    app.post(
      '/test',
      validate({
        date: 'date',
      }),
      (_, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app)
      .post('/test')
      .send({ date: new Date() });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should fail integer validation', async () => {
    app.post(
      '/test',
      validate({
        count: 'integer',
      }),
      (_, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ count: 2.2 });
    expect(response.status).toBe(400);
    expect(response.body.fields.count).toBe(
      'The count field must be an integer.'
    );
  });

  test('should pass integer validation', async () => {
    app.post(
      '/test',
      validate({
        count: 'integer',
      }),
      (_, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );
    const response = await request(app).post('/test').send({ count: 10 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });
});

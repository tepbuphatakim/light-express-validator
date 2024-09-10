const express = require('express');
const request = require('supertest');
const { validate } = require('../lib/validator');

describe('light-express-validator', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  test('should fail with required field', async () => {
    app.post(
      '/test',
      validate({
        name: 'required',
        email: '',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );

    const response = await request(app)
      .post('/test')
      .send({ name: '', email: '' });

    expect(response.status).toBe(400);
    expect(response.body.fields.name).toBe('The name field is required.');
  });
});

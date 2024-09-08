const express = require('express');
const request = require('supertest');
const { validate } = require('../lib/validator');

describe('light-express-validator', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  test('should fail validation for missing required field', async () => {
    app.post(
      '/test',
      validate({
        name: 'required',
        email: 'required',
      }),
      (req, res) => {
        res.status(200).json({ message: 'Validation passed' });
      }
    );

    const response = await request(app)
      .post('/test')
      .send({ name: 'John Doe', email: '' });
    console.debug({ response: response });
    expect(response.headers['content-type']).toContain('application/json');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('The email field is required.');
  });
});

const express = require('express');
const request = require('supertest');
const validate = require('../index');
const path = require('path');
const multer = require('multer');

describe('image express validation', () => {
  const testImagePath = path.join(__dirname, 'files', 'test.jpg');
  const testTextPath = path.join(__dirname, 'files', 'test.txt');

  const app = express();
  app.use(express.json());
  const upload = multer({ storage: multer.memoryStorage() });
  app.post(
    '/upload',
    upload.single('image'),
    validate({
      image: 'image',
    }),
    (_, res) => {
      res.status(200).json({ message: 'Validation passed' });
    }
  );

  test('should accept valid image file', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('image', testImagePath);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should reject non-image file', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('image', testTextPath);
    expect(response.status).toBe(400);
    expect(response.body.fields.image).toBe(
      'The image field must be an image.'
    );
  });

  test('should accept null', async () => {
    const response = await request(app).post('/upload');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });
});

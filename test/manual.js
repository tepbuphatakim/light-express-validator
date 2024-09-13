const validate = require('../index');
const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post(
  '/upload',
  upload.single('image'),
  validate({
    image: 'image',
  }),
  (req, res) => {
    res.status(200).json({ message: req.file });
  }
);

app.post(
  '/test',
  validate({
    name: 'boolean',
    email: 'required|min:2',
  }),
  (req, res) => {
    res.status(200).json({ message: 'Validation passed' });
  }
);

app.listen(3001, () => {
  console.log(`App listening on port ${3001}`);
});

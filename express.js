const { validate } = require('./lib/validator');
const express = require('express');
const app = express();
app.use(express.json());

app.get(
  '/test',
  validate({
    name: 'required|min:1',
    email: 'required|min:2',
  }),
  (req, res) => {
    res.status(200).json({ message: 'Validation passed' });
  }
);

app.listen(3001, () => {
  console.log(`App listening on port ${3001}`);
});

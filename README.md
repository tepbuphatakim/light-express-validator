# light-express-validator

`light-express-validator` is a homemade lightweight validation middleware for Express.js applications. It allows you to easily validate incoming request data with a simple and intuitive syntax.

1. Why light express validator?

- It's simple to use, lightweight and 0 dependency.

## Installation

To install the package, run:

```
npm install light-express-validator
```

## Usage

### Basic Usage

1. First, require the package in your Express.js application:

```javascript
const validate = require('light-express-validator');
```

2. Define your validation rules for each field you want to validate:

```javascript
const validationRules = {
  username: 'required|min:3|max:20',
  email: 'required|email',
  age: 'required|numeric|min:18',
};
```

3. Use the `validate` middleware in your route:

```javascript
app.post('/user', validate(validationRules), (req, res) => {
  // Your route handler logic here
});
```

### Available Validation Rules

- `required`: Field must be present and not empty
- `min:x`: Field must have a minimum of x characters
- `max:x`: Field must have a maximum of x characters
- `numeric`: Field must be a number
- `integer`: Field must be an integer
- `decimal:x`: Field must be a decimal with x decimal places
- `boolean`: Field must be true or false
- `date`: Field must be a valid date
- `email`: Field must be a valid email
- `image`: Field must be an image file (for file uploads)

### Handling Validation Errors

If validation fails, the middleware will automatically send a 400 Bad Request response with detailed error information. The response will have this structure:

```json
{
  "message": "Form validation failed",
  "fields": {
    "fieldName": "Error message for this field"
  }
}
```

### Custom Error Handling

If you want to handle validation errors differently, you can catch the `ValidationError`:

```javascript
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    // Custom error handling logic
    return res.status(422).json({ errors: err.fields });
  }
  next(err);
});
```

## Example

Here's a complete example of how to use `light-express-validator` in an Express.js route:

```javascript
const express = require('express');
const validate = require('light-express-validator');

const app = express();
app.use(express.json());

app.post(
  '/user',
  validate({
    username: 'required|min:3|max:20',
    email: 'required|email',
    age: 'required|numeric',
  }),
  (req, res) => {
    // If we reach here, validation passed
    res.json({ message: 'User created successfully', user: req.body });
  }
);

app.listen(3000, () => console.log('Server running on port 3000'));
```

This setup will validate that:

- `username` is required, at least 3 characters, and no more than 20 characters
- `email` is required and a valid email format
- `age` is required, numeric

If any of these validations fail, it will return a 400 Bad Request with details about which fields failed validation.

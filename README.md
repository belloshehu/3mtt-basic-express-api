# Simple Express API

## Description

This is an express API server to perform CRUD on user resources in POSTRESQL database via the following endpoints:

1.  `GET` `/users` endpoint to fetch all users
2.  `GET` `/users/:id` endpoint to fetch one user by Id
3.  `POST` `/user` endpoint to create an item
4.  `PUT` `/users:/id` endpoint to update an user by id
5.  `DELETE` `/users/:id` endpoint to delete user by Id

The base router "/" returns "Hello world!"

The server has cors middleware which simply allow request from any origin and any method

### Creating User Table:

Enter the follwing query into the QueryTool in the PgAdmin Application or via `SQL shell` to create users table with id, name, email and age fields.

```
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INTEGER
  );

```

### Example

Here is an example of response from the `GET` `http://localhost:3000/users` endpoint using postman:

```
[
    {
        "id": 3,
        "name": "Ben Ali",
        "email": "bello@gmail.com",
        "age": 23
    },
    {
        "id": 4,
        "name": "James Ali",
        "email": "jamesal@gmail.com",
        "age": 23
    }
]
```

Here is an example of response from the `GET` `http://localhost:3000/users/3` endpoint using postman:

```
    {
        "id": 3,
        "name": "Ben Ali",
        "email": "bello@gmail.com",
        "age": 23
    },

```

Here is an example of response from the `PUT` `http://localhost:3000/users/3` endpoint using postman:

```
    {
        "id": 3,
        "name": "James Ali",
        "email": "bello@gmail.com",
        "age": 23
    },

```

Here is an example of response from the `DELETE` `http://localhost:3000/users/3` endpoint using postman:

```
    {
        "id": 3,
        "name": "Ben Ali",
        "email": "bello@gmail.com",
        "age": 23
    },

```

## Middlewares

Two error middlewares were used:

1. errorHandler:
   For handling general errors

```
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
```

2. notFound:
   To handle errors when requested route is not valid

   ```
    const notFoundError = (req, res, next) => {
      res.status(404).send(`Route ${req.path} not found`);
    };

    module.exports = notFoundError;
   ```

## Guide

- Clone the repository:
  `git clone git remote add origin https://github.com/belloshehu/3mtt-basic-express-api.git`
- Install packages:
  `npm install`

- Start the server:
  `npm start`

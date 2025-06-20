# Simple Express API

## Description

This is an express API server with the following endpoints:

1.  `GET` `/items` endpoint to fetch all items
2.  `GET` `/item/:id` endpoint to fetch one item by Id
3.  `POST` `/items` endpoint to create an item
4.  `PUT` `/items:/id` endpoint to update an item by id
5.  `DELETE` `/items/:id` endpoint to delete item by Id

The base router "/" returns "Hello world!"

The server has cors middleware which simply allow request from any origin and any method

### Example

Here is an example of response from the `GET` `/items` endpoint:

```
[
    {
        "id": 1,
        "name": "John Doe",
        "description": "Sample item 1"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "description": "Sample item 2"
    },
    {
        "id": 3,
        "name": "Alice Johnson",
        "description": "Sample item 3"
    },
    {
        "id": 4,
        "name": "Bob Brown",
        "description": "Sample item 4"
    },
    {
        "id": 5,
        "name": "Charlie White",
        "description": "Sample item 5"
    }
]
```

### Code structure:

For modularity, the code was broken into server, controllers, services and routes.

## Guide

- Clone the repository:
  `git clone git remote add origin https://github.com/belloshehu/3mtt-basic-express-api.git`
- Install packages:
  `npm install`

- Start the server:
  `npm start`

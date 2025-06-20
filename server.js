const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
// const errorHandler = require("./middleware/errors");
const errorHandler = require("./middleware/errors");
const notFoundError = require("./middleware/notfound");
require("dotenv").config();

const app = express();
const PORT = 3000;
// PostgreSQL connection setup
const dbClient = new Client({
	host: "localhost",
	user: "postgres",
	password: "postgres", // replace with your PostgreSQL password
	port: 5432,
	database: "3mtt-crud", // replace with your PostgreSQL database name
});

dbClient.connect((err) => {
	if (err) {
		console.error("Failed to connect to the database:", err);
	} else {
		console.log("Connected to the PostgreSQL database successfully!");
	}
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// This endpoint is for demonstration purposes, returning a static list of items
app.get("/users", (req, res) => {
	dbClient.query("SELECT * FROM users", (err, result) => {
		if (err) {
			console.error("Error fetching users:", err);
			return res.status(500).json({ message: "Internal server error" });
		}
		const users = result.rows;
		res.status(200).json(users);
	});
});

// This endpoint is for demonstration purposes, returning a static item by ID
app.get("/users/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: "ID is required" });
	}
	if (isNaN(req.params.id)) {
		return res.status(400).json({ message: "ID must be a number" });
	}
	if (req.params.id < 1) {
		return res.status(400).json({ message: "ID must be greater than 0" });
	}
	dbClient.query(
		"SELECT * FROM users WHERE id = $1",
		[req.params.id],
		(err, result) => {
			if (err) {
				console.error("Error fetching user:", err);
				return res.status(500).json({ message: "Internal server error" });
			}
			if (result.rows.length === 0) {
				return res.status(404).json({ message: "User not found" });
			}
			const user = result.rows[0];
			res.status(200).json(user);
		}
	);
});

// This endpoint is for demonstration purposes, creating a new item
app.post("/users", (req, res) => {
	const { name, age, email } = req.body;
	if (!name || !age || !email) {
		return res
			.status(400)
			.json({ message: "Name, age, and email are required" });
	}
	if (typeof age !== "number" || age <= 0) {
		return res.status(400).json({ message: "Age must be a positive number" });
	}

	const insertQuery = `
		INSERT INTO users (name, age, email)
		VALUES ($1, $2, $3)
		RETURNING *;
	`;
	const values = [name, age, email];
	dbClient.query(insertQuery, values, (err, result) => {
		if (err) {
			console.error("Error creating user:", err);
			return res.status(500).json({ message: "Internal server error" });
		}
		const newUser = result.rows[0];
		res.status(201).json(newUser);
	});
});

// This is a simple root endpoint to check if the server is running
app.put("/users/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: "ID is required" });
	}
	if (isNaN(req.params.id)) {
		return res.status(400).json({ message: "ID must be a number" });
	}
	if (req.params.id < 1) {
		return res.status(400).json({ message: "ID must be greater than 0" });
	}

	const { name, age, email } = req.body;
	if (!name || !age || !email) {
		return res
			.status(400)
			.json({ message: "Name, age, and email are required" });
	}
	if (typeof age !== "number" || age <= 0) {
		return res.status(400).json({ message: "Age must be a positive number" });
	}

	const updateQuery = `
		UPDATE users
		SET name = $1, age = $2, email = $3
		WHERE id = $4
		RETURNING *;
	`;
	const values = [name, age, email, req.params.id];
	dbClient.query(updateQuery, values, (err, result) => {
		if (err) {
			console.error("Error updating user:", err);
			return res.status(500).json({ message: "Internal server error" });
		}
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}
		const updatedUser = result.rows[0];
		res.status(200).json(updatedUser);
	});
});

app.delete("/users/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: "ID is required" });
	}

	if (isNaN(req.params.id)) {
		return res.status(400).json({ message: "ID must be a number" });
	}
	if (req.params.id < 1) {
		return res.status(400).json({ message: "ID must be greater than 0" });
	}
	const deleteQuery = `
		DELETE FROM users
		WHERE id = $1
		RETURNING *;
	`;
	const values = [req.params.id];
	dbClient.query(deleteQuery, values, (err, result) => {
		if (err) {
			console.error("Error deleting user:", err);
			return res.status(500).json({ message: "Internal server error" });
		}
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}
		const deletedUser = result.rows[0];
		res.status(200).json(deletedUser);
	});
});

// Error handling middleware
// if (process.env.NODE_ENV !== "production") {
// 	app.use(errorHandler({ log: errorNotification }));
// } else {
// 	app.use(errorHandler());
// }

// function errorNotification(err, str, req) {
// 	var title = "Error in " + req.method + " " + req.url;

// 	notifier.notify({
// 		title: title,
// 		message: str,
// 	});
// }

app.use(errorHandler);
app.use(notFoundError);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

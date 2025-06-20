const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const items = [
	{ id: 1, name: "John Doe", description: "Sample item 1" },
	{ id: 2, name: "Jane Smith", description: "Sample item 2" },
	{ id: 3, name: "Alice Johnson", description: "Sample item 3" },
	{ id: 4, name: "Bob Brown", description: "Sample item 4" },
	{ id: 5, name: "Charlie White", description: "Sample item 5" },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// This endpoint is for demonstration purposes, returning a static list of items
app.get("/items", (req, res) => {
	return res.status(200).json(items);
});

// This endpoint is for demonstration purposes, returning a static item by ID
app.get("/items/:id", (req, res) => {
	const itemId = parseInt(req.params.id, 10);
	const item = items.find((i) => i.id === itemId);
	if (item) {
		res.status(200).json(item);
	} else {
		res.status(404).json({ message: "Item not found" });
	}
});

// This endpoint is for demonstration purposes, creating a new item
app.post("/items", (req, res) => {
	const newItem = req.body;
	if (!newItem.name) {
		return res.status(400).json({ message: "Name is required" });
	}
	if (!newItem.description) {
		return res.status(400).json({ message: "Description is required" });
	}

	newItem.id = items.length + 1; // Simple ID assignment
	items.push(newItem);
	res.status(201).json(newItem);
});

// This is a simple root endpoint to check if the server is running
app.put("/items/:id", (req, res) => {
	if (!req.body.name || req.body.description === "") {
		return res
			.status(400)
			.json({ message: "Name and or descrition is required" });
	}

	if (!req.params.id) {
		return res.status(400).json({ message: "ID is required" });
	}
	const itemId = parseInt(req.params.id, 10);
	const itemIndex = items.findIndex((i) => i.id === itemId);
	if (itemIndex !== -1) {
		items[itemIndex] = { ...items[itemIndex], ...req.body };
		res.status(200).json(items[itemIndex]);
	} else {
		res.status(404).json({ message: "Item not found" });
	}
});

app.delete("/items/:id", (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: "ID is required" });
	}

	const itemId = parseInt(req.params.id, 10);
	const itemIndex = items.findIndex((i) => i.id === itemId);
	if (itemIndex !== -1) {
		items.splice(itemIndex, 1);
		res.status(204).send();
	} else {
		res.status(404).json({ message: "Item not found" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

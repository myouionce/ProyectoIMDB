const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy data
const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
];

// Routes
app.get("/api/items", (req, res) => {
    res.json(items);
});

app.post("/api/items", (req, res) => {
    const newItem = req.body;
    items.push({ id: items.length + 1, ...newItem });
    res.json({ message: "Item added", item: newItem });
});

app.delete("/api/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex((item) => item.id === id);
    if (index > -1) {
        const deletedItem = items.splice(index, 1);
        res.json({ message: "Item deleted", item: deletedItem });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = "mongodb+srv://gabops0511:Gabonator_1314@dbweb.ntnf2.mongodb.net/";
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema);

// Routes
app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/items", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.json({ message: "Item added", item: savedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/items/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Item deleted", item: deletedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

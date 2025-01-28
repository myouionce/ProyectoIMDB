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

const PeliculaSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    genero: { type: [String], required: true },  // Array de géneros
    director: { type: String, required: true },
    lanzamiento: { type: Date, required: true },
    calificacion: { type: Number, required: true, min: 0, max: 10 },  // Calificación de 0 a 10
    portada: { type: String, required: true },  // URL de la portada
    fotosExtra: { type: [String], default: [] },  // Array de URLs de imágenes extra
});

const Pelicula = mongoose.model("Pelicula", PeliculaSchema);

// Routes
// * GETS
app.get("/actors", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las películas" });
    }
});

// * POST: Agregar una película
app.post("/peliculas", async (req, res) => {
    try {
        const nuevaPelicula = new Pelicula(req.body);
        const peliculaGuardada = await nuevaPelicula.save();
        res.json({ message: "Película añadida", pelicula: peliculaGuardada });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar la película" });
    }
});

// * DELETE: Eliminar una película por ID
app.delete("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPelicula = await Pelicula.findOneAndDelete({ id });
        if (!deletedPelicula) {
            return res.status(404).json({ message: "Película no encontrada" });
        }
        res.json({ message: "Película eliminada", pelicula: deletedPelicula });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la película" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

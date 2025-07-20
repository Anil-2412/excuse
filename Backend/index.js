const express = require('express');
const mongoose = require('mongoose');  

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // allows parsing JSON request bodies
const PORT = 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

// Connect to MongoDB
// MongoDB connection
mongoose.connect('mongodb+srv://anilalok2006:aQKvPLCho16NXnLC@excuss.fsworbc.mongodb.net/')
  .then(() => console.log('Mongodb Connected'))
  .catch(err => console.log(err));

  // Define Schema & Model
const excuseSchema = new mongoose.Schema({
  mood: String,
  tone: String,
  text: String
});

const Excuse = mongoose.model('Excuse', excuseSchema);

// Get all excuses
app.get('/api/excuses', async (req, res) => {
  try {
    const excuses = await Excuse.find();
    res.json(excuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new excuse (mood, tone, text)
app.post('/api/excuses', async (req, res) => {
  const { mood, tone, text } = req.body;
  try {
    const newExcuse = new Excuse({ mood, tone, text });
    await newExcuse.save();
    res.status(201).json(newExcuse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete an excuse by ID
app.delete('/api/excuses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExcuse = await Excuse.findByIdAndDelete(id);
    if (!deletedExcuse) {
      return res.status(404).json({ message: 'Excuse not found' });
    }
    res.json({ message: 'Excuse deleted successfully', deletedExcuse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


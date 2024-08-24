const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/turkish_words_quiz';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Word Schema
const wordSchema = new mongoose.Schema({
  turkish: String,
  english: String,
});

const Word = mongoose.model('Word', wordSchema);

// Routes
app.post('/api/words', async (req, res) => {
  try {
    const { turkish, english } = req.body;
    const newWord = new Word({ turkish, english });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/words', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route for updating a word
app.put('/api/words/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { turkish, english } = req.body;
    const updatedWord = await Word.findByIdAndUpdate(id, { turkish, english }, { new: true });
    if (!updatedWord) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json(updatedWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/quiz', async (req, res) => {
  try {
    const words = await Word.aggregate([{ $sample: { size: 10 } }]);
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for audio proxy
app.get('/api/audio', async (req, res) => {
  const { word, lang } = req.query;
  if (!word || !lang) {
    return res.status(400).json({ message: 'Word and lang parameters are required' });
  }

  try {
    const response = await axios.get(`https://translate.google.com/translate_tts`, {
      params: {
        ie: 'UTF-8',
        q: word,
        tl: lang,
        client: 'tw-ob'
      },
      responseType: 'stream'
    });

    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching audio:', error);
    res.status(500).json({ message: 'Error fetching audio' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

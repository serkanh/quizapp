import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioButton from './AudioButton';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({ turkish: '', english: '' });
  const [quiz, setQuiz] = useState([]);
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    const response = await axios.get(`${API_URL}/api/words`);
    setWords(response.data);
  };

  const addWord = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/words`, newWord);
    setNewWord({ turkish: '', english: '' });
    fetchWords();
  };

  const startEditing = (word) => {
    setEditingWord({ ...word });
  };

  const cancelEditing = () => {
    setEditingWord(null);
  };

  const saveEdit = async () => {
    await axios.put(`${API_URL}/api/words/${editingWord._id}`, {
      turkish: editingWord.turkish,
      english: editingWord.english
    });
    setEditingWord(null);
    fetchWords();
  };

  const generateQuiz = async () => {
    const response = await axios.get(`${API_URL}/api/quiz`);
    setQuiz(response.data);
  };

  return (
    <div className="App">
      <h1>Turkish Words Quiz</h1>
      
      <h2>Add New Word</h2>
      <form onSubmit={addWord}>
        <input
          type="text"
          placeholder="Turkish word"
          value={newWord.turkish}
          onChange={(e) => setNewWord({ ...newWord, turkish: e.target.value })}
        />
        <input
          type="text"
          placeholder="English translation"
          value={newWord.english}
          onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
        />
        <button type="submit">Add Word</button>
      </form>

      <h2>Word List</h2>
      <ul>
        {words.map((word) => (
          <li key={word._id}>
            {editingWord && editingWord._id === word._id ? (
              <>
                <input
                  value={editingWord.turkish}
                  onChange={(e) => setEditingWord({ ...editingWord, turkish: e.target.value })}
                />
                <AudioButton word={editingWord.turkish} lang="tr" />
                -
                <input
                  value={editingWord.english}
                  onChange={(e) => setEditingWord({ ...editingWord, english: e.target.value })}
                />
                <AudioButton word={editingWord.english} lang="en" />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                {word.turkish} <AudioButton word={word.turkish} lang="tr" /> - 
                {word.english} <AudioButton word={word.english} lang="en" />
                <button onClick={() => startEditing(word)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Quiz</h2>
      <button onClick={generateQuiz}>Generate Quiz</button>
      <ul>
        {quiz.map((word) => (
          <li key={word._id}>
            {word.turkish} <AudioButton word={word.turkish} lang="tr" /> - 
            [Hidden] <AudioButton word={word.english} lang="en" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

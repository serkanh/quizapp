import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioButton from './AudioButton';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({ turkish: '', english: '' });
  const [quiz, setQuiz] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);
  const [editingWord, setEditingWord] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/words`);
      setWords(response.data);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const addWord = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/words`, newWord);
      setNewWord({ turkish: '', english: '' });
      fetchWords();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const startEditing = (word) => {
    setEditingWord({ ...word });
  };

  const cancelEditing = () => {
    setEditingWord(null);
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${API_URL}/api/words/${editingWord._id}`, {
        turkish: editingWord.turkish,
        english: editingWord.english
      });
      setEditingWord(null);
      fetchWords();
    } catch (error) {
      console.error('Error updating word:', error);
    }
  };

  const deleteWord = async (id) => {
    if (window.confirm('Are you sure you want to delete this word?')) {
      try {
        await axios.delete(`${API_URL}/api/words/${id}`);
        fetchWords();
      } catch (error) {
        console.error('Error deleting word:', error);
      }
    }
  };

  const generateQuiz = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/quiz`);
      setQuiz(response.data);
      setQuizAnswers(new Array(response.data.length).fill(null));
      setQuizScore(null);
      setShowQuiz(true);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  const handleQuizAnswer = (index, answer) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = answer;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    try {
      const answers = quiz.map((question, index) => ({
        question: question.question,
        selectedAnswer: quizAnswers[index],
        correctAnswer: question.correctAnswer
      }));

      const response = await axios.post(`${API_URL}/api/quiz/grade`, { answers });
      setQuizScore(response.data.score);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div className="App">
      <h1>Turkish Words Quiz</h1>
      
      {!showQuiz && (
        <>
          <h2>Add New Word</h2>
          <form onSubmit={addWord} className="add-word-form">
            <input
              type="text"
              placeholder="Turkish word"
              value={newWord.turkish}
              onChange={(e) => setNewWord({ ...newWord, turkish: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="English translation"
              value={newWord.english}
              onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
              required
            />
            <button type="submit">Add Word</button>
          </form>

          <h2>Word List</h2>
          <ul className="word-list">
            {words.map((word) => (
              <li key={word._id}>
                {editingWord && editingWord._id === word._id ? (
                  <div className="edit-word">
                    <input
                      value={editingWord.turkish}
                      onChange={(e) => setEditingWord({ ...editingWord, turkish: e.target.value })}
                    />
                    <AudioButton word={editingWord.turkish} lang="tr" />
                    <input
                      value={editingWord.english}
                      onChange={(e) => setEditingWord({ ...editingWord, english: e.target.value })}
                    />
                    <AudioButton word={editingWord.english} lang="en" />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                  <div className="word-item">
                    <span>{word.turkish}</span> <AudioButton word={word.turkish} lang="tr" />
                    <span>{word.english}</span> <AudioButton word={word.english} lang="en" />
                    <button onClick={() => startEditing(word)}>Edit</button>
                    <button onClick={() => deleteWord(word._id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <button onClick={generateQuiz} className="generate-quiz">Generate Quiz</button>
        </>
      )}

      {showQuiz && (
        <div className="Quiz">
          <h2>Quiz</h2>
          {quiz.map((question, index) => (
            <div key={index} className="question-card">
              <h3>
                Question {index + 1}: 
                <span className="turkish-word">{question.question}</span>
                <AudioButton word={question.question} lang="tr" />
              </h3>
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option">
                    <input
                      type="radio"
                      id={`question-${index}-option-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={quizAnswers[index] === option}
                      onChange={() => handleQuizAnswer(index, option)}
                    />
                    <label htmlFor={`question-${index}-option-${optionIndex}`}>
                      {option}
                      <AudioButton word={option} lang="en" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="quiz-controls">
            <button onClick={submitQuiz} className="submit-quiz">Submit Quiz</button>
            {quizScore !== null && <p className="quiz-score">Your score: {quizScore}%</p>}
            <button onClick={() => setShowQuiz(false)} className="back-to-list">Back to Word List</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

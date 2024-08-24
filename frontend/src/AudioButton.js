import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AudioButton = ({ word, lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    setIsPlaying(true);
    const audio = new Audio(`${API_URL}/api/audio?word=${encodeURIComponent(word)}&lang=${lang}`);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <button onClick={playAudio} disabled={isPlaying}>
      {isPlaying ? 'Playing...' : '🔊'}
    </button>
  );
};

export default AudioButton;

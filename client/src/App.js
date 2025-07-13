import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this CSS file exists

export default function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleShorten = async () => {
    if (!originalUrl) {
      setMessage("URL field can't be empty");
      setShortUrl('');
      return;
    }

    try {
      const response = await axios.post(
        'https://react-spring-boot-boilerplate-2la3.onrender.com/api/shorten',
        { originalUrl }
      );
      setShortUrl(response.data.shortUrl);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Try again.');
      setShortUrl('');
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">🔗 URL Shortener</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button onClick={handleShorten}>Shorten</button>
      </div>

      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {message && <p className="error">{message}</p>}
    </div>
  );
}

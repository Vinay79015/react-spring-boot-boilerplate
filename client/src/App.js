import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleShorten = async () => {
    try {
      const response = await axios.post('http://localhost:7070/api/shorten', { originalUrl });
      setShortUrl(response.data.shortUrl);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid URL');
      setShortUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-10">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-400 drop-shadow-md">🔗 URL Shortener</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            className="flex-1 px-4 py-3 rounded shadow text-black w-full sm:w-auto"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            onClick={handleShorten}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded shadow text-white font-semibold"
          >
            Shorten
          </button>
        </div>

        {shortUrl && (
          <div className="bg-gray-700 p-4 rounded mb-4">
            <p className="text-green-300 font-mono">Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 underline">
              {shortUrl}
            </a>
          </div>
        )}

        {message && <p className="text-red-400 font-semibold">{message}</p>}
      </div>
    </div>
  );
}

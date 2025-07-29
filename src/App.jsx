import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [rephrased, setRephrased] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRephrase = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setRephrased('');

    try {
      const res = await fetch('http://localhost:3001/rephrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });

      const data = await res.json();
      const response = data?.choices?.[0]?.message?.content || 'No response';

      setRephrased(response);
    } catch (err) {
      console.error(err);
      setRephrased('Error contacting server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', width: 300 }}>
      <h2>Rephrase with Groq</h2>
      <textarea
        rows={5}
        style={{ width: '100%' }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste text here..."
      />
      <button onClick={handleRephrase} disabled={loading} style={{ marginTop: '0.5rem' }}>
        {loading ? 'Rephrasing...' : 'Rephrase'}
      </button>

      {rephrased && (
        <div style={{ marginTop: '1rem', background: '#eee', padding: '0.5rem' }}>
          <strong>Output:</strong>
          <p>{rephrased}</p>
        </div>
      )}
    </div>
  );
}

export default App;

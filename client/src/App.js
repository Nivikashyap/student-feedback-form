import { useEffect, useState } from 'react';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback')
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setFeedbacks([...feedbacks, form]);
    setForm({ name: '', message: '' });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        /><br/><br/>
        <textarea
          placeholder="Your feedback"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        /><br/><br/>
        <button type="submit">Submit</button>
      </form>
      <h2>All Feedback</h2>
      <ul>
        {feedbacks.map((fb, i) => (
          <li key={i}><strong>{fb.name}</strong>: {fb.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

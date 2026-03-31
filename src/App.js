import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    const fetchStatus = () => {
      fetch('/api/status')
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(err => setMessage("Backend unreachable"));
    };

    // Fetch immediately on load
    fetchStatus();

    // Set up an interval to fetch every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchStatus, 5000);

    // CRITICAL: Return a cleanup function to clear the interval 
    // if the component ever unmounts, preventing memory leaks.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Springboot + React Integrated Pipeline V1!!</h1>
      <div style={{ padding: '20px', border: '1px solid #ccc', display: 'inline-block' }}>
        <p><strong>Server Status:</strong> {message}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>(Auto-updating every 5 seconds)</p>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/rolldice")
      .then((response) => response.json())
      .then((data) => {
        setRandomNumber(data.randomNumber);
        setMessage(data.message);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch("/db")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Random Number: {randomNumber}</h1>
      <h1>Message: {message}</h1>
      <h1>Database Data:</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.column_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

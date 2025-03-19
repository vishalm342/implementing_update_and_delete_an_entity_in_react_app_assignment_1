import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";
import "./App.css";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // Get the existing item from the server
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch door with ID 1
    fetch(`${API_URI}/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch door");
        }
        return response.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1>Door Manager</h1>
      {item ? (
        <UpdateItem item={item} apiUri={API_URI} />
      ) : (
        <p>Loading door data...</p>
      )}
    </div>
  );
}

export default App;

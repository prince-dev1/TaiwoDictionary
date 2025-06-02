import './App.css';
import { useState } from "react";
import axios from "axios";
import ListDetails from "./components/ListDetails";

function App() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

  async function handleSearch() {
  setError("");        // Clear previous errors
  setResult(null);     // Clear previous results
  setLoading(true);    // Show loader if you’re using one

  try {
    const res = await axios.get(`${api}/${keyword}`);
    setResult(res.data[0]);
  } catch (e) {
    setError("This word does not exist or couldn't be found.");
  } finally {
    setLoading(false);
  }
}



  function handleClear() {
    setKeyword("");
    setResult(null);
  }

 return (
  <div>
    {/* HERO SECTION WITH IMAGE */}
    <div
      className="hero-section text-white d-flex align-items-center justify-content-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(144,238,144,0.5), rgba(144,238,144,0.5)), url(${process.env.PUBLIC_URL}/image1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        width: '100%',
        padding: '4rem 1rem',
      }}
    >
      <header>
        <h2 className="display-4 fw-bold">Taiwo Dictionary</h2>
      </header>
    </div>

    {/* MAIN APP SECTION */}
    <div className="container-fluid">
      <div className="mb-3">
        <label htmlFor="search" className="form-label">Enter a word:</label>
        <input
          id="search"
          type="text"
          className="form-control"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <button
  className="btn btn-success me-2"
  onClick={handleSearch}
  disabled={loading}
>
  {loading ? (
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  ) : (
    "Search"
  )}
</button>

        <button
          className="btn btn-outline-secondary"
          disabled={!result}
          onClick={handleClear}
        >
          Reset
        </button>
        </div>
        {error && (
      <div className="alert alert-danger" role="alert">
    {error}
  </div>
)}

      {result && <ListDetails result={result} />}
      </div>
      

    {/* FOOTER */}
    <footer className="text-center py-2 bg-success text-white">
      <p>Learn to know better</p>
    </footer>
    </div>
);
}
export default App;
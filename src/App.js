import './App.css';
import { useState } from "react";
import axios from "axios";
import ListDetails from "./components/ListDetails";
// import image from "./src/image";

function App() {
  const [keyword, setKeyword] = useState("");  
  const [result, setResult] = useState(null);
  const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

  async function handleSearch() {
    try {
      const res = await axios.get(`${api}/${keyword}`);  
      console.log(res, "res");
      setResult(res.data[0]);
    } catch (e) {
      console.log({ e });
    }
  }

  function handleClear() {
    setKeyword("");  
    setResult(null);
  }

  return (
    <div className="Overpage">
      <div  className="App">
      <header className= "Header" >
        <h2 className= "Headerc"> Spectacular Dictionary</h2>
      </header>

      <main>
        <section>
          <label htmlFor="search">Enter a word:</label>
          <input 
            id="search"
            type="text"
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            aria-label="Word Search" 
          />
        </section>

        <section>
          <button className="button" type="button" onClick={handleSearch}>
            Search
          </button>
          <button
            disabled={!result}
            className="button"
            type="button"
            onClick={handleClear}
          >
            Reset
          </button>
        </section>
      </main>

      {result && <ListDetails result={result} />}
      </div>

      <footer className= "footer">
        <p> We wish you all the best</p>
      </footer>
     
    </div>
  );
}
export default App;
import { useEffect, useState } from "react";
import "./App.css";

function Quote({ quote }) {
  return (
    <div className="quote-content">
      <div className="quote">{`Quote: ${quote.quote}`}</div>
      <div className="author">{`Author: ${quote.author}`}</div>
    </div>
  );
}

function App() {
  const [quotes, setQuotes] = useState("");
  const [url, setUrl] = useState(
    "http://localhost:54287/quotes/search?term=life"
  );

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  return (
    <div>
      Change URL:{" "}
      <input
        className="input"
        type="text"
        value={url}
        onChange={handleChange}
      />
      {Array.isArray(quotes) ? (
        quotes.map((quote) => <Quote key={quote.id} quote={quote} />)
      ) : (
        <Quote quote={quotes} />
      )}
    </div>
  );
}

export default App;

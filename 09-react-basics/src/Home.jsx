import { useState } from 'react'
import LocaleItem from "./LocaleItem"

function Home() {
  
  const [locales, setLocales] = useState([
    {
      locale: "Washington DC",
      usa: true,
      seen: true,
      id: 1
    },
    {
      locale: "Los Angeles",
      usa: true,
      seen: true,
      id: 2
    },
    {
      locale: "New Delhi",
      usa: false,
      seen: false,
      id: 3
    }
  ]);

  const [localeName, setLocaleName] = useState("");
  const [usa, setusa] = useState(false);
  const [seen, setSeen] = useState(false);

 function addLocale() {
    let newLocale = {
      locale: localeName,
      usa: usa,
      seen: seen, 
      id: Date.now()    // Generate a unique ID using current timestamp
    }
    // SPREAD OPERATOR (...todos):
    // Creates a new array containing all existing todos, then adds newTodo
    // We must create a new array (not modify the old one) because React needs to detect changes
    // [1, 2, 3] becomes [1, 2, 3, newTodo] - keeps all old items, adds the new one
    setLocales([...locales, newLocale]);
    // Clear the input field by resetting task to empty string
    setLocaleName("");
    setusa(false);
    setSeen(false);
  }

  // JSX (JavaScript XML) - looks like HTML but it's actually JavaScript
  // The return statement returns JSX that React will render to the page
  return (
    <div>
      <input 
        type="text"
        placeholder='Enter locale here'
        value={localeName}
        onChange={(e) => setLocaleName(e.target.value)}
        required
      />
      <label>
      <input
      type="checkbox"
      checked={usa}
      onChange={(e) => setusa(e.target.checked)}
      />
      USA?
      </label>

      <label>
      <input
      type="checkbox"
      checked ={seen}
      onChange={(e) => setSeen(e.target.checked)} 
      />
      Seen?
      </label>

      <button onClick={addLocale}>Add Place</button>
      
      

      <ul>
        {locales.map((locale) => (
          <LocaleItem locale={locale} key={locale.id} />
        ))}
      </ul>

    </div>
  )
}

export default Home;
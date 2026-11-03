import { useState } from "react";

const SearchForm = ({onSearch}) => {
    const [codeInput, setCodeInput] = useState('');

    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSearch(codeInput.trim());
        }}>
          <label>Code: <input type="text" value={codeInput} onChange={e => setCodeInput(e.target.value)} /></label>
          <button type="submit">Search</button>
        </form>
        <button className="clearBtn" onClick={() => {
          setCodeInput('');
          onSearch(null)
        }}>Clear</button>
      </div>
    );
}
 
export default SearchForm;
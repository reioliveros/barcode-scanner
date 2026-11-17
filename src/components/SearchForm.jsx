import { useState } from "react";

const SearchForm = ({onSearch, onClear}) => {
    const [codeInput, setCodeInput] = useState('');

    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if(!codeInput) return;
          onSearch(codeInput.trim());
        }}>
          <label>Code:</label>
          <input type="text" value={codeInput} onChange={e => setCodeInput(e.target.value)} />
          <button type="submit">Search</button>
        <button className="clearBtn" onClick={() => {
          setCodeInput('');
          onClear();
        }}>Clear</button>
        </form>
      </div>
    );
}
 
export default SearchForm;
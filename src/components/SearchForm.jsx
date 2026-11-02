import { useState } from "react";

const SearchForm = ({onSubmit}) => {
    const [codeInput, setCodeInput] = useState('');

    return (
      <div>
        <label>Code: <input type="text" value={codeInput} onChange={e => setCodeInput(e.target.value)} /></label>
        <button onClick={() => {onSubmit(codeInput)}}>Search</button>
      </div>
    );
}
 
export default SearchForm;
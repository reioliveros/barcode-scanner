import { useState } from "react";
import { isPositiveWholeNumber } from "../utils/isPositiveWholeNumber";

const SaveForm = ({ onSave, initialBrand, initialName, barcode }) => {
  const [brand, setBrand] = useState(initialBrand || "");
  const [name, setName] = useState(initialName || "");
  const [shelfLifeDays, setShelfLifeDays] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const days = Number(shelfLifeDays);

<<<<<<< HEAD
            <button>Save</button>
        </form>
    );
}
 
export default SaveForm;
=======
    if (!isPositiveWholeNumber(days)) {
      setError("Enter a whole number of days");
      return;
    }

    setError("");
    onSave(barcode, { brand: brand.trim(), name: name.trim(), shelfLifeDays: days });
  };

  return (
    <form className="saveForm" onSubmit={handleSubmit}>
      <p>Save New Product</p>
      {error && <p className="error">{error}</p>}
      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="shelfLifeDays">Shelf Life (Days):</label>
        <input
          id="shelfLifeDays"
          placeholder="Days"
          type="number"
          value={shelfLifeDays}
          onChange={(e) => {
            setShelfLifeDays(e.target.value);
          }}
        />
      </div>

      <button type="submit">Save</button>
      <button type="button">Cancel</button>
    </form>
  );
};

export default SaveForm;
>>>>>>> save-form

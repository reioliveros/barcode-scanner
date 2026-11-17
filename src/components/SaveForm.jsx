import { useState } from "react";

const SaveForm = ({onSave}) => {
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [shelfLife, setShelfLife] = useState('');

    return (
        <form className="saveForm" action="" onSubmit={ (e) => {
            e.preventDefault();
            if(shelfLife < 0) setShelfLife(-1);
            else setShelfLife( Number(shelfLife) )

            onSave({brand, name, shelfLife});
        }}>
            <p>Save New Product</p>

            <div>
                <label htmlFor="brand">Brand:</label>
                <input
                    id="brand"
                    type="text"
                    value={brand}
                    onChange={ e => setBrand(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={ e => setName(e.target.value) }
                />
            </div>

            <div>
                <label htmlFor="shelfLife">Shelf Life:</label>
                <input
                    id="shelfLife"
                    placeholder="Days"
                    type="number"
                    value={shelfLife}
                    onChange={ e => setShelfLife(e.target.value)}
                />
            </div>

            <button type="submit">Save</button>
            <button type="button">Cancel</button>
        </form>
    );
}
 
export default SaveForm;
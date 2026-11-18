import { useState } from "react";

const SaveForm = ({onSave}) => {
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [shelfLifeDays, setShelfLifeDays] = useState('');

    return (
        <form className="saveForm" action="" onSubmit={ (e) => {
            e.preventDefault();
            if(shelfLifeDays < 0) setShelfLifeDays(-1);
            else setShelfLifeDays( Number(shelfLifeDays) )

            onSave({brand, name, shelfLifeDays});
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
                <label htmlFor="shelfLifeDays">Shelf Life (Days):</label>
                <input
                    id="shelfLifeDays"
                    placeholder="Days"
                    type="number"
                    value={shelfLifeDays}
                    onChange={ e => setShelfLifeDays(e.target.value)}
                />
            </div>

            <button type="submit">Save</button>
            <button type="button">Cancel</button>
        </form>
    );
}
 
export default SaveForm;
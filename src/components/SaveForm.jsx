const SaveForm = () => {
    return (
        <form className="saveForm" action="">
            <p>Save New Product</p>

            <div>
                <label htmlFor="">Brand:</label>
                <input type="text" />
            </div>

            <div>
                <label htmlFor="">Name:</label>
                <input type="text" />
            </div>

            <div>
                <label htmlFor="">Shelf Life:</label>
                <input placeholder="Days" type="number" />
            </div>

            <button>Save</button>
            <button>Cancel</button>
        </form>
    );
}
 
export default SaveForm;
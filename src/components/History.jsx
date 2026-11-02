const History = ({history, onClear, onChangeItem}) => {
    return (
        <div className="history">
            <table>
                <tr><th className="top" colSpan="4">Recently Scanned Items</th></tr>
                <tr>
                    <th>Brand</th>
                    <th>Item Name</th>
                    <th colSpan={2}>Barcode</th>
                </tr>

                {history.map(item=> (
                    <tr key={item.barcode}>
                        <td>{item.brand}</td>
                        <td>{item.name}</td>
                        <td>{item.barcode} </td>
                        <td><button onClick={() => {onChangeItem(item.barcode)}}>Search</button></td>
                    </tr>
                ))}
            </table>

            {history.length > 0 ? <button onClick={onClear}>Clear History</button> : ''}
        </div>
    );
}
 
export default History;
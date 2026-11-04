const History = ({history, onClear, onChangeItem}) => {
    return (
        <div className="history">
            <table>
                <caption>Recently Scanned Items:</caption>
                <tbody>
                <tr>
                    <th>Status</th>
                    <th>Brand</th>
                    <th>Item Name</th>
                    <th colSpan={2}>Barcode</th>
                </tr>

                {history.map(item=> (
                    <tr key={item.barcode}>
                        <td className={
                            (item.found ? 'foundItem' : 'notFoundItem')
                        }>
                            {
                                (item.found ? 'Found' : 'Not Found')
                            }
                        </td>
                        <td>{item.brand}</td>
                        <td>{item.name}</td>
                        <td>{item.barcode} </td>
                        <td><button onClick={() => {
                            onChangeItem(item.barcode);
                        }}>Search</button></td>
                    </tr>
                ))}
                </tbody>
            </table>

            {history.length > 0 ? <button onClick={onClear}>Clear History</button> : ''}
        </div>
    );
}
 
export default History;
import { describeItem } from "../utils/describeItem";


const History = ({history, myProducts, onClear, onChangeItem}) => {
    return (
        <div className="history zebra">
            <table>
                <caption>Recently Scanned Items:</caption>
                <tbody>
                <tr>
                    <th>API Status</th>
                    <th>Brand</th>
                    <th>Item Name</th>
                    <th colSpan={2}>Barcode</th>
                    <th>Shelf Life</th>
                    <th>Use By (From Today)</th>
                </tr>

                {history.map(item=>{
                    const info = describeItem(item, myProducts[item.barcode])
                    return ( <tr key={item.barcode}>
                        <td className={
                            (item.found ? 'foundItem' : 'notFoundItem')
                        }>
                            {
                                (item.found ? 'Found' : 'Not Found')
                            }
                        </td>
                        <td>{info.brand || "Unknown Brand"}</td>
                        <td>{info.name || "Unknown Name"}</td>
                        <td className="barcode">{item.barcode} </td>
                        <td className="tableSearchBtn"><button  onClick={() => {
                            onChangeItem(item.barcode);
                        }}>Search</button></td>
                        <td>{info.shelfLifeDays || '???'}</td>
                        <td>{info.useBy || '???'}</td>
                    </tr>
                )})}
                </tbody>
            </table>

            {history.length > 0 ? <button onClick={onClear}>Clear History</button> : ''}
        </div>
    );
}
 
export default History;
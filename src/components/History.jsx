import { describeItem } from "../utils/describeItem";


const History = ({history, myProducts, onClear, onChangeItem, onDelete}) => {
    const trashIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
    const editIcon = (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M18 10L14 6M2.49997 21.5L5.88434 21.124C6.29783 21.078 6.50457 21.055 6.69782 20.9925C6.86926 20.937 7.03242 20.8586 7.18286 20.7594C7.35242 20.6475 7.49951 20.5005 7.7937 20.2063L21 7C22.1046 5.89543 22.1046 4.10457 21 3C19.8954 1.89543 18.1046 1.89543 17 3L3.7937 16.2063C3.49952 16.5005 3.35242 16.6475 3.24061 16.8171C3.1414 16.9676 3.06298 17.1307 3.00748 17.3022C2.94493 17.4954 2.92195 17.7021 2.87601 18.1156L2.49997 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>)
    

    return (
        <div className="history zebra">
            <table>
                <caption>Recently Scanned Items:</caption>
                <tbody>
                <tr>
                    <th></th>
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
                        <td><button title="Delete" aria-label="Delete this item and its saved shelf life" className="deleteBtn" onClick={() => {onDelete(item.barcode)}}>{trashIcon}</button></td>
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
                        <td><button className="editIconBtn">{editIcon}</button></td>
                    </tr>
                )})}
                </tbody>
            </table>

            {history.length > 0 ? <button onClick={onClear}>Clear History</button> : ''}
        </div>
    );
}
 
export default History;
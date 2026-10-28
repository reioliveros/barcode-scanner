const History = ({history, onClear, onChangeItem}) => {
    return (
        <div>
            {history.length > 0 ? <button onClick={onClear}>Clear History</button> : ''}
            <ul>
                {history.map(item => (
                    <li key={item.barcode}>
                        {item.name} {item.barcode} <button onClick={ () => { onChangeItem(item.barcode) }}>Search</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default History;
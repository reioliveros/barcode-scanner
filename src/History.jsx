const History = ({history}) => {
    return (
        <div>
            <ul>
                {history.map(item => (
                    <li key={item.barcode}>{item.name} {item.barcode}</li>
                ))}
            </ul>
        </div>
    );
}
 
export default History;
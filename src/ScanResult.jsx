
const ScanResult = ({barcode}) => {
    return (
        <div>
            <p>{barcode ? "Scanned Barcode: " + barcode : "Nothing scanned yet"}</p>
        </div>
    );
}
 
export default ScanResult;
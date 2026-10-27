import { useEffect, useState } from 'react'
import ScanResult from './ScanResult';
import Scanner from './Scanner';

function App() {

  const [barcode, setBarcode] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState(null);

  const handleScan = () => {
    setBarcode("5449000000996")
  }

  const handleClear = () => {
    setBarcode();
    setLookupError();
    setProduct();
  }

  const handleToggleScan = () => {
    setScanning( !scanning)
  }

  const handleDetect = (value) => {
    setBarcode(value);
    setScanning(false);
  }

  useEffect( () => {
    const fetchBarcode = async () => {
      if(!barcode) return;

      const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      try {
        setLoading(true);
        setProduct(null);
        setLookupError(null);
        const response = await fetch(url)
        const data = await response.json();

        if(response.ok && data && data.status == 1) {
          setProduct(data.product.product_name);
          setLoading(false);
        } else if(data.status == 0){
          setLookupError('Product Not Found');
        }

      } catch (err) {
        console.error("Fetch Error: "+err);
      } finally {
        setLoading(false);
      }
    }

    fetchBarcode();
  }, [barcode])

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it</p>
      <button onClick={handleScan}>Simulate Scan</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleToggleScan}>{scanning ? "Stop Scanning" : "Start Scanning"}</button>

      <div>
        <ScanResult barcode={barcode}></ScanResult>
        {product && <div>Product Name: {product}</div>}
        {loading && <div>Fetching product...</div>}
        {lookupError && <div>Product Not Found</div>}
      </div>
      <div>
        {scanning && <Scanner onDetect={handleDetect}/>}
      </div>
    </div>
  )
}

export default App

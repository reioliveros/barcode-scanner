import { useEffect, useState } from 'react'
import ScanResult from './ScanResult';
import Scanner from './Scanner';

function App() {

  const [barcode, setBarcode] = useState();
  const [scanning, setScanning] = useState(true);

  const handleScan = () => {
    setBarcode("5449000000996")
  }

  const handleClear = () => {
    setBarcode();
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
        const response = await fetch(url)
        const data = await response.json();

        if(response.ok && data) {
          console.log("FOUND")
          console.log(data);
          console.log(data.product.product_name)
        }

      } catch (err) {
        console.error("Fetch Error: "+err);
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
      </div>
      <div>
        {scanning && <Scanner onDetect={handleDetect}/>}
      </div>
    </div>
  )
}

export default App

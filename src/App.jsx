import { useState } from 'react'
import ScanResult from './ScanResult';
import Scanner from './Scanner';

function App() {

  const [barcode, setBarcode] = useState();
  const [scanning, setScanning] = useState(true);

  const handleScan = () => {
    setBarcode("544900000000996")
  }

  const handleClear = () => {
    setBarcode();
  }

  const handleToggleScan = () => {
    setScanning( !scanning)
  }

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
        {scanning && <Scanner/>}
      </div>
    </div>
  )
}

export default App

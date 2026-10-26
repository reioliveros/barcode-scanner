import { useState } from 'react'
import ScanResult from './ScanResult';

function App() {

  const [barcode, setBarcode] = useState();

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it</p>
      <button onClick={() => {setBarcode("5449000000000996")}}>Simulate Scan</button>
      <button onClick={() => {setBarcode()}}>Clear</button>

      <div>
        <ScanResult barcode={barcode}></ScanResult>
      </div>
    </div>
  )
}

export default App

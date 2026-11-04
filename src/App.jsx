import { useEffect, useState } from 'react'
import { useProductLookup } from './hooks/useProductLookup';
import { useLocalStorage } from './hooks/useLocalStorage';
import ScanResult from './components/ScanResult';
import Scanner from './components/Scanner';
import ProductInfo from './components/ProductInfo';
import History from './components/History';
import SearchForm from './components/SearchForm'
import './App.css';

function App() {

  // States
  const [barcode, setBarcode] = useState(null);
  const [scanning, setScanning] = useState(true);
  const { status, product, lookedUp, retry} = useProductLookup(barcode)
  const [history, setHistory] = useLocalStorage('history', [])

  // Handle functions
  const handleScan = (value) => {
    setBarcode(value);
  }

  const handleClear = () => {
    setBarcode(null);
  }

  const handleToggleScan = () => {
    setScanning( prev => !prev )
  }

  const handleDetect = (value) => {
    setBarcode(value);
    setScanning(false);
  }

  const handleClearHistory = () => {
    setHistory([]);
  }

  useEffect( () => {
    if(status === 'found' || status === 'not-found'){  
      setHistory(prev => [
      {
        barcode: lookedUp, 
        name: (product?.product_name ||  "Unnamed Product"),
        brand: (product?.brands || "Unknown Brand"),
        found: (status === 'found')
  
      }, ...prev.filter(item => item.barcode !== lookedUp)].slice(0, 20))
    }
  }, [status])

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it or input a code below</p>
      <SearchForm onSearch={handleScan} onClear={handleClear}></SearchForm>

      {scanning && <Scanner onDetect={handleDetect}/>}
      <ScanResult barcode={barcode}></ScanResult>
      <ProductInfo status={status} product={product} onRetry={retry}></ProductInfo>
      <div><button className="scanBtn" onClick={handleToggleScan}>{scanning ? "Stop Scan" : "Scan Item"}</button></div>


      {history.length > 0 ? 
        <History
          history={history}
          onClear={handleClearHistory}
          onChangeItem={handleScan}
        />
        : <p>No scans yet</p>}
    </div>
  )
}

export default App
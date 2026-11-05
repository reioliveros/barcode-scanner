import { useCallback, useState } from 'react'
import { useProductLookup } from './hooks/useProductLookup';
import { useLocalStorage } from './hooks/useLocalStorage';
import ScanResult from './components/ScanResult';
import Scanner from './components/Scanner';
import ProductInfo from './components/ProductInfo';
import History from './components/History';
import SearchForm from './components/SearchForm'
import DateSheet from './components/DateSheet'
import './App.css';

function App() {

  // States
  const [barcode, setBarcode] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [history, setHistory] = useLocalStorage('history', [])

  // Handle functions

  const handleResult = useCallback(({barcode, product}) => {
    setHistory(prev => [
    {
      barcode: barcode, 
      name: (product?.product_name ||  "Unnamed Product"),
      brand: (product?.brands || "Unknown Brand"),
      found: Boolean(product)

    }, ...prev.filter(item => item.barcode !== barcode)].slice(0, 20))
  }, [setHistory]);

  const { status, product, retry } = useProductLookup(barcode, handleResult)

  const handleScan = (value) => {
    // refreshes when scanning the same barcode
    if(value === barcode) retry();
    setBarcode(value);
  }

  const handleClear = () => {
    setBarcode(null);
  }

  const handleToggleScan = () => {
    setScanning( prev => !prev )
  }

  const handleDetect = (value) => {
    if(value === barcode) retry();
    setBarcode(value);
    setScanning(false);
  }

  const handleClearHistory = () => {
    setHistory([]);
  }


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

      <DateSheet></DateSheet>
    </div>
  )
}

export default App
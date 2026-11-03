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
  const { product, loading, error} = useProductLookup(barcode)
  const [history, setHistory] = useLocalStorage('history', [])

  // Handle functions
  const handleScan = (value) => {
    // setBarcode("0770981095875")
    setBarcode(value);
  }

  const handleClear = () => {
    setCodeInput('');
    setBarcode(null);
    setLookupError(null);
    setProduct(null);
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
    setHistory(prev => [
    {
      barcode: barcode, 
      name: (product?.product_name ||  "Unnamed Product"),
      brand: (product?.brands || "Unknown Brand")

    }, ...prev.filter(item => item.barcode !== barcode)].slice(0, 20))
  }, [product])

  // useEffect for history state
  useEffect( () => {

    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it or input a code below</p>
      <SearchForm onSearch={handleScan}></SearchForm>
      <button className='clearBtn' onClick={handleClear}>Clear</button>

      {scanning && <Scanner onDetect={handleDetect}/>}
      <ScanResult barcode={barcode}></ScanResult>
      <ProductInfo product={product} loading={loading} error={error}></ProductInfo>
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

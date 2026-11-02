import { useEffect, useState } from 'react'
import ScanResult from './components/ScanResult';
import Scanner from './components/Scanner';
import ProductInfo from './components/ProductInfo';
import History from './components/History';
import SearchForm from './components/SearchForm'
import './App.css';

function App() {

  // States
  const [codeInput, setCodeInput] = useState('');
  const [barcode, setBarcode] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState(null);
  const [history, setHistory] = useState( () => {
    try {
      return JSON.parse(localStorage.getItem('history') || '[]');
    } catch(err) {
      console.error(err);
      return [];
    }
  })

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

  // Runs whenever barcode is changed
  useEffect( () => {
    let cancelled = false;
    if(!barcode){
      setLoading(false);
      return;
    }
    const lookup = async () => {

      const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      try {
        setLoading(true);
        setProduct(null);
        setLookupError(null);

        const response = await fetch(url)
        const data = await response.json();

        if (cancelled) return;

        // Scanned barcode and found information on it
        if(response.ok && data && data.status === 1) {
          // console.log(data);
          setProduct(data.product);
          setHistory(prev => [
            {
              barcode: barcode, 
              name: (data.product?.product_name ||  "Unnamed Product"),
              brand: (data.product?.brands || "Unknown Brand")

            }, ...prev.filter(item => item.barcode !== barcode)].slice(0, 20))

        } else {
          setLookupError('Error: Product Not Found');
        }

      } catch (err) {
        if(cancelled) return;
        console.error("Fetch Error: "+err);
        setLookupError('Could not connect to database');
      } finally {
        if(cancelled) return;
        setLoading(false);
      }
    }

    lookup();

    return () => {
      cancelled = true;
    }
  }, [barcode]);

  // useEffect for history state
  useEffect( () => {

    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it or input a code below</p>
      <SearchForm onSubmit={handleScan}></SearchForm>
      <button className='clearBtn' onClick={handleClear}>Clear</button>

      {scanning && <Scanner onDetect={handleDetect}/>}
      <ScanResult barcode={barcode}></ScanResult>
      <ProductInfo product={product} loading={loading} error={lookupError}></ProductInfo>
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

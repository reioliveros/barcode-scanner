import { useEffect, useState } from 'react'
import ScanResult from './ScanResult';
import Scanner from './Scanner';
import ProductInfo from './ProductInfo';
import History from './History';

function App() {

  // States
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
  const handleScan = () => {
    setBarcode("5449000000996")
  }

  const handleClear = () => {
    setBarcode(null);
    setLookupError(null);
    setProduct(null);
  }

  const handleToggleScan = () => {
    setScanning( !scanning)
  }

  const handleDetect = (value) => {
    setBarcode(value);
    setScanning(false);
  }

  const handleClearHistory = () => {
    setHistory([]);
  }

  const handleChangeItem = (value) => {
    setBarcode(value);
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
        if(response.ok && data && data.status == 1) {
          console.log(data);
          setProduct(data.product);
          setHistory(prev => [{barcode: barcode, name: (data.product?.product_name ||  "Unnamed Product")}, ...prev.filter(item => item.barcode !== barcode)].slice(0, 20))

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
      <p>Point your camera at a barcode to scan it</p>
      <button onClick={handleScan}>Simulate Scan</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleToggleScan}>{scanning ? "Stop Scanning" : "Start Scanning"}</button>

      <div>
        <ScanResult barcode={barcode}></ScanResult>
        <ProductInfo product={product} loading={loading} error={lookupError}></ProductInfo>
      </div>

      <div>
        {scanning && <Scanner onDetect={handleDetect}/>}
      </div>
      
      <div>Recently Scanned Items:</div>
      {history.length > 0 ? 
        <History
          history={history}
          onClear={handleClearHistory}
          onChangeItem={handleChangeItem}
        />
        : <p>No scans yet</p>}
    </div>
  )
}

export default App

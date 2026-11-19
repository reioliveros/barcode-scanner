import { useCallback, useState } from 'react'
import { useProductLookup } from './hooks/useProductLookup';
import { useLocalStorage } from './hooks/useLocalStorage';
import ScanResult from './components/ScanResult';
import Scanner from './components/Scanner';
import ProductInfo from './components/ProductInfo';
import History from './components/History';
import SearchForm from './components/SearchForm'
import DateSheet from './components/DateSheet'
import SaveForm from './components/SaveForm'
import {saveProduct, deleteProduct} from './utils/myProducts'
import './App.css';

function App() {

  // States
  const [barcode, setBarcode] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [history, setHistory] = useLocalStorage('history', []);
  const [myProducts, setMyProducts] = useLocalStorage('myProducts', {});

  // Handle functions

  const handleResult = useCallback(({barcode, product}) => {
    setHistory(prev => [
    {
      barcode: barcode, 
      brand: (product?.brands || null),
      name: (product?.product_name ||  null),
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

  const handleSave = (data) => {
    setMyProducts( (prev) => {
      return saveProduct(prev, barcode, data)
    })
  }

  const handleDelete = (barcodeToDelete) => {
    const userChoice = window.confirm("Are you sure you want to delete this entry's history and stored shelf data?")

    if(userChoice){
      setMyProducts( prev => {
        return deleteProduct(prev, barcodeToDelete)
      })
  
      setHistory(prev => {
        return prev.filter(item => item.barcode !== barcodeToDelete)
      })
    }
  }


  return (
    <div>
      <h1>Rei's Barcode Scanner</h1>
      <p>Point your camera at a barcode to scan it or input a code below</p>
      <SearchForm onSearch={handleScan} onClear={handleClear}></SearchForm>

      {scanning && <Scanner onDetect={handleDetect}/>}
      <ScanResult barcode={barcode}></ScanResult>
      <ProductInfo status={status} product={product} onRetry={retry}></ProductInfo>
      {barcode && status !== 'loading' && !myProducts[barcode] && status !== 'error' &&
        <SaveForm
          key={barcode}
          onSave={handleSave}
          initialBrand={product?.brands}
          initialName={product?.product_name}
          initialShelf={myProducts[barcode]?.shelfLifeDays}
        >
        </SaveForm>
      }
      <div><button className="scanBtn" onClick={handleToggleScan}>{scanning ? "Stop Scan" : "Scan Item"}</button></div>


      {history.length > 0 ? 
        <History
          history={history}
          myProducts={myProducts}
          onClear={handleClearHistory}
          onChangeItem={handleScan}
          onDelete={handleDelete}
        />
        : <p>No scans yet</p>}

      <DateSheet></DateSheet>
    </div>
  )
}

export default App
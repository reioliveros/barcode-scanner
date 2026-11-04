import { useEffect, useState } from "react";
import { fetchProduct } from '../api/openFoodFacts'

export function useProductLookup(barcode, onResult) {
  const [result, setResult] = useState(null) // null or {barcode, attempt, status, product}
  const [attempt, setAttempt] = useState(0);

  const retry = () => {
    setAttempt(n => n + 1)
  }

  useEffect(() => {
    if(!barcode) return;
    const controller = new AbortController();


    const lookup = async () => {
      try {
        const product = await fetchProduct(barcode, controller.signal);
        if (controller.signal.aborted) return;

        // Scanned barcode and found information on it
        setResult({barcode, attempt, status: (product ? 'found' : 'not-found'), product});
        onResult({barcode, product: product});


      } catch (err) {
        if (controller.signal.aborted) return;
        setResult({barcode, attempt, status: 'error', product: null})
        console.error("Lookup Error: "+err);
      }
    }

    lookup();

    return () => {
        controller.abort();
    }
  }, [barcode, attempt, onResult])

  if (!barcode) {
    return {status: 'idle', product: null, retry}
  }

  if(result && result.barcode === barcode && result.attempt === attempt){
    return {status: result.status, product: result.product, retry}
  }

  return {status: 'loading', product: null, retry}
}
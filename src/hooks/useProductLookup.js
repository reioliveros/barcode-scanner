import { useEffect, useState } from "react";
import { fetchProduct } from '../api/openFoodFacts'

export function useProductLookup(barcode) {
  const [status, setStatus] = useState(('idle' | 'loading' | 'found' | 'not-found' | 'error'))
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    if(!barcode){
      setStatus('idle');
      return;
    }

    const lookup = async () => {
      setStatus('loading');

      try {
        const result = await fetchProduct(barcode, controller.signal);

        if (controller.signal.aborted) return;

        // Scanned barcode and found information on it
        if(result){ setProduct(result); setStatus('found'); }
        else setStatus('not-found');


      } catch (err) {
        if(controller.signal.aborted) return;
        setStatus('error');
        console.error("Lookup Error: "+err);
      }
    }

    lookup();

    return () => {
        controller.abort();
    }
  }, [barcode])

  return { status, product}
}
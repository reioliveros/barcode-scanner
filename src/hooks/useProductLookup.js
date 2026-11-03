import { useEffect, useState } from "react";
import { fetchProduct } from '../api/openFoodFacts'

export function useProductLookup(barcode) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    if(!barcode){
      setProduct(null);
      setLoading(false);
      setError(null);
      return;
    }

    const lookup = async () => {
      setLoading(true);
      setProduct(null);
      setError(null);

      try {
        const result = await fetchProduct(barcode, controller.signal);

        if (controller.signal.aborted) return;

        // Scanned barcode and found information on it
        if(result){ setProduct(result) }
        else setError("Product Not Found");


      } catch (err) {
        if(controller.signal.aborted) return;
        setError('Could not connect to database');
        console.error("Lookup Error: "+err);
      } finally {
        if(!controller.signal.aborted) {
            setLoading(false);
        }
      }
    }

    lookup();

    return () => {
        controller.abort();
    }
  }, [barcode])

  return { product, loading, error}
}
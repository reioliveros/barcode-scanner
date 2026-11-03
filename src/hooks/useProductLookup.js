import { useEffect, useState } from "react";
import { fetchProduct } from '../api/openFoodFacts'

export function useProductLookup(barcode) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    if(!barcode){
      setLoading(false);
      return;
    }

    const lookup = async () => {
      try {
        setLoading(true);
        setProduct(null);
        setError(null);

        const data = await fetchProduct(barcode, controller.signal);

        if (controller.signal.aborted) return;

        // Scanned barcode and found information on it
        setProduct(data.product);
        if(!product) setError("Error: Product Not Found");

      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Lookup Error: "+err);
        setError('Could not connect to database');
      } finally {
        if(controller.signal.aborted) {
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
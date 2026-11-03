
export async function fetchProduct(barcode) {
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(response.ok && data && data.status === 1) {
            return data;
        } else {
            return null;
        }

    } catch (err) {
        console.error("Fetch Error: "+err);
    }
}
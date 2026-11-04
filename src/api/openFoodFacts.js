
export async function fetchProduct(barcode, signal) {
    const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`

    const response = await fetch(url, {signal});
    const data = await response.json();

    if(response.ok && data.status === 1) {
        return data.product;
    }

    return null;
}
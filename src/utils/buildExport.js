const EXPORT_VERSION = 1;

export function buildExport(products, date) {
    return {
        version: EXPORT_VERSION,
        exportedAt: date,
        products: products
    }
}
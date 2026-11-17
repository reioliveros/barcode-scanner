
export function saveProduct(prev, barcode, data) {
    return {...prev, [barcode]: {...data, addedAt: new Date().toISOString()}}
}

export function deleteProduct(prev, barcode) {
    const { [barcode]: removed, ...rest} = prev;
    return rest;
}
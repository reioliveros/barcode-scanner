
export function describeItem(logEntry, mine) {
    const name = mine?.name || logEntry?.name || "Unknown Product";
    const brand = mine?.brand || logEntry?.brand || "Unknown Brand";
    const shelfLifeDays = mine?.shelfLife || '???';

    let useBy = '???';
    if( !isNaN(shelfLifeDays) ) {
        const date = new Date();
        useBy = date.setDate(date.getDate() + shelfLifeDays)
    }
    console.log({name, brand, shelfLifeDays, useBy})
    return {name, brand, shelfLifeDays, useBy}
}
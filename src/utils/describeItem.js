export function describeItem(logEntry, mine) {
    const name = mine?.name || logEntry?.name || null;
    const brand = mine?.brand || logEntry?.brand || null;
    const shelfLifeDays = mine?.shelfLifeDays || null;

    let useBy = null;
    if( shelfLifeDays > 0 ) {
        const date = new Date();
        date.setDate(date.getDate() + shelfLifeDays);
        useBy = date.toDateString();
    }

    return {name, brand, shelfLifeDays, useBy}
}
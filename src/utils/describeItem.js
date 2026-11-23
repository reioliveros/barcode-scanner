import { daysFromToday } from "./daysFromToday";
export function describeItem(logEntry, mine) {
    const name = mine?.name || logEntry?.name || null;
    const brand = mine?.brand || logEntry?.brand || null;
    const shelfLifeDays = mine?.shelfLifeDays || null;
    const useBy = daysFromToday(shelfLifeDays)

    return {name, brand, shelfLifeDays, useBy}
}
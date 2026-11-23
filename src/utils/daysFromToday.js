
export function daysFromToday(days) {
    let date = new Date();
    if(days && Number.isInteger(days) && days > 0){
        date.setDate(date.getDate() + days)
        return date.toDateString();
    }
    return null;
}
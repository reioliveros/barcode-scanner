const DateSheet = () => {
    const today = new Date();

    const daysFromToday = (days) => {
        let date = new Date();
        date.setDate(date.getDate() + days);
        return date.toDateString();
    }

    const days = [5, 7, 10, 14, 21, 30, 45, 90];

    return (
        <div className="datesSheet">
        <div>Todays Date: {today.toDateString()}</div>
        <table >
            <caption>Shelf Life Dates Sheet</caption>
            <tbody>
            <tr>
                <th>Days From Today</th>
                <th>Date</th>
            </tr>

            {days.map( (day, i) => (
                <tr key={i}>
                    <td>{day}</td>
                    <td>{daysFromToday(day)}</td>
                </tr>
            ))}

            </tbody>
        </table>
        </div>
    );
}
 
export default DateSheet;
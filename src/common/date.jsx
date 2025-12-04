const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const getDay = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]}`;
}

export default getDay;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDate = (timestamp) => {
    const date = new Date(timestamp);

    return `${date.getDate()} ${months[date.getMonth()]}`;
};

export default getDate;
const getTimeWithTimeZone = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth()+1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    let timeZone = d.toString().slice(28,31);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}${timeZone}`;
} 

export default getTimeWithTimeZone;
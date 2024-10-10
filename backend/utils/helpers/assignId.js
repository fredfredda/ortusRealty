const assignId = () => {
    let t = new Date()
    let ms = t.getMilliseconds();
    let s = t.getSeconds();
    let min = t.getMinutes();
    let hr = t.getHours();
    let d = t.getDate();
    let mo = t.getMonth();
    let yr = t.getFullYear();

    return `${yr}${mo}${d}${hr}${min}${s}${ms}`;
}

export default assignId;
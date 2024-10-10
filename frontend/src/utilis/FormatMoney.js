const formatMoney = (amount) => {
    // Ensure the amount is a number and round it to two decimal places
    var num = parseFloat(amount).toFixed(2);

    // Split the number into the integer and decimal parts
    var parts = num.split('.');
    var integerPart = parts[0];
    var decimalPart = parts[1];

    // Add commas as thousands separators
    var formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted integer part with the decimal part
    return formattedIntegerPart;
}

export default formatMoney;
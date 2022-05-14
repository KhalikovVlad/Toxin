const currencyFormat = function(currency, number) {
    const result = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
    .formatToParts(number)
    .map(({type, value}) => {
        switch (type) {
            case 'literal': return ''; 
            default : return value; 
        } 
    })
    .reduce((string, part) => string + part);

    return result;
}

module.exports = currencyFormat;
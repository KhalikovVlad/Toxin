const currencyNumberConverter = function(str) {
    const result =  Number(str.replace(/[^0-9.-]+/g,""));

    return result;
}

module.exports = currencyNumberConverter;
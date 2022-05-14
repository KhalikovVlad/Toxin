const pluralize = function (plural, number) {
    const rule = new Intl.PluralRules('ru-RU').select(number);
    const result = plural[rule];

    return result;
};

module.exports = pluralize;
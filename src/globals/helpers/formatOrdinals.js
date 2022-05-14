const formatOrdinals = function (suffixes, number) {
    const rule = new Intl.PluralRules('ru-RU', {
        type: 'ordinal'
    }).select(number);

    return `${number}${suffixes[rule]}`;
}

module.exports = formatOrdinals;
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';

const currencyFormat = require('../../globals/helpers/currencyFormat.js');

const rangeSlider = document.querySelector('.js-slider');
const sliderRange = rangeSlider.querySelector('.js-slider__range');
const input = rangeSlider.querySelector('.js-slider__input');
const lang = sliderRange.dataset.lang;
const i18n = require('../../components/range-slider/i18n.json')[lang];
const rangeData = {
    range: {
        'min': Number(JSON.parse(sliderRange.dataset.range)[0]),
        'max': Number(JSON.parse(sliderRange.dataset.range)[1])
    },
    initValue: JSON.parse(sliderRange.dataset.initValue),
    step: Number(sliderRange.dataset.step),
    margin: Number(sliderRange.dataset.margin)
};

const updateInputValue = (values) => {
    const inputValue = values.reduce((result, value) => `${result}${value} - `, '').slice(0, -2);
    input.value = inputValue;
};
function setCustomClasses() {
    noUiSlider.cssClasses.base += ' slider__base';
    noUiSlider.cssClasses.connect += ' slider__connect';
    noUiSlider.cssClasses.handle += ' slider__handle js-slider__handle';
    noUiSlider.cssClasses.tooltip += ' slider__tooltip';
};
function setA11lyToHandles() {
    const { RANGE_FROM, RANGE_TO } = i18n;
    const handles = document.querySelectorAll('.js-slider__handle');

    handles[0].setAttribute('aria-label', RANGE_FROM);
    handles[1].setAttribute('aria-label', RANGE_TO);
}
function setSlider() {
    const { CURRENCY } = i18n;

    noUiSlider.create(sliderRange, {
        connect: true,
        start: rangeData.initValue,
        step: rangeData.step,
        margin: rangeData.margin,
        range: rangeData.range,
        tooltips: true,
        format: {
            to: (value) => currencyFormat(lang, CURRENCY, value),
            from: (value) => Number(value.replace(' - ', ''))
        }
    });
    sliderRange.noUiSlider.on('update', updateInputValue);
};
setCustomClasses();
setSlider();
setA11lyToHandles();
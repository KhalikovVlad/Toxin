import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';

const currencyFormat = require('../../globals/helpers/currencyFormat.js');

const rangeSlider = document.querySelector('.js-slider');
const rangeSliderRange = rangeSlider.querySelector('.js-slider__range');
const rangeSliderInput = rangeSlider.querySelector('.js-slider__input');
const rangeData = {
    range: {
        'min': Number(JSON.parse(rangeSliderRange.dataset.range)[0]),
        'max': Number(JSON.parse(rangeSliderRange.dataset.range)[1])
    },
    initValue: JSON.parse(rangeSliderRange.dataset.initValue),
    step: Number(rangeSliderRange.dataset.step),
    margin: Number(rangeSliderRange.dataset.margin)
};

const updateInputValue = (values) => {
    const inputValue = values.reduce((result, value) => `${result}${value} - `, '').slice(0, -2);
    rangeSliderInput.value = inputValue;
};
function setCustomClasses() {
    noUiSlider.cssClasses.base += ' slider__base';
    noUiSlider.cssClasses.connect += ' slider__connect';
    noUiSlider.cssClasses.handle += ' slider__handle js-slider__handle';
    noUiSlider.cssClasses.tooltip += ' slider__tooltip';
};
function setA11lyToHandles() {
    const handles = document.querySelectorAll('.js-slider__handle');

    handles[0].setAttribute('aria-label', 'Диапазон от');
    handles[1].setAttribute('aria-label', 'Диапазон до');
}
function setSlider() {
    noUiSlider.create(rangeSliderRange, {
        connect: true,
        start: rangeData.initValue,
        step: rangeData.step,
        margin: rangeData.margin,
        range: rangeData.range,
        tooltips: true,
        format: {
            to: (value) => currencyFormat('RUB', value),
            from: (value) => Number(value.replace(' - ', ''))
        }
    });
    rangeSliderRange.noUiSlider.on('update', updateInputValue);
};
setCustomClasses();
setSlider();
setA11lyToHandles();
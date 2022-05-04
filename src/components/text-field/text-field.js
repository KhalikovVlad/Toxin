import Cleave from 'cleave.js';

const textField = document.querySelector('.js-text-field');
const input = textField.querySelector('.js-text-field__input');
const hiddenInput = textField.querySelector('.js-text-field__hidden-input');
const dateMask = input.hasAttribute('data-date-mask');


function relocateHiddenInputFocus() {
    hiddenInput.addEventListener('focus', (e) => input.focus());
};

function setDateMask() {
    new Cleave(input, {
        date: true,
        dateMin: '1900-01-01',
        dateMax: '2022-12-31',
        datePattern: ["d", "m", "Y"],
        delimiter: '.'
    });
};

if (dateMask) {
    setDateMask();
};
if (hiddenInput) {
    relocateHiddenInputFocus();
};
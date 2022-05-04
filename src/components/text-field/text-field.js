import Cleave from 'cleave.js';

const textField = document.querySelector('.js-text-field');
const input = textField.querySelector('.js-text-field__input');
const hiddenInput = textField.querySelector('.js-text-field__hidden-input');
const inputPlaceholder = input.dataset.placeholder;
const dateMask = input.hasAttribute('data-date-mask');
const inputTitle = input.dataset.title;


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
 
function setPlaceholder(placeholder) {
    if (input.type === 'button') {
        input.value = placeholder ? placeholder : inputPlaceholder;
    } else {
        placeholder ? input.setAttribute('placeholder', placeholder) : input.setAttribute('placeholder', inputPlaceholder);
    }
};

function setTitle(title) {
    title ? input.setAttribute('title', title) : input.setAttribute('title', inputTitle);
};

function setValue(value) {
    if (input.getAttribute('type') === 'button') {
        hiddenInput.value = value ? value : '';
    } else {
        input.value = value ? value : '';
    }
};
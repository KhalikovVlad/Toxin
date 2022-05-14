import Cleave from 'cleave.js';

const textField = document.querySelector('.js-text-field');
const textFieldInput = textField.querySelector('.js-text-field__input');
const textFieldHiddenInput = textField.querySelector('.js-text-field__hidden-input');
const textFieldPlaceHolder = textFieldInput.dataset.placeholder;
const textFieldTitle = textFieldInput.dataset.title;
const dateMask = textFieldInput.hasAttribute('data-date-mask');


function relocateHiddenInputFocus() {
    textFieldHiddenInput.addEventListener('focus', (e) => textFieldInput.focus());
};

function setDateMask() {
    new Cleave(textFieldInput, {
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
if (textFieldHiddenInput) {
    relocateHiddenInputFocus();
};

function setPlaceholder(placeholder) {
    if (textFieldInput.type === 'button') {
        textFieldInput.value = placeholder ? placeholder : textFieldPlaceHolder;
    } else {
        placeholder ? textFieldInput.setAttribute('placeholder', placeholder) : textFieldInput.setAttribute('placeholder', textFieldPlaceHolder);
    };
};

function setTitle(title) {
    title ? textFieldInput.setAttribute('title', title) : textFieldInput.setAttribute('title', textFieldTitle);
};

function setValue(value) {
    if (textFieldInput.getAttribute('type') === 'button') {
        textFieldHiddenInput.value = value ? value : '';
    } else {
        textFieldInput.value = value ? value : '';
    };
};

export {setPlaceholder, setTitle, setValue};
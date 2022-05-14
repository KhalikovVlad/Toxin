import '../../components/dropdown/counter/counter.js';
import { setPlaceholder, setTitle, setValue } from  '../../components/text-field/text-field.js';

const normalizeStr = require('../../globals/helpers/normalizeStr.js');
const pluralize = require('../../globals/helpers/pluralize.js');

document.querySelectorAll('.js-dropdown').forEach(function (dropdownWrapper) {    
    var textField = dropdownWrapper.querySelector('.js-dropdown__text-field');
    const button = dropdownWrapper.querySelector('.js-dropdown__button');
    const container = dropdownWrapper.querySelector('.js-dropdown__container');
    const counters = container.querySelectorAll('.js-counter');
    const autoApply = dropdownWrapper.hasAttribute('data-auto-apply');
    const applyButton = container.querySelector('.js-dropdown__apply-button');
    const clearButton = container.querySelector('.js-dropdown__clear-button');
    const countersData = {};

    function setCounterChangeEventListeners() {
        counters.forEach(counter => counter.addEventListener('counter-changed', (e) => {
            const name = e.detail.name;
            const value = e.detail.value;
            const plural = e.detail.plural;
            const isBound = e.detail.isBound;
            const boundplural = e.detail.boundPlural;
            const boundName = e.detail.boundName;

            if (isBound) {
                if (!countersData[boundName])
                    countersData[boundName] = {
                        name: boundName,
                        isBound: true,
                        plural: boundplural,
                        originData: {}
                    }
                countersData[boundName].originData[name] = { name };
                countersData[boundName].originData[name].plural = plural;
                countersData[boundName].originData[name].value = value;
                countersData[boundName].value = Object.values(countersData[boundName].originData).reduce((sumValue, data) => sumValue + data.value, 0);
            } else {
                countersData[name] = {
                    name: name,
                    plural: plural,
                    value: value,
                    isBound: false
                }
            }
        })); 
    };
    


    const placehodlerStringMaker = (str, item) => (item.value !== 0) ? `${str} ${item.value} ${pluralize(item.plural, item.value)},` : `${str}`;
    const jsonObjStringMaker = (str, item) => (item.value !== 0) ? `${str} "${item.name}": "${item.value}",` : `${str}`;

    function getStringFromCounters(counters, stringMaker, displayOrigin) {
        const str = Object.values(counters).reduce((str, counter) => {
                if (counter.isBound && displayOrigin) {
                    return `${str} ${getStringFromCounters(counter.originData, stringMaker, displayOrigin)},`;
                } else {
                    return stringMaker(str, counter);
                }
            }, '')
            .slice(1, -1);

        return str;
    };

    function setTextFieldPlaceholder() {
        const placeholder = normalizeStr(getStringFromCounters(countersData, placehodlerStringMaker, false));

        textField = setPlaceholder(placeholder);
    };

    function setTextFieldTitle() {
        const title = getStringFromCounters(countersData, placehodlerStringMaker, true);

        textField = setTitle(title);
    };

    function setTextFieldValue() {
        const value = getStringFromCounters(countersData, jsonObjStringMaker, true);

        textField = setValue(value ? `{${value}}` : '');
    };

    function updateTextField() {
        setTextFieldPlaceholder();
        setTextFieldValue();
        setTextFieldTitle();
    };

    const setClearButtonDisabledState = () => {
        const counters = Object.values(countersData);
        const isDisabled = counters.reduce((acc, counter) => { 
            if (counter.value) { acc = false; }

            return acc;
        }, true);

        clearButton.disabled = isDisabled;
    };
    
    const handleManualApply = (e) => {
        if (e.target === applyButton) { 
            updateTextField(); 
            dropdownWrapper.classList.remove('dropdown_expanded');
        }

        if (e.target === clearButton) {
            counters.forEach((counter) => counter.dispatchEvent(new CustomEvent('counter-clear')));

            updateTextField();
        }

        setClearButtonDisabledState();
    };

    function setManualApply() {
        applyButton.addEventListener('click', handleManualApply);
        clearButton.addEventListener('click', handleManualApply);

        setClearButtonDisabledState();
    };

    function setAutoApply() {
        counters.forEach((counter) => counter.addEventListener('counter-changed', (e) => updateTextField()));
    };

    function setCounters() {
        counters.forEach((counter) => counter);
    };

    const setApplyMode = () => autoApply ? setAutoApply() : setManualApply();

    setCounterChangeEventListeners();
    setCounters();
    setApplyMode();
    updateTextField();

    // click on dropdown for open/close dropdown-list
    dropdownWrapper.addEventListener('click', function (e) {
        if (e.target === button) {
            dropdownWrapper.classList.toggle('dropdown_expanded')
        }
    });

    // click on other place for close dropdown
    document.addEventListener('click', (e) => {
        const click =  e.composedPath().includes(dropdownWrapper);
        if (!click) {
            dropdownWrapper.classList.remove('dropdown_expanded');
        }
    });

    // click ESC for open/close dropdown
    dropdownWrapper.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdownWrapper.classList.remove('dropdown_expanded');
        }
    });
});
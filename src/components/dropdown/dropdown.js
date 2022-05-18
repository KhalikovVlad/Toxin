import { TextField } from '../../components/text-field/text-field.js';
import { Counter } from '../../components/dropdown/counter/counter.js';

const normalizeStr = require('../../globals/helpers/normalizeStr.js');
const pluralize = require('../../globals/helpers/pluralize.js');

class Dropdown {
    constructor(node) {
        this.root = node;
        this.textField = this.root.querySelector('.js-dropdown__text-field');
        this.button = this.root.querySelector('.js-dropdown__button')
        this.container = this.root.querySelector('.js-dropdown__container')
        this.counters = this.root.querySelectorAll('.js-counter');
        this.inputs = this.root.querySelectorAll('.js-counter__input');
        this.autoApply = this.root.hasAttribute('data-auto-apply');
        this.countersData = {};

        this.init();
    };

    setCounterChangeEventListeners() {
        this.counters.forEach(counter => counter.addEventListener('counter-changed', (e) => {
            const name = e.detail.name;
            const value = e.detail.value;
            const plural = e.detail.plural;
            const isBound = e.detail.isBound;
            const boundplural = e.detail.boundPlural;
            const boundName = e.detail.boundName;

            if (isBound) {
                if (!this.countersData[boundName])
                    this.countersData[boundName] = {
                        name: boundName,
                        isBound: true,
                        plural: boundplural,
                        originData: {}
                    }
                this.countersData[boundName].originData[name] = { name };
                this.countersData[boundName].originData[name].plural = plural;
                this.countersData[boundName].originData[name].value = value;
                this.countersData[boundName].value = Object.values(this.countersData[boundName].originData).reduce((sumValue, data) => sumValue + data.value, 0);
            } else {
                this.countersData[name] = {
                    name: name,
                    plural: plural,
                    value: value,
                    isBound: false
                }
            }
        })); 
    }

    getInputSizeInChar() {
        const style = getComputedStyle(this.textField);
        const inputWidth = parseInt(style.width) - 35;
        const inputSizeInChar = Math.floor(inputWidth * 0.125);

        return inputSizeInChar;
    }

    placehodlerStringMaker = (str, item) => (item.value !== 0) ? `${str} ${item.value} ${pluralize(item.plural, item.value)},` : `${str}`;
    jsonObjStringMaker = (str, item) => (item.value !== 0) ? `${str} "${item.name}": "${item.value}",` : `${str}`;

    getStringFromCounters(counters, stringMaker, displayOrigin) {
        const str = Object.values(counters).reduce((str, counter) => {
                if (counter.isBound && displayOrigin) {
                    return `${str} ${this.getStringFromCounters(counter.originData, stringMaker, displayOrigin)},`;
                } else {
                    return stringMaker(str, counter);
                }
            }, '')
            .slice(1, -1);

        return str;
    }

    setTextFieldPlaceholder() {
        const placeholder = normalizeStr(this.getStringFromCounters(this.countersData, this.placehodlerStringMaker, false), this.getInputSizeInChar());

        new TextField(this.textField).setPlaceholder(placeholder);
    }

    setTextFieldTitle() {
        const title = this.getStringFromCounters(this.countersData, this.placehodlerStringMaker, true);

        new TextField(this.textField).setTitle(title);
    }

    setTextFieldValue() {
        const value = this.getStringFromCounters(this.countersData, this.jsonObjStringMaker, true);

        new TextField(this.textField).setValue(value ? `{${value}}` : '');
    }

    updateTextField() {
        this.setTextFieldPlaceholder();
        this.setTextFieldValue();
        this.setTextFieldTitle();
    }

    setClearButtonDisabledState = () => {
        const counters = Object.values(this.countersData);
        const isDisabled = counters.reduce((acc, counter) => { 
            if (counter.value) { acc = false; }

            return acc;
        }, true);

        this.clearButton.disabled = isDisabled;
    }

    handleManualApply = (e) => {
        if (e.target === this.applyButton) { 
            
            this.updateTextField(); 
            this.root.classList.remove('dropdown_expanded');
        };

        if (e.target === this.clearButton) {
            this.counters.forEach((counter) => counter.dispatchEvent(new CustomEvent('counter-clear')));

            this.updateTextField();
        }

        this.setClearButtonDisabledState();
    }

    setManualApply() {     
        this.applyButton = this.root.querySelector('.js-dropdown__apply-button');
        this.clearButton = this.root.querySelector('.js-dropdown__clear-button');

        this.applyButton.addEventListener('click', this.handleManualApply);
        this.clearButton.addEventListener('click', this.handleManualApply);

        this.setClearButtonDisabledState();
    }

    setAutoApply() {
        this.counters.forEach((counter) => counter.addEventListener('counter-changed', (e) => this.updateTextField()));
    }

    setCounters() {
        this.counters.forEach((counter) => new Counter(counter));
    }

    setApplyMode = () => this.autoApply ? this.setAutoApply() : this.setManualApply();

    setExpanderClicks() {
        const button = this.button;
        const dropdown = this.root;
        // click on dropdown for open/close dropdown-list
        dropdown.addEventListener('click', function (e) {
            if (e.target === button) {
                dropdown.classList.toggle('dropdown_expanded');
            }
        });
        // click on other place for close dropdown-list
        document.addEventListener('click', (e) => {
            const click = e.composedPath().includes(dropdown);
            if (!click) {
                dropdown.classList.remove('dropdown_expanded');
            }
        });
    }
        // press ESC for close dropdown-list
    setExpanderKeydown() {
        const dropdown = this.root;
        dropdown.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('dropdown_expanded');
            }
        })
    }

    setExpanders() {
        this.setExpanderClicks();
        this.setExpanderKeydown();
    }

    init() {
        this.setCounterChangeEventListeners();
        this.setCounters();
        this.setApplyMode();
        this.updateTextField();
        this.setExpanders();
    }
};

const dropdowns = document.querySelectorAll('.js-dropdown');
if (dropdowns.length > 0) {
    dropdowns.forEach((node) => new Dropdown(node));
}
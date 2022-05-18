import { Datepicker } from '../../components/date-dropdown/datepicker/datepicker';
import { TextField } from '../../components/text-field/text-field';

class DateDropdown {
    constructor(node) {
        this.root = node;
        this.datepicker = this.root.querySelector('.js-datepicker');
        this.isTwo = this.root.hasAttribute('data-is-two');
        this.autoApply = this.root.hasAttribute('data-auto-apply');

        this.init();
    }

    setDateAutoUpdate() {
        this.datepicker.addEventListener('datepicker-date-sent', (event) => {
            this.dates = event.detail.dates ? event.detail.dates.map((date) => new Date(date).getTime()) : '';
        });
    }

    getFormattedDates(dates, format) {
        const formattedDates = dates.map((date) => date ? new Intl.DateTimeFormat('ru-RU', format).format(date) : '');

        return formattedDates;
    }

    getFormattedDateRange(dates, format) {
        const formattedDateRange = dates ? dates.reduce((range, date) => date ? `${range} ${new Intl.DateTimeFormat('ru-RU', format).format(date)} - ` : range, '').slice(1, -2) : '';

        return formattedDateRange;
    }

    // two text fields

    setTwoTextFieldPlaceholders() {
        this.textFields.forEach((textField, index) => {
            const placeholder = this.dates ? this.getFormattedDates(this.dates, { day: '2-digit', month: '2-digit', year: 'numeric' })[index] : '';

            new TextField(textField).setPlaceholder(placeholder);
        });
    }

    setTwoTextFieldTitles() {
        this.textFields.forEach((textField, index) => {
            const title = this.dates ? this.getFormattedDates(this.dates, { day: 'numeric', month: 'long', year: 'numeric' })[index] : '';

            new TextField(textField).setTitle(title);
        });
    }

    setTwoTextFieldValues() {
        this.textFields.forEach((textField, index) => {
            const value = this.dates ? new Date(this.dates[index]).toISOString() : '';

            new TextField(textField).setValue(value);
        });
    }

    updateTwoTextFields() {
        this.setTwoTextFieldValues();
        this.setTwoTextFieldPlaceholders();
        this.setTwoTextFieldTitles();
    }

    setTwoMode() {
        this.textFields = this.root.querySelectorAll('.js-date-dropdown__text-field');
        this.buttons = this.root.querySelectorAll('.js-date-dropdown__button');
        this.updateTextField = this.updateTwoTextFields;
    }

    // single text field

    setSingleTextFieldPlaceholder() {
        const placeholder = this.dates ? this.getFormattedDateRange(this.dates, { day: 'numeric', month: 'short' }) : '';

        new TextField(this.textField).setPlaceholder(placeholder);
    }

    setSingleTextFieldTitle() {
        const title = this.dates ? this.getFormattedDateRange(this.dates, { day: 'numeric', month: 'long' }) : '';

        new TextField(this.textField).setTitle(title);
    }

    setSingleTextFieldValue() {
        const value = this.dates ? `"${[new Date(this.dates[0]).toISOString(), new Date(this.dates[1]).toISOString()]}"` : '';

        new TextField(this.textField).setValue(value);
    }

    updateSingleTextField() {
        this.setSingleTextFieldValue();
        this.setSingleTextFieldPlaceholder();
        this.setSingleTextFieldTitle();
    }

    setSingleMode() {
        this.textField = this.root.querySelector('.js-date-dropdown__text-field');
        this.button = this.root.querySelector('.js-date-dropdown__button');
        this.updateTextField = this.updateSingleTextField;
    }

    setDatepicker() {
        new Datepicker(this.datepicker);
    }

    addChangedEvent = () => {
        this.root.dispatchEvent(new CustomEvent('date-dropdown-changed', {
            bubbles: true,
            detail: {
                dates: this.dates
            }
        }));
    }

    setAutoApply() {
        this.datepicker.addEventListener('datepicker-date-sent', () => {
            this.updateTextField();
            this.addChangedEvent();
        });
    }

    addDatepickerClearEvent() {
        this.datepicker.dispatchEvent(new CustomEvent('datepicker-clear'));
    }

    setClearButtonDisabledState = () => this.clearButton.disabled = this.dates ? false : true;

    handleManualApply = (e) => {
        if (e.target === this.clearButton) {
            this.dates = '';
            this.addDatepickerClearEvent();
        }
        this.updateTextField();
        this.addChangedEvent();
        this.setClearButtonDisabledState();
    }

    setManualApply() {
        this.applyButton = this.root.querySelector('.js-date-dropdown__apply-button');
        this.clearButton = this.root.querySelector('.js-date-dropdown__clear-button');

        this.applyButton.addEventListener('click', this.handleManualApply);
        this.clearButton.addEventListener('click', this.handleManualApply);

        document.addEventListener('DOMContentLoaded', this.addChangedEvent);
        this.setClearButtonDisabledState();
    }

    setViewMode = () => this.isTwo ? this.setTwoMode() : this.setSingleMode();

    setApplyMode = () => this.autoApply ? this.setAutoApply() : this.setManualApply();

    setExpanderDropdownClick() {
        const dateDropdown = this.root;

        this.root.querySelectorAll('.js-date-dropdown__button').forEach(function (buttons){
            dateDropdown.addEventListener('click', function (e) {
                if (e.target === buttons) {
                    dateDropdown.classList.toggle('date-dropdown_expanded');
                }
            });
        });

    }

    setExpanderDocumentClick() {
        const dateDropdown = this.root;

        document.addEventListener('click', (e) => {
            const click = e.composedPath().includes(dateDropdown);
            if (!click) {
                dateDropdown.classList.remove('date-dropdown_expanded');
            }
        });

    }

    setExpanderKeydown() {
        const dateDropdown = this.root;
        dateDropdown.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                dateDropdown.classList.remove('date-dropdown_expanded');
            }
        })
    }

    setExpanderApplyButton() {
        const dateDropdown = this.root;
        
        this.isTwo && !this.autoApply || !this.isTwo && !this.autoApply ? this.applyButton.addEventListener('click', function() {
            dateDropdown.classList.remove('date-dropdown_expanded')
        }) : '';
    }

    setExpanders() {
        this.setExpanderDropdownClick();
        this.setExpanderDocumentClick();
        this.setExpanderKeydown();
        this.setExpanderApplyButton();
    }

    init() {
        this.setDateAutoUpdate();
        this.setViewMode();
        this.setApplyMode();
        this.updateTextField();
        this.setExpanders();
    }
}

const dateDropdowns = document.querySelectorAll('.js-date-dropdown');
if (dateDropdowns.length > 0) {
    dateDropdowns.forEach((node) => new DateDropdown(node));
}
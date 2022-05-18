import '../../components/date-dropdown/date-dropdown.js';
import '../../components/dropdown/dropdown.js';

const pluralize = require('../../globals/helpers/pluralize.js');
const currencyFormat = require('../../globals/helpers/currencyFormat.js');
const currencyNumberConverter = require('../../globals/helpers/currencyNumberConverter.js');

class FormBooking {
    constructor(node) {
        this.root = node;
        this.dateDropdown = this.root.querySelector('.js-form-booking__date-dropdown');
        this.periodContainer = this.root.querySelector('.js-form-booking__period');
        this.rentContainer = this.root.querySelector('.js-form-booking__rent');
        this.summaryContainer = this.root.querySelector('.js-form-booking__summary');
        this.discountContainer = this.root.querySelector('.js-form-booking__discount');
        this.serviceContainer = this.root.querySelector('.js-form-booking__service');
        this.additionContainer = this.root.querySelector('.js-form-booking__addition');
        this.priceContainer = this.root.querySelector('.js-form-booking__price');
        this.input = this.root.querySelector('.js-form-booking__input');
        this.currency = this.root.dataset.currency;

        this.init()
    }

    setPeriodInnerText(dates) {
        this.arrivalTimestamp = dates[0];
        this.departureTimestamp = dates[1];
        this.rentPeriod = this.departureTimestamp && this.arrivalTimestamp ? (this.departureTimestamp - this.arrivalTimestamp) / 1000 / 24 / 60 / 60 : 0;

        this.periodContainer.innerText = `${this.rentPeriod} ${pluralize({'one': 'сутки', 'few': 'суток', 'many': 'суток'}, this.rentPeriod)}`;
    }

    setSummaryInnerText() {
        this.rentPrice = currencyNumberConverter(this.rentContainer.innerText);
        this.summaryPrice = this.rentPrice * this.rentPeriod;

        this.summaryContainer.innerText = currencyFormat(this.currency, this.summaryPrice);
    }

    setPriceInnerText() {
        this.discount = currencyNumberConverter(this.discountContainer.innerText);
        this.servicePrice = currencyNumberConverter(this.serviceContainer.innerText);
        this.additionPrice = currencyNumberConverter(this.additionContainer.innerText);

        this.price = this.summaryPrice + this.servicePrice + this.additionPrice - this.discount;
        this.priceContainer.innerText = this.price > 0 ? currencyFormat(this.currency, this.price) : currencyFormat(this.currency, 0);
    }

    setInputValue() {
        this.input.value = this.price > 0 ? this.price : 0;
    }

    setEventListeners() {
        this.root.addEventListener('date-dropdown-changed', (event) => {
            event.stopPropagation();
            const dates = event.detail.dates;

            this.setPeriodInnerText(dates);
            this.setSummaryInnerText();
            this.setPriceInnerText();
            this.setInputValue();
        })
    }

    init() {
        this.setEventListeners();
    }
};
const formsBooking = document.querySelectorAll('.js-form-booking');
if (formsBooking.length > 0) {
    formsBooking.forEach((node) => new FormBooking(node));
};
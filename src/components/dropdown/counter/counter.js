export class Counter {
    constructor(node) {
        this.root = node;
        this.decrement = this.root.querySelector('.js-counter__control_decrement');
        this.increment = this.root.querySelector('.js-counter__control_increment');
        this.input = this.root.querySelector('.js-counter__input');
        this.value = Number(this.input.value);
        this.minValue = Number(this.input.getAttribute('aria-valuemin'));
        this.maxValue = Number(this.input.getAttribute('aria-valuemax'));

        this.init();
    }

    normalizeRange() {
        this.increment.disabled = this.value >= this.maxValue;
        this.decrement.disabled = this.value <= this.minValue;
    }
        
    sendCounterData = () => {
        const name = this.input.name;
        const value = Number(this.input.value);
        const plural = JSON.parse(this.input.dataset.plural);
        const isBound = this.input.hasAttribute('data-is-bound');
        const boundName = isBound ? this.input.dataset.boundName : '';
        const boundPlural = isBound ? JSON.parse(this.input.dataset.boundPlural) : '';
        
        this.root.dispatchEvent(new CustomEvent('counter-changed', {
            detail: {
                name: name,
                value: value,
                plural: plural,
                isBound: isBound,
                boundName: boundName,
                boundPlural: boundPlural
            }
        }));
    }
        
    handleCounterChange = (e) => {
        if (e.target === this.increment) {
            this.value = this.value + 1;
            this.input.focus();
        }
        if (e.target === this.decrement) {
            this.value = this.value - 1;
            this.input.focus();
        }
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            this.value < this.maxValue ? this.increment.click() : false;
        }
        if (e.code === 'ArrowDown') {                    
            e.preventDefault();
            this.value > this.minValue ? this.decrement.click() : false;
        }
        
        this.input.value = this.value;

        this.input.setAttribute('aria-valuenow', this.input.value);
        
        this.sendCounterData();
        this.normalizeRange();
    }
        
    addEventListeners() {
        this.root.addEventListener('counter-clear', () => {
            this.value = 0;
            this.input.value = this.value;
        
            this.sendCounterData();
            this.normalizeRange();
        })

        this.increment.addEventListener('click', this.handleCounterChange);   
        this.decrement.addEventListener('click', this.handleCounterChange);
        this.input.addEventListener('keydown', this.handleCounterChange);
        this.input.addEventListener('input', this.handleCounterChange);
    }
    
    init() {
        this.normalizeRange();
        this.sendCounterData();
        this.addEventListeners();
    }
};

const counters = document.querySelectorAll('.js-counter');
if (counters.length > 0) {
    counters.forEach((node) => new Counter(node));
}
document.querySelectorAll('.js-counter').forEach(function (counterWrapper) {
    const counter = document.querySelector('.js-counter');
    const decrement = counterWrapper.querySelector('.js-counter__control_decrement');
    const increment = counterWrapper.querySelector('.js-counter__control_increment');
    const input = counterWrapper.querySelector('.js-counter__input');
    const minValue = Number(input.getAttribute('aria-valuemin'));
    const maxValue = Number(input.getAttribute('aria-valuemax'));
    var inputValue = Number(input.value);

    function normalizeRange() {
        increment.disabled = inputValue >= maxValue;
        decrement.disabled = inputValue <= minValue;
    };

    const sendCounterData = () => {
        const name = input.name;
        const value = Number(input.value);
        const plural = JSON.parse(input.dataset.plural);
        const isBound = input.hasAttribute('data-is-bound');
        const boundName = isBound ? input.dataset.boundName : '';
        const boundPlural = isBound ? JSON.parse(input.dataset.boundPlural) : '';

        counter.dispatchEvent(new CustomEvent('counter-changed', {
            detail: {
                name: name,
                value: value,
                plural: plural,
                isBound: isBound,
                boundName: boundName,
                boundPlural: boundPlural
            }
        }));
    };

    const handleCounterChange = (e) => {
        if (e.target === increment) {
            inputValue = inputValue + 1;
            input.focus();
        }
        if (e.target === decrement) {
            inputValue = inputValue - 1;
            input.focus();
        }
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            inputValue < maxValue ? increment.click() : false;
        }
        if (e.code === 'ArrowDown') {                    
            e.preventDefault();
            inputValue > minValue ? decrement.click() : false;
        }
        input.value = inputValue;
        input.setAttribute('aria-valuenow', input.value);

        sendCounterData();
        normalizeRange();
    };

    function addEventListeners() {
        counter.addEventListener('counter-clear', (e) => {
            inputValue = 0;
            input.value = inputValue;

            sendCounterData();
            normalizeRange();
        })
        increment.addEventListener('click', handleCounterChange);   
        decrement.addEventListener('click', handleCounterChange);
        input.addEventListener('keydown', handleCounterChange);
        input.addEventListener('input', handleCounterChange);
    };

    normalizeRange();
    sendCounterData();
    addEventListeners();
});
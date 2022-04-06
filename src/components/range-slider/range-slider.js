import './nouislider.css';
import noUiSlider from 'nouislider';

const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [0, 15000],
        connect: true,
        step: 1000,
        range: {
            'min': [0],
            'max': [15000]
        }
    });

    const firstInput = document.getElementById('range-1');
    const SecondInput = document.getElementById('range-2');
    const inputs = [firstInput, SecondInput];

    rangeSlider.noUiSlider.on('update', function(values, handle){
        inputs[handle].value = Math.round(values[handle]);
    });
}
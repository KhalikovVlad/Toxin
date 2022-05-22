const sliderContainer = document.querySelector('.js-slider__container');
let left = 0;

function autoSlider() {
    setTimeout(function (){ 
        left = left - 1440;
        if (left < -1440) {
            left = 0;
        };
    sliderContainer.style.left = left + 'px';
    autoSlider();
    }, 7000);
};

autoSlider();
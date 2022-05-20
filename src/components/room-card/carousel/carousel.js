document.querySelectorAll('.js-carousel').forEach(function (carouselWrapper) {
    const prev = carouselWrapper.querySelector('.js-carousel__control_prev');
    const next = carouselWrapper.querySelector('.js-carousel__control_next');
    const slides = carouselWrapper.querySelectorAll('.carousel__slide');
    const dots = carouselWrapper.querySelectorAll('.carousel__dots-item');

    let slideIndex = 0;

    const activeSlide = (n) => {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('carousel__slide_active');
        }
        slides[n].classList.add('carousel__slide_active')
    }

    const activeDots = (n) => {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('carousel__dots-item_active');
        }
        dots[n].classList.add('carousel__dots-item_active')
    }

    const currentSlide = index => {
        activeSlide(index);
        activeDots(index);
    }

    const nextSlide = () => {
        if (slideIndex == slides.length - 1) {
            slideIndex = 0;
            currentSlide(slideIndex);
        } else {
            slideIndex++;
            currentSlide(slideIndex);
        }
    }

    const prevSlide = () => {
        if (slideIndex == 0) {
            slideIndex = slides.length - 1;
            currentSlide(slideIndex);
        } else {
            slideIndex--;
            currentSlide(slideIndex);
        }
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
});
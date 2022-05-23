import '../../components/header/menu/menu.js'

document.querySelectorAll('.js-header').forEach(function (headerWrapper) {
    const button = headerWrapper.querySelector('.header__button-icon');

    // click on button for open/close header-list
    headerWrapper.addEventListener('click', function (e) {
        if (e.target === button) {
            headerWrapper.classList.toggle('header_expanded');
        }
    });
    // click on other place for close header-list
    document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(headerWrapper);
        if (!click) {
            headerWrapper.classList.remove('header_expanded');
        }
    });

    // press ESC for close header-list
    headerWrapper.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            headerWrapper.classList.remove('header_expanded');
        }
    })
})
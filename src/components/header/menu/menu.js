document.querySelectorAll('.js-menu').forEach(function (menuWrapper) {
    const linkButton = menuWrapper.querySelector('.js-menu__button');

    // click on link for open/close link-list
    menuWrapper.addEventListener('click', function (e) {
        if (e.target === linkButton) {
            menuWrapper.classList.toggle('menu_expanded');
        }
    });
    // click on other place for close link-list
    document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(menuWrapper);
        if (!click) {
            menuWrapper.classList.remove('menu_expanded');
        }
    });

    // press ESC for close link-list
    menuWrapper.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            menuWrapper.classList.remove('menu_expanded');
        }
    })
})
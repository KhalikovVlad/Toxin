const expandableCheckboxList = document.querySelector('.js-expandable-checkbox-list');
const expandableCheckboxListButton = expandableCheckboxList.querySelector('.js-expandable-checkbox-list__button');

expandableCheckboxListButton.addEventListener('click', function () {
    expandableCheckboxList.classList.toggle('expandable-checkbox-list_expanded');
})

document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(expandableCheckboxList);
    if (!click) {
        expandableCheckboxList.classList.remove('expandable-checkbox-list_expanded');
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        expandableCheckboxList.classList.remove('expandable-checkbox-list_expanded');
    }
});
var expandableCheckBoxList = document.querySelector('.expandable-checkbox-list');
var expandableCheckBoxBtn = document.querySelector('.btn');
var CheckBoxList = document.querySelector('.checkbox-list');

expandableCheckBoxBtn.addEventListener('click', function () {
    CheckBoxList.classList.toggle('checkbox-list--visible');
    expandableCheckBoxBtn.classList.toggle('btn--rotate');
});

document.addEventListener('click', (e) => {
    const click =  e.composedPath().includes(expandableCheckBoxList);
    if (!click) {
        CheckBoxList.classList.remove('checkbox-list--visible');
    }
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        CheckBoxList.classList.remove('checkbox-list--visible');
    }
});
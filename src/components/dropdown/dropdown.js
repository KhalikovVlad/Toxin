// Dropdown list
document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    // Click on button for open/close dropdown
    dropdownBtn.addEventListener('click', function () {
        dropdownList.classList.toggle('dropdown__list--visible');
    });
    // Click on other place for close dropdown list
    document.addEventListener('click', (e) => {
        const click =  e.composedPath().includes(dropdown);
        if (!click) {
            dropdownList.classList.remove('dropdown__list--visible');
        }
    })
    // Use "ESC" or "TAB" for close dropdown
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropdownList.classList.remove('dropdown__list--visible');
        }
    });
    // Dropdown count
    const ACTION = {
        PLUS: 'plus',
        MINUS: 'minus'
    };

    const clearBtn = dropdownWrapper.querySelector('.list-item__clear');
    const applyBtn = dropdownWrapper.querySelector('.list-item__apply');
    const dropdownText = dropdownWrapper.querySelector('.button-text');
    
    const calculateItem = (listItem, action) => {

        const span = listItem.querySelector('.count');

        switch (action) {
            case ACTION.PLUS:
                span.textContent++;
                break;
            case ACTION.MINUS:
                span.textContent--;
                break;
        }
    };
    document.getElementById('count').addEventListener('click', (e) => {
        // Click for '-'
        if (e.target.classList.contains('btn-minus')) {
            const span = e.target.closest('.dropdown__list-item').querySelector('.count');
            const btnMinus = e.target.closest('.dropdown__list-item').querySelector('.btn-minus');
            if (Number(span.textContent) !== 0) {
                calculateItem(
                    e.target.closest('.dropdown__list-item'),
                    ACTION.MINUS
                )
            }
            if (Number(span.textContent) < 1) {
                btnMinus.classList.add('disabled');
            }
        };
        // Click for '+'
        if (e.target.classList.contains('btn-plus')) {
            const span = e.target.closest('.dropdown__list-item').querySelector('.count');
            const btnMinus = e.target.closest('.dropdown__list-item').querySelector('.btn-minus');
            calculateItem(
                e.target.closest('.dropdown__list-item'),
                ACTION.PLUS
            );
            if (Number(span.textContent) > 0) {
                btnMinus.classList.remove('disabled');
                clearBtn.classList.remove('hidden');
            } 
            clearBtn.addEventListener('click', function () {
                span1.textContent = 0;
                span2.textContent = 0;
                span3.textContent = 0;
                btnMinus.classList.add('disabled');
                dropdownText.textContent = 'Сколько гостей';
            });
        };
        // Hide Clear button if total is 0
        const span1 = document.getElementById('span-1');
        const span2 = document.getElementById('span-2');
        const span3 = document.getElementById('span-3');
        const arraySpans = [Number(span1.textContent), Number(span2.textContent), Number(span3.textContent)];
        const totalSum = arraySpans.reduce((total, span) => {
            return total + span;
        }, 0);  
        if (totalSum === 0) {
            clearBtn.classList.add('hidden');
        };

        applyBtn.addEventListener('click', function () {
            const plurals = {
                zero: 'гостей',
                one : 'гость',
                two: 'гостя',
                few: 'гостя',
                many: 'гостей',
                other: 'гостей',
            };
            const ruleOne = new Intl.PluralRules('ru').select(totalSum);
            const pluralsOne = plurals[ruleOne];
            dropdownText.textContent = totalSum + ' ' + pluralsOne;
            dropdownList.classList.remove('dropdown__list--visible');
        });
    });
});
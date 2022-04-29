const pagination = document.querySelector('.js-pagination')
const paginationUl = pagination.querySelector('.js-pagination__ul');
const totalPages = JSON.parse(pagination.dataset.total);
const currentPage = JSON.parse(pagination.dataset.current);

function element(totalPages, page) {
    let liTag = '';
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;

    if (page > 1) {
        liTag += `<li class='pagination__li'><span class='_icon-arrow_back'></span></li>`;
    }
    if (page > 2) {
        liTag += `<li class='pagination__li'><span>1</span></li>`
    }
    if (page > 3) {
        liTag += `<li class='pagination__li ellipsis'><span>...</span></li>`;
    }

    if (page == 1) {
        afterPages = afterPages + 1;
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
        if (pageLength > totalPages) {
            continue;
        }
        if (pageLength == 0) {
            pageLength = pageLength + 1;
        }
        if (page == pageLength) {
            activeLi = 'active';
        } else {
            activeLi = '';
        }
        liTag += `<li class='pagination__li ${activeLi}'><span>${pageLength}</span></li>`;
    }

    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            liTag += `<li class='pagination__li ellipsis'><span>...</span></li>`;
        }
        liTag += `<li class='pagination__li'><span>${totalPages}</span></li>`;
    }
    

    if(page < totalPages) {
        liTag += `<li class='pagination__li'><span class='_icon-arrow_forward'></span></li>`;
    }
    paginationUl.innerHTML = liTag;
}
element(totalPages, currentPage);
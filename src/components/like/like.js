document.querySelectorAll('.js-like').forEach(function (likeWrapper) {
    const likeCount = likeWrapper.querySelector('.js-like__count');
    const likeIcon = likeWrapper.querySelector('.js-like__icon');

    likeWrapper.onclick = function  () {
        if (likeWrapper.classList.contains('like_active')) {
            likeCount.textContent--;
            likeIcon.classList.remove('_icon-favorite');
            likeIcon.classList.add('_icon-favorite_border');         
        } else {
            likeCount.textContent++;
            likeIcon.classList.remove('_icon-favorite_border');
            likeIcon.classList.add('_icon-favorite');
        };

        likeWrapper.classList.toggle('like_active');     
    };
});
const likeBtn = document.querySelector('.js-like');
const likesCount = document.querySelector('.js-like__count');


likeBtn.onclick = function  () {
    if (likeBtn.classList.contains('like_active')) {
        likesCount.textContent--;
    } else {
        likesCount.textContent++;
    }
    likeBtn.classList.toggle('like_active');

};
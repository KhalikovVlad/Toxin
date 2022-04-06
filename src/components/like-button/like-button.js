const likeBtn = document.querySelector('.heart-btn');
const likesNumber = document.querySelector('.likes-number');


likeBtn.onclick = function  () {
    if (likeBtn.classList.contains('added')) {
        likesNumber.textContent--;
    } else {
        likesNumber.textContent++;
    }
    likeBtn.classList.toggle('added');

};
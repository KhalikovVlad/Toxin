import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru.json';


const pubdateContainer = document.querySelector('.js-review__pubdate');
const pubdate = pubdateContainer.getAttribute('datetime');

function formatElapsedTime() {
    TimeAgo.addLocale(ru);
    const timeAgo = new TimeAgo('ru-RU');
    return timeAgo.format(Date.now() - 24 * 60 * 60 * 5 * 1000);
};

function showElapsedTime() {
    const pubdateTimestamp = new Date(pubdate).getTime();
    const elapsedTimeFormatted = formatElapsedTime(pubdateTimestamp);

    pubdateContainer.innerHTML = elapsedTimeFormatted;
}; showElapsedTime();
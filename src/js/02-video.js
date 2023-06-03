import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';

const iframeEl = document.querySelector('iframe');
const player = new Vimeo(iframeEl);

player.on('play', function () {
  console.log('played the video!');
});
// Отримання збереженого часу відтворення з локального сховища
const savedTime = localStorage.getItem('videoplayer-current-time');

// Встановлення часу відтворення на плеєрі
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}

// Функція, яка зберігає час відтворення у локальне сховище
const saveCurrentTime = throttle(function (event) {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

// Відстеження події timeupdate і збереження часу відтворення
player.on('timeupdate', saveCurrentTime);

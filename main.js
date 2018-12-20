const joke = document.querySelector('.jokes__joke');
const getJokeBtn = document.querySelector('.jokes__btn');

const twitterBtn = document.getElementById('twitterShareBtn');
const vkBtn = document.getElementById('vkShareBtn');
const fbBtn = document.getElementById('fbShareBtn');

const images = ['sharing/sharing-1.jpg', 'sharing/sharing-2.jpg', 'sharing/sharing-3.jpg'];

const metaImagesTags = document.querySelectorAll('meta[property$="image"], meta[name$="image"]');

const baseUrl = 'https://webistomin.github.io/movie-search-app/';

getJokeBtn.addEventListener('click', () => {
  fetch('https://api.icndb.com/jokes/random')
    .then(function(response) {
      return response.json();
    })
    .then(function (response) {
      const currentJoke = response.value.joke;
      const randomImage = images[Math.floor(Math.random() * (images.length))];

      joke.innerHTML = currentJoke;
      document.querySelector('meta[property="og:description"]').setAttribute("content", currentJoke);

      metaImagesTags.forEach((item) => {
        item.setAttribute("content", `${baseUrl}${randomImage}`);
      })
    })
});



const buttonRow = document.getElementById('rowView');
const buttonGrid = document.getElementById('gridView');
const moviesList = document.querySelector('.movies__list');

buttonRow.addEventListener('click', () => {
  moviesList.classList.remove('movies__list--grid');
  moviesList.classList.add('movies__list--row');
});

buttonGrid.addEventListener('click', () => {
  moviesList.classList.add('movies__list--grid');
  moviesList.classList.remove('movies__list--row');
});

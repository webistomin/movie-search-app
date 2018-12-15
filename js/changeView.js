const buttonRow = document.getElementById('rowView');
const buttonGrid = document.getElementById('gridView');
const moviesList = document.querySelector('.movies__list');

buttonRow.addEventListener('click', () => {
  if (!buttonRow.classList.contains('page-header__button-active')) {
    buttonRow.classList.add('page-header__button--active');
    buttonGrid.classList.remove('page-header__button--active');
  }
  moviesList.classList.remove('movies__list--grid');
  moviesList.classList.add('movies__list--row');
});

buttonGrid.addEventListener('click', () => {
  if (!buttonGrid.classList.contains('page-header__button-active')) {
    buttonGrid.classList.add('page-header__button--active');
    buttonRow.classList.remove('page-header__button--active');
  }
  moviesList.classList.add('movies__list--grid');
  moviesList.classList.remove('movies__list--row');
});

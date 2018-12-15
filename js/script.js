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

const toggler = document.querySelector('.page-header__toggler');
const mainNav = document.querySelector('.main-nav');

toggler.addEventListener('click', () => {
  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.add('main-nav--opened');
    mainNav.classList.remove('main-nav--closed');

    toggler.classList.add('page-header__toggler--opened');
    toggler.classList.remove('page-header__toggler--closed');
  } else {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');

    toggler.classList.remove('page-header__toggler--opened');
    toggler.classList.add('page-header__toggler--closed');
  }
});

const userToggler = document.querySelector('.page-header__button--arrow');
const userNav = document.querySelector('.page-header__list');

userToggler.addEventListener('click', () => {
  if (userNav.classList.contains('page-header__list--closed')) {
    userNav.classList.add('page-header__list--opened');
    userNav.classList.remove('page-header__list--closed');

    userToggler.classList.add('page-header__button--opened');
    userToggler.classList.remove('page-header__button--closed');
  } else {
    userNav.classList.remove('page-header__list--opened');
    userNav.classList.add('page-header__list--closed');

    userToggler.classList.remove('page-header__button--opened');
    userToggler.classList.add('page-header__button--closed');
  }
});

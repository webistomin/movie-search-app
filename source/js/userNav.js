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

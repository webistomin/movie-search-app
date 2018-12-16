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
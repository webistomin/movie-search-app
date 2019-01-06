import Vue from 'vue';

const priceFilter = Vue.filter('getFormattedPrice', (value) => {
  switch (true) {
    case Math.abs(Number(value)) >= 1.0e+9:
      return `${Math.round(Math.abs(Number(value)) / 1.0e+9)} billion dollars`;
    case Math.abs(Number(value)) >= 1.0e+6:
      return `${Math.round(Math.abs(Number(value)) / 1.0e+6)} million dollars`;
    case Math.abs(Number(value)) >= 1.0e+3:
      return `${Math.round(Math.abs(Number(value)) / 1.0e+3)} thousand dollars`;
    default:
      return `${Math.abs(Number(value))} dollars`;
  }
});

const dateFilter = Vue.filter('getFormattedDate', date => new Date(Date.parse(date)).toDateString());

export default {
  priceFilter,
  dateFilter,
};

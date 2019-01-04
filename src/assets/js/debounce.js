export default function debounce(func, delay) {
  let inDebounce;
  return function debounceAnswer(...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

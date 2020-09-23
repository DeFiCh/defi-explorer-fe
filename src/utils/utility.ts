export const setIntervalSynchronous = (func, delay) => {
  let intervalFunction;
  let timeoutId;
  let clear;
  clear = () => {
    clearTimeout(timeoutId);
  };
  intervalFunction = () => {
    func();
    timeoutId = setTimeout(intervalFunction, delay);
  };
  timeoutId = setTimeout(intervalFunction, delay);
  return clear;
};

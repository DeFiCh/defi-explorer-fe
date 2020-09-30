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

export const isInputValid = (inputValue) => {
  if (isValidBlockOrTx(inputValue)) {
    return { isValid: true, type: "blockOrTx" };
    // } else if (this.isValidAddress(inputValue)) {
    //   return { isValid: true, type: 'addr' };
  } else if (isValidBlockIndex(inputValue)) {
    return { isValid: true, type: "blockOrTx" };
  } else {
    return { isValid: false, type: "invalid" };
  }
};

const isValidBlockOrTx = (inputValue) => {
  const regexp = /^[0-9a-fA-F]{64}$/;
  if (regexp.test(inputValue)) {
    return true;
  } else {
    return false;
  }
};

const isValidBlockIndex = (inputValue) => isFinite(inputValue);

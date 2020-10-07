import log from 'loglevel';

const info = text => {
  log.info(text);
};

const error = text => {
  log.error(text);
};

const logFilePath = () => {
  return false;
};

export default logger;
export { info, error, logFilePath };

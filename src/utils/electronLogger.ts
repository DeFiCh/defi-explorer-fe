import { isElectron } from './isElectron';
import log from 'loglevel';
const logger = () => {
  if (isElectron()) {
    const log = window.require('electron').remote.require('electron-log');
    return log;
  }
  return false;
};

const info = text => {
  const electronLogger = logger();
  if (electronLogger) {
    electronLogger.log(text);
  }
  log.info(text);
};

const error = text => {
  const electronLogger = logger();
  if (electronLogger) {
    electronLogger.error(text);
  }
  log.error(text);
};

const logFilePath = () => {
  const electronLogger = logger();
  if (electronLogger) {
    return electronLogger.transports.file.findLogPath();
  }
  return false;
};

export default logger;
export { info, error, logFilePath };

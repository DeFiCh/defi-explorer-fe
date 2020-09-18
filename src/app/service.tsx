import { isElectron, ipcRendererFunc } from '../utils/isElectron';
import * as log from '../utils/electronLogger';
import { eventChannel } from 'redux-saga';

export const getRpcConfig = () => {
  if (isElectron()) {
    const ipcRenderer = ipcRendererFunc();
    return ipcRenderer.sendSync('get-config-details', {});
  }
  // For webapp
  return { success: true, data: {} };
};

export function startBinary(config: any) {
  return eventChannel((emit) => {
    const ipcRenderer = ipcRendererFunc();
    ipcRenderer.send('start-defi-chain', config);
    ipcRenderer.on('start-defi-chain-reply', async (_e: any, res: any) => {
      if (res.success) {
        // isBlockchainStarted(emit, res);
      } else {
        emit(res);
      }
    });
    return () => {
      log.info('Unsubscribe startBinary');
    };
  });
}

export const stopBinary = () => {
  if (isElectron()) {
    const ipcRenderer = ipcRendererFunc();
    return ipcRenderer.sendSync('stop-defi-chain', {});
  }
  // For webapp
  return { success: true, data: {} };
};

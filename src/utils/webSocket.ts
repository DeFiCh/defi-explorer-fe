import { BACKEND_BASE_URL, BACKEND_BASE_PORT } from '../constants';
import io from 'socket.io-client';
import store from '../app/rootStore';
import {
  connected,
  disconnected,
  newLatestBlocks,
  newLatestTransaction,
  newLatestCoins,
  setErrorMessage,
} from '../containers/Websocket/reducer';

class Websocket {
  socket: SocketIOClient.Socket;
  chain: string;
  network: string;

  constructor() {
    const {
      app: { chain, network },
    } = store.getState();
    this.chain = chain;
    this.network = network;
  }

  connect = () => {
    this.socket = io(`https://${BACKEND_BASE_URL}:${BACKEND_BASE_PORT}`, {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      store.dispatch(connected());
      this.socket.emit('room', `/${this.chain}/${this.network}/inv`);
    });

    this.socket.on('disconnect', () => {
      store.dispatch(disconnected());
    });

    this.socket.on('tx', (data) => {
      store.dispatch(newLatestTransaction(data));
    });

    this.socket.on('block', (data) => {
      store.dispatch(newLatestBlocks(data));
    });
    this.socket.on('coin', (data) => {
      store.dispatch(newLatestCoins(data));
    });
    this.socket.on('error', (data) => {
      store.dispatch(setErrorMessage(data));
    });
  };
}

export default Websocket;

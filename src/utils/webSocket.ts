import { WS_PREFIX } from '../constants';
import io from 'socket.io-client';
import store from '../app/rootStore';
import {
  connected,
  disconnected,
  newLatestBlock,
  newLatestTransaction,
  newLatestCoin,
  setErrorMessage,
} from '../containers/Websocket/reducer';

class Websocket {
  socket?: SocketIOClient.Socket;
  chain: string;
  network: string;

  constructor() {
    const {
      app: { chain, network },
    } = store.getState();
    this.chain = chain;
    this.network = network;
    this.connect();
  }

  connect = () => {
    this.socket = io('https://mainnet-api.defichain.io', {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      if (this.socket) {
        console.log('COnnected');
        store.dispatch(connected());
        this.socket.emit('room', `/${this.chain}/${this.network}/inv`);
      }
    });

    this.socket.on('disconnect', () => {
      store.dispatch(disconnected());
    });

    this.socket.on('tx', (data) => {
      store.dispatch(newLatestTransaction(data));
    });

    this.socket.on('block', (data) => {
      store.dispatch(newLatestBlock(data));
    });
    this.socket.on('coin', (data) => {
      store.dispatch(newLatestCoin(data));
    });
    this.socket.on('error', (data) => {
      store.dispatch(setErrorMessage(data));
    });
  };
}

export default Websocket;

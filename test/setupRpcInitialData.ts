import store from '../src/app/rootStore';
store.dispatch({
  type: '',
  payload: {
    remotes: [
      {
        rpcuser: 'a',
        rpcpassword: 'b',
        rpcconnect: '127.0.0.1',
        rpcport: '18443',
      },
    ],
  },
});

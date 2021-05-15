import { createSlice } from '@reduxjs/toolkit';
import hash from 'hash.js';
import { Buffer } from 'buffer/';
import bs58 from 'bs58';

const convertAddress = (network, scriptAddress) => {
  if (scriptAddress.length !== 46 && scriptAddress.length !== 50) {
    return scriptAddress;
  }

  let scriptKey = scriptAddress;
  if (scriptKey.substring(0, 2) === 'a9') {
    scriptKey =
      (network === 'mainnet' ? '5a' : '0f') + scriptKey.substring(4, 44);
  } else {
    scriptKey =
      (network === 'mainnet' ? '12' : '80') + scriptKey.substring(6, 46);
  }
  const bytes = Buffer.from(scriptKey, 'hex');
  const scriptKeySha256 = hash.sha256().update(bytes).digest();
  const shortHash = hash.sha256().update(scriptKeySha256).digest().slice(0, 4);
  const address = bs58.encode(
    Buffer.concat([new Buffer(bytes), new Buffer(shortHash)])
  );

  return address;
};

export const initialState = {
  isLoading: false,
  data: {},
  isError: '',
};

const configSlice = createSlice({
  name: 'txInfoPage',
  initialState,
  reducers: {
    fetchTxInfoStartedRequest(state, action) {
      state.isLoading = true;
      state.data = {};
      state.isError = '';
    },
    fetchTxInfoFailureRequest(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = [];
    },
    fetchTxInfoSuccessRequest(state, action) {
      state.isLoading = false;

      const network = action.payload.network;
      function iterateTo(obj) {
        for (const property in obj) {
          if (obj.hasOwnProperty(property)) {
            const convertedAddress = convertAddress(network, property);
            obj[convertedAddress] = obj[property];
            delete obj[property];
          }
        }
      }

      function iterate(obj) {
        for (const property in obj) {
          if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === 'object') {
              if (property === 'to') {
                iterateTo(obj[property]);
              } else {
                iterate(obj[property]);
              }
            } else if (
              property.toLowerCase().indexOf('address') !== -1 ||
              property === 'from'
            ) {
              obj[property] = convertAddress(network, obj[property]);
            }
          }
        }
      }

      function iterateError(obj) {
        let errorString = '';
        for (const property in obj) {
          if (obj.hasOwnProperty(property)) {
            errorString += obj[property];
            delete obj[property];
          }
        }
        obj.error = errorString;
      }

      if (action.payload.tx['0']) {
        iterateError(action.payload.tx);
      } else {
        iterate(action.payload.tx);
      }

      state.data = action.payload.tx;
      state.isError = '';
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  fetchTxInfoStartedRequest,
  fetchTxInfoFailureRequest,
  fetchTxInfoSuccessRequest,
} = actions;

export default reducer;

import { createSlice } from '@reduxjs/toolkit';
// import {Sha256} from '@aws-crypto/sha256-browser';

// const convertAddress = (scriptAddress) => {
//   const doubleHash = (bytes) => {
//       let scriptKeySha256 = new Sha256().update(bytes).digest();
//       return new Sha256().update(scriptKeySha256).digest().subarray(0, 4);
//   }

//   const keyNoHash = scriptAddress.subarray(0, scriptAddress.length - 4);
//   const outputAddress = doubleHash(keyNoHash);
//   const decodedString = scriptAddress.toString('hex');

//   if(decodedString.substring(0, 2) === '5a') {
//     return outputAddress;
//   } else if(decodedString.substring(0, 2) === '12') {
//     return outputAddress;
//   } else { // bech32, not commmonly used
//     return null;
//   }
// }

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

      function iterate(obj) {
        for (const property in obj) {
          if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === 'object') {
              iterate(obj[property]);
            } else if (property.toLowerCase().indexOf('address') !== -1) {
              // console.log(property + '   ' + obj[property]);
            }
          }
        }
      }

      iterate(action.payload);

      state.data = action.payload;
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

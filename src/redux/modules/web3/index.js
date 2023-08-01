import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { watchNetwork } from '@wagmi/core';
import { createSlice } from '@reduxjs/toolkit';
import blockChainConfig from '../../../services/config'

const initialState = {
  config: null,
  isSupportedNetwork: false
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setNetwork: (state, action) => {
      state.config = action.payload;
    },
    setIsSupportedNetwork: (state, action) => { state.isSupportedNetwork = action.payload }
  },
});

export function useWeb3() {
  const dispatch = useDispatch();
  const web3 = useSelector((state) => state.web3.config);

  const dispatchSwitchNetwork = useCallback(() => {
    watchNetwork(({ chain }) => {
      const chainConfig = blockChainConfig[chain?.id];
      if (chainConfig) {
        dispatch(setNetwork(chainConfig))
        dispatch(setIsSupportedNetwork(true))
      } else {
        dispatch(setIsSupportedNetwork(false))
      }
    });
  }, [dispatch]);

  return { web3, dispatchSwitchNetwork };
}

export const { setNetwork, setIsSupportedNetwork } = web3Slice.actions;
export default web3Slice.reducer


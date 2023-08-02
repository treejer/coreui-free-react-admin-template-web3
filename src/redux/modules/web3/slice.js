import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  config: null,
  isSupportedNetwork: false,
}

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setNetwork: (state, action) => {
      state.config = action.payload
    },
    setIsSupportedNetwork: (state, action) => {
      state.isSupportedNetwork = action.payload
    },
  },
})

export function useWeb3() {
  const dispatch = useDispatch()
  const web3 = useSelector((state) => state.web3)

  // const dispatchSwitchNetwork = useCallback(() => {
  // }, [dispatch])

  return { web3 }
}

export const { setNetwork, setIsSupportedNetwork } = web3Slice.actions
export default web3Slice.reducer

import { takeEvery, call, put } from 'redux-saga/effects'
import { watchNetwork } from '@wagmi/core'
import { setIsSupportedNetwork, setNetwork } from './slice'
import blockChainConfig from '../../../services/config'

function* handleNetworkChange({ chain }) {
  try {
    const chainConfig = blockChainConfig[chain?.id]
    if (chainConfig) {
      yield put(setIsSupportedNetwork(true))
      yield put(setNetwork(chainConfig))
    } else {
      yield put(setIsSupportedNetwork(false))
    }
  } catch (error) {
    console.error('Error while handling network change:', error)
  }
}

function watchNetworkPromise() {
  return new Promise((resolve, reject) => {
    watchNetwork(({ chain }) => {
      resolve({ chain })
    })
  })
}

export function* watchCurrentNetwork() {
  try {
    const { chain } = yield call(watchNetworkPromise)
    yield call(handleNetworkChange, { chain })
  } catch (error) {
    console.error('Error while watching network:', error)
  }
}

export function* web3Saga() {
  yield takeEvery(setNetwork, watchCurrentNetwork)
}

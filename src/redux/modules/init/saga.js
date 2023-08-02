import { put, take, takeEvery } from 'redux-saga/effects'
import { setNetwork, setIsSupportedNetwork } from '../web3/slice'
import { initApp, initAppCompleted } from './slice'
export function* watchInitApp() {
  try {
    yield put(setIsSupportedNetwork())
    yield take(setNetwork)
    yield put(initAppCompleted())
  } catch (e) {
    console.log(e, 'error in init app')
  }
}

export function* initSagas() {
  yield takeEvery(initApp, watchInitApp)
}

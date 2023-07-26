import { all, takeEvery } from 'redux-saga/effects'
import { userNonceActionTypes, watchUserNonce } from './modules/userNonce'
import { userSignActionTypes, watchUserSign } from './modules/userSign'

export default function* rootSaga() {
  yield all([
    takeEvery(userNonceActionTypes.load, watchUserNonce),
    takeEvery(userSignActionTypes.load, watchUserSign),
  ])
}

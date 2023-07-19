import { all } from 'redux-saga/effects'
import { userSaga } from './modules/userSaga'
import { nonceSaga } from './modules/userNonce'

export default function* rootSaga() {
  yield all([userSaga(), nonceSaga()])
}

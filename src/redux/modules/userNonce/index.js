import { put } from 'redux-saga/effects'
import ReduxFetchState from 'redux-fetch-state'
import { signMessage } from '@wagmi/core'
import apiPlugin from '../../../services/api'
import { userSignActions } from '../userSign'
const API_URL = process.env.REACT_APP_BASE_URL

const { actions, actionTypes, reducer } = new ReduxFetchState('userNonce')

export function* watchUserNonce(action) {
  const { address } = action.payload
  try {
    const response = yield apiPlugin.getData(`${API_URL}/nonce/${address}`)
    const { message } = response
    const signature = yield signMessage({ message: message })
    yield put(actions.loadSuccess(response))
    yield put(userSignActions.load({ address, signature }))
  } catch (e) {
    yield put(actions.loadFailure(e))
  }
}

export {
  reducer as userNonceReducer,
  actions as userNonceActions,
  actionTypes as userNonceActionTypes,
}

import { useCallback } from 'react'
import { put, takeEvery, select } from 'redux-saga/effects'
import ReduxFetchState from 'redux-fetch-state'
import { getAccount, signMessage } from '@wagmi/core'
import { useDispatch } from 'react-redux'
import apiPlugin from '../../../services/api'
import { userSignActions } from '../userSign'

const { actions, actionTypes, reducer } = new ReduxFetchState('userNonce')

export function* watchUserNonce(action) {
  const { base_url } = yield select((state) => state.web3?.config || {})
  const API_URL = base_url
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

export function* userNonceSagas() {
  yield takeEvery(actionTypes.load, watchUserNonce)
}

export function useGetNonce() {
  const dispatch = useDispatch()

  const dispatchGetNonce = useCallback(() => {
    const { address } = getAccount()
    dispatch(actions.load({ address }))
  }, [dispatch])

  return { dispatchGetNonce }
}

export {
  reducer as userNonceReducer,
  actions as userNonceActions,
  actionTypes as userNonceActionTypes,
}

import { call, put, takeEvery } from 'redux-saga/effects'
import apiPlugin from '../../../services/api'
const API_URL = 'https://nestapi.treejer.com'

// User reducer
const initialState = {
  signature: null,
  wallet: null,
  error: null,
  message: '',
}

export function nonceReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_NONCE':
      return { ...state, isLoading: true, error: null }
    case 'GET_NONCE_SUCCESS':
      return { ...state, isLoading: false, message: action.payload }
    case 'GET_NONCE_FAILURE':
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}

// User saga
function* getNonce(action) {
  try {
    const { address, handleSuccess } = action
    const response = yield call(() => apiPlugin.getData(`${API_URL}/nonce/${address}`))
    yield put({ type: 'GET_NONCE_SUCCESS', payload: response })
    handleSuccess(response.message)
  } catch (error) {
    // Dispatch failure action if an error occurs
    yield put({ type: 'GET_NONCE_FAILURE', error })
  }
}

export function* nonceSaga() {
  yield takeEvery('GET_NONCE', getNonce)
}

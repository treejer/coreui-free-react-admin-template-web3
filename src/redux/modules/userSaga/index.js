import { call, put, takeLatest } from 'redux-saga/effects'
import apiPlugin from '../../../services/api'

const API_URL = process.env.REACT_APP_BASE_URL

// User reducer
const initialState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_SIGN':
      return { ...state, isLoading: true, error: null }
    case 'USER_SIGN_SUCCESS':
      return { ...state, isLoading: false, token: action.payload }
    case 'USER_SIGN_FAILURE':
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}

// User saga
function* userSign(action) {
  try {
    const { address, signature } = action
    const response = yield call(() =>
      apiPlugin.postData(`${API_URL}/login/${address}`, { signature: signature }),
    )
    yield put({ type: 'USER_SIGN_SUCCESS', payload: response.access_token })
  } catch (error) {
    // Dispatch failure action if an error occurs
    yield put({ type: 'USER_SIGN_FAILURE', error })
  }
}

export function* userSaga() {
  yield takeLatest('USER_SIGN', userSign)
}

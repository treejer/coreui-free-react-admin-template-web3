import { call, put, takeLatest } from 'redux-saga/effects'
import apiPlugin from '../../../services/api'

const API_URL = 'https://nestapi.treejer.com'

// User reducer
const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state, isLoading: true, error: null }
    case 'FETCH_USER_SUCCESS':
      return { ...state, isLoading: false, user: action.payload }
    case 'FETCH_USER_FAILURE':
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}

// User saga
function* fetchUser(action) {
  try {
    const address = '0x8E4B4B73a2764A40989db2dCBeB6a0726eEC6039'
    const signature = 'sdsdsdsd'
    const response = yield call(() =>
      apiPlugin.postData(`${API_URL}/login/${address}`, { signature: signature }),
    )
    // Dispatch success action with the user data
    yield put({ type: 'FETCH_USER_SUCCESS', payload: response.data })
  } catch (error) {
    // Dispatch failure action if an error occurs
    yield put({ type: 'FETCH_USER_FAILURE', error })
  }
}

export function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser)
  // Add more user-related sagas here if needed
}

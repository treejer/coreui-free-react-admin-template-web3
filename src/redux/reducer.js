import { combineReducers } from 'redux'
import { userReducer } from './modules/userSaga'
import { nonceReducer } from './modules/userNonce'

const rootReducer = combineReducers({
  user: userReducer,
  nonce: nonceReducer,
})

export default rootReducer

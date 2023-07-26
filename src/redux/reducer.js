import { combineReducers } from 'redux'
import { userSignReducer } from './modules/userSign'
import { userNonceReducer } from './modules/userNonce'

const rootReducer = combineReducers({
  userSignReducer,
  userNonceReducer,
})

export default rootReducer

import { combineReducers } from 'redux'
import initReducer from './modules/init'
import web3Reducer from './modules/web3'
import { userSignReducer } from './modules/userSign'
import { userNonceReducer } from './modules/userNonce'

const rootReducer = combineReducers({
  init: initReducer,
  userSign: userSignReducer,
  userNonce: userNonceReducer,
  web3: web3Reducer,
})

export default rootReducer

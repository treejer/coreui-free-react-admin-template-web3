import { put, takeEvery } from 'redux-saga/effects'
import ReduxFetchState from 'redux-fetch-state'
import { useNetwork } from 'wagmi'
import { useDispatch } from 'react-redux'
import blockChainConfig from '../../../services/config'

const { actions, actionTypes, reducer } = new ReduxFetchState('config')

export function* watchChain(action) {
  const data = action
  yield put(actions.loadSuccess(data))
}

export function* selectChainSagas() {
  yield takeEvery(actionTypes.load, watchChain)
}

export function useSetConfig() {
  const dispatch = useDispatch()
  const { chain } = useNetwork()
  const dispatchSetConfig = () => {
    const chainConfig = blockChainConfig[chain?.id]
    if (chainConfig) {
      dispatch(actions.loadSuccess(chainConfig))
    }
  }

  return { dispatchSetConfig }
}

export const configData = (state) => state.config?.data

export { reducer as configReducer, actions as configActions, actionTypes as configActionTypes }

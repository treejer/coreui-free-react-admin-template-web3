import { useCallback } from 'react'
import { userNonceActions } from '../redux/modules/userNonce'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

export const useGetNonce = () => {
  const { address } = useAccount()
  const dispatch = useDispatch()

  const dispatchGetNonce = useCallback(() => {
    try {
      dispatch(userNonceActions.load({ address }))
    } catch (error) {
      throw error
    }
  }, [])

  return { dispatchGetNonce }
}

import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount, useSignMessage } from 'wagmi'

export const useGetNonce = () => {
  const { dispatchGetToken } = useGetToken()
  const { address } = useAccount()
  const dispatch = useDispatch()
  const { signMessage } = useSignMessage({
    onSuccess: (...args) => {
      if (args && address) {
        dispatchGetToken(address, args[0])
      }
    },
    onError: (error) => {
      console.log(error, 'error')
    },
  })

  const handleSignMessage = async (nonceState) => {
    if (nonceState) {
      signMessage({ message: nonceState })
    }
  }

  const dispatchGetNonce = useCallback(() => {
    try {
      dispatch({ type: 'GET_NONCE', address, handleSuccess: handleSignMessage })
    } catch (error) {
      throw error
    }
  }, [address, handleSignMessage])

  return { dispatchGetNonce }
}

export const useGetToken = () => {
  const dispatch = useDispatch()

  const dispatchGetToken = useCallback((address, signature) => {
    try {
      dispatch({ type: 'USER_SIGN', address, signature })
    } catch (error) {
      throw error
    }
  }, [dispatch])

  return { dispatchGetToken }
}

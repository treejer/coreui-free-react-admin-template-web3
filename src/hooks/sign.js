import {useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSignMessage } from 'wagmi'
import { userSaga } from '../redux/modules/userSaga'

export const useGetNonce = () => {
  const dispatch = useDispatch()
  const { data, signMessage } = useSignMessage({ onSuccess: (...args)=> {
      console.log(args, 'args')
    }, onError: (error) => {
      console.log(error, 'error')
    } })
  const nonceState = useSelector((state) => state.nonce)


  useEffect(() => {
    console.log('use effect')
    if(nonceState.message){
      console.log('in if', nonceState.message, 'message is here')
      signMessage({ message: nonceState.message })
    }
  }, [nonceState.message]);

  console.log(data,' data')


  const dispatchGetNonce = useCallback((address) => {
    try {
      dispatch({ type: 'GET_NONCE', address, handleSuccess: signMessage })
      // if (response) {
      //   const message = 'The nonce message'
      //   await signMessage({ message })

      //   if (data && Object.keys(data).length > 0) {
      //     return { data }
      //   } else {
      //     throw new Error('Sign message data is empty.')
      //   }
      // }
    } catch (error) {
      console.log('Error:', error)
      throw error
    }
  }, [])

  return {...nonceState, dispatchGetNonce}
}

export const useLogin = () => {
  const dispatch = useDispatch()

  const login = async (address, signature) => {
    try {
      const loginResponse = await dispatch(userSaga(address, signature))
      console.log('calll login response', loginResponse)
    } catch (error) {
      console.log('Error:', error)
      throw error
    }
  }

  return login
}

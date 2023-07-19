import { useDispatch, useSelector } from 'react-redux'
import { useSignMessage } from 'wagmi'
import { userSaga } from '../redux/modules/userSaga'
import { nonceSaga } from '../redux/modules/userNonce'

export const useGetNonce = () => {
  const dispatch = useDispatch()
  const { data, signMessage } = useSignMessage()
  const { isLoading, error } = useSelector((state) => state.user)

  const getNonce = async (address) => {
    try {
      console.log('ssss')
      const { message } = dispatch({ type: 'GET_NONCE', address })
      console.log('response', message)
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
  }
  return getNonce
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

import React, { useState, useEffect } from 'react'
import { useWeb3Modal } from '@web3modal/react'
import { useNetwork, useSwitchNetwork, useAccount, useSignMessage } from 'wagmi'
import ChainDropdown from './ChainDropdown'
import WalletDropdown from './WalletDropdown'
import supportedNetwork from './SupportedNetwork'
import { useGetNonce } from '../../../redux/modules/userNonce'
import { CButton } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ConnectWalletButton = () => {
  const [visible, setVisible] = useState(false)
  const { chain } = useNetwork()
  const { open } = useWeb3Modal()
  const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { address, status } = useAccount()
  const { dispatchGetNonce } = useGetNonce()

  const findToken = (name) => {
    return supportedNetwork.find((x) => x.name === name)
  }

  const handleDisconnect = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (!address) {
      handleDisconnect()
    }
  }, [address])

  const signIn = async () => {
    try {
      dispatchGetNonce(address)
    } catch (error) {
      console.log('Error:', error)
      toast.error('An error occurred. Please try again later.')
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-row-reverse align-items-center">
        {!address && (
          <CButton
            onClick={() => open()}
            color="primary"
            className={address ? 'w-50 text-truncate h-75 rounded-pill' : 'w-auto rounded-pill'}
          >
            Connect
          </CButton>
        )}
        {address && (
          <WalletDropdown
            address={address}
            visible={visible}
            status={status}
            open={open}
            signIn={signIn}
            handleDisconnect={handleDisconnect}
          />
        )}
        {chain && (
          <ChainDropdown
            chains={chains}
            switchNetwork={switchNetwork}
            chain={chain}
            isLoading={isLoading}
            pendingChainId={pendingChainId}
            findToken={findToken}
          />
        )}
      </div>
    </>
  )
}

export default ConnectWalletButton

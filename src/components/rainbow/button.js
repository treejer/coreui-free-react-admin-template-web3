import React, { useEffect } from 'react'
import { CButton } from '@coreui/react'
import { useSelector } from 'react-redux'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import { configureChains, useAccount, useNetwork } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, zora } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { useGetNonce } from '../../redux/modules/userNonce'
import { useRemoveToken } from '../../redux/modules/userSign'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'

const apiKey = process.env.REACT_APP_ALCHEMY_ID

const supportedChains = [mainnet, polygon, optimism, arbitrum, zora]
const providers = [alchemyProvider({ apiKey }), publicProvider()]
const { chains } = configureChains(supportedChains, providers)

const RainbowButton = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { dispatchGetNonce } = useGetNonce()
  const { dispatchRemoveToken } = useRemoveToken()
  const userToken = useSelector((state) => state.userSign?.data?.access_token)

  useEffect(() => {
    if (address) {
      dispatchGetNonce(address)
    } else {
      dispatchRemoveToken()
    }
    if (chain) {
      dispatchRemoveToken()
    }
  }, [address, chain, dispatchGetNonce, dispatchRemoveToken])

  const handleSignInWallet = () => {
    if (address) {
      dispatchGetNonce(address)
    } else {
      dispatchRemoveToken()
    }
  }

  return (
    <>
      {!userToken && address && (
        <CButton color="light" className="mx-2" onClick={handleSignInWallet}>
          Sign In Wallet
        </CButton>
      )}
      <RainbowKitProvider chains={chains}>
        <ConnectButton label="Connect Wallet" />
      </RainbowKitProvider>
    </>
  )
}

export default RainbowButton

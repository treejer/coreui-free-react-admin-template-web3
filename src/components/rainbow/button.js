import React, { useEffect } from 'react'
import { CButton } from '@coreui/react'
import { useSelector } from 'react-redux'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import { configureChains, useAccount, useNetwork } from 'wagmi'
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { useGetNonce } from '../../redux/modules/userNonce'
import { useSetConfig } from '../../redux/modules/appConfig'
import { useRemoveToken } from '../../redux/modules/userSign'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'

const apiKey = process.env.REACT_APP_ALCHEMY_ID

const supportedChains = [mainnet, polygon, polygonMumbai]
const providers = [alchemyProvider({ apiKey }), publicProvider()]
const { chains } = configureChains(supportedChains, providers)

const RainbowButton = () => {
  const { address } = useAccount({
    onConnect() {
      if (chain) {
        dispatchSetConfig()
        dispatchGetNonce(address)
      }
    },
    onDisconnect() {
      dispatchRemoveToken()
    },
    onSuccess(data) {
      return data
    },
  })
  const { chain } = useNetwork()
  const { dispatchGetNonce } = useGetNonce()
  const { dispatchRemoveToken } = useRemoveToken()
  const { dispatchSetConfig } = useSetConfig()
  const userToken = useSelector((state) => state.userSign?.data?.access_token)
  const isLoading = useSelector((state) => state.userNonce.loading || state.userSign.loading)

  useEffect(() => {
    if (chain) {
      dispatchRemoveToken()
    }
  }, [chain, dispatchRemoveToken])

  const handleSignInWallet = () => {
    dispatchSetConfig()
    dispatchGetNonce(address)
  }

  const showSignInWalletButton = !userToken && address
  return (
    <>
      {showSignInWalletButton && (
        <CButton color="light" className="mx-2" onClick={handleSignInWallet} disabled={isLoading}>
          Sign In Wallet
        </CButton>
      )}
      <RainbowKitProvider chains={chains} initialChain={process.env.REACT_APP_DEFAULT_CHAIN_ID}>
        <ConnectButton label="Connect Wallet" />
      </RainbowKitProvider>
    </>
  )
}

export default RainbowButton

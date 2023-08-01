import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useWeb3 } from '../redux/modules/web3';

const DefaultLayout = () => {
  const { dispatchSwitchNetwork } = useWeb3();

  useEffect(() => {
    dispatchSwitchNetwork()
  }, [dispatchSwitchNetwork]);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

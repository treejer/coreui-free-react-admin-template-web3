import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { setNetwork } from '../redux/modules/web3/slice'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setNetwork())
  }, [])
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

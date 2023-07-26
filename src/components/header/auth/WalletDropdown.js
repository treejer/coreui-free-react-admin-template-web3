import React from 'react'
import PropTypes from 'prop-types'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'

const WalletDropdown = ({ address, open, signIn, visible, status }) => {
  return (
    <CDropdown className="w-25">
      {visible && (
        <CBadge
          className="border border-light p-2 spinner-grow w-15-icon"
          role="status"
          color={status === 'connected' ? 'success' : 'danger'}
          position="top-end"
          shape="rounded-circle"
        >
          <span className="visually-hidden">New alerts</span>
        </CBadge>
      )}
      <CDropdownToggle className="w-25 text-truncate" shape="rounded-pill" color="primary">
        <CAvatar
          size="sm"
          className="me-2"
          src={`https://www.gravatar.com/avatar/${address}?d=identicon`}
        />
        {address}
      </CDropdownToggle>
      {/* Dropdown Menu */}
      <CDropdownMenu color="">
        <CDropdownItem onClick={open}>Account</CDropdownItem>
        <CDropdownItem onClick={signIn}>Sign in wallet</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

WalletDropdown.propTypes = {
  address: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
}

export default WalletDropdown

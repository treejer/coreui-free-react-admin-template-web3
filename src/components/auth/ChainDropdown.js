import React from 'react'
import PropTypes from 'prop-types'
import supportedNetwork from './SupportedNetwork'
import { CAvatar, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

const ChainDropdown = ({ chains, chain, switchNetwork, isLoading, pendingChainId }) => {
  const findToken = (name) => supportedNetwork.find((x) => x.name === name)

  return (
    <CDropdown dark>
      <CDropdownToggle
        className="position-relative rounded-pill m-2 font-xs"
        variant="ghost"
        color="secondary"
      >
        {findToken(chain.name) ? '' : 'Unsupported Network Choosen'}
        <CAvatar src={findToken(chain.name) ? findToken(chain.name).cover : ''} size="sm" />
      </CDropdownToggle>
      <CDropdownMenu>
        {chains.map((x) => (
          <CDropdownItem
            disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick={() => switchNetwork?.(x.id)}
          >
            <CAvatar
              size="sm"
              className="mx-2"
              src={findToken(x.name) ? findToken(x.name).cover : ''}
            />
            {x.name}
            {isLoading && pendingChainId === x.id && ' (switching)'}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  )
}

ChainDropdown.propTypes = {
  chains: PropTypes.array,
  chain: PropTypes.object,
  switchNetwork: PropTypes.func,
  isLoading: PropTypes.bool,
  pendingChainId: PropTypes.number,
}

export default ChainDropdown

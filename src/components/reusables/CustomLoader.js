import React from 'react'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'

const CustomLoader = () => (
  <StyledLoader active size="massive" content="Laddar" />
)

export default CustomLoader

const StyledLoader = styled(Loader)`
  &&& {
    :after {
      border-color: ${props =>
        `${props.theme.secondary} transparent transparent`};
    }
  }
`

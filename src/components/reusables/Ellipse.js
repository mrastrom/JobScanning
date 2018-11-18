import React from 'react'
import styled from 'styled-components'

const Ellipse = ({
  height,
  width,
  top,
  left,
  bgcolor,
  boxshadow,
  zIndex,
  children
}) => (
  <StyledEllipse
    height={height}
    width={width}
    top={top}
    left={left}
    bgcolor={bgcolor}
    boxshadow={boxshadow}
    zIndex={zIndex}
  >
    {children}
  </StyledEllipse>
)

export default Ellipse

const StyledEllipse = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};

  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: ${props => (props.zIndex ? props.zIndex : '-1')};

  background: ${props => props.bgcolor};
  box-shadow: ${props =>
    props.boxshadow ? '0 0.3rem 0.5rem rgba(0, 0, 0, 0.5)' : 'none'};
  border-radius: 50%;
`

import styled from '@emotion/styled/macro'
import breakpoints from '../styles/breakpoints'

const LayoutContainer = styled.div`
   width: 100%;
   margin: 0 auto;
   padding: 0 2rem;
   
   @media(min-width: ${breakpoints.lg}) {
      width: ${breakpoints.lg};
   }
   @media(min-width: ${breakpoints.xl}) {
      width: ${breakpoints.xl};
   }

`

export default LayoutContainer

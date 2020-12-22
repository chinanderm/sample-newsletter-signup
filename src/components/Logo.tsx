import React from 'react'
import styled from '@emotion/styled'

import { appear } from '../styles/animations'
import { css } from '@emotion/react'

type Props = {
   altText: string
   fadeIn?: true
   link: string
   path: string
}
const Logo: React.FC<Props> = ({ altText, fadeIn, link, path }) => (
   <LogoContainer fadeIn={!!fadeIn}>
      <a href={link}>
         <LogoImage src={path} alt={altText} />
      </a>
   </LogoContainer>
)


export default Logo

export const LogoContainer = styled.div<{ fadeIn: boolean }>`
   width: 135px;
   ${props => props.fadeIn ? css`animation: .4s ease ${appear};` : null};
`

const LogoImage = styled.img`
   display: block;
   width: 100%;
   height: auto;
`
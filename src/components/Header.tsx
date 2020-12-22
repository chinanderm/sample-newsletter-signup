import React from 'react'
import styled from '@emotion/styled/macro'
import { graphql, useStaticQuery } from 'gatsby'
import Toggle from 'react-toggle'

import LayoutContainer from './LayoutContainer'
import Logo, { LogoContainer } from './Logo'
import { useTheme } from '@emotion/react'
import breakpoints from '../styles/breakpoints'

import 'react-toggle/style.css'
import Emoji, { EmojiProps } from './ui/buttons/Emoji'

type Props = {
   darkModeToggle: (darkMode: boolean) => void
}
const Header: React.FC<Props> = ({ darkModeToggle }) => {

   const { dataJson: data } = useStaticQuery(
      graphql`
         query {
            dataJson {
               homeLink {
                 url
                 image
                 imageWhite
                 altText
               }
             }
         }
      `
   )

   const theme = useTheme()

   return (
      <LayoutContainer>
         <Wrapper>
            <Logo
               altText={data.homeLink.altText}
               fadeIn
               link={data.homeLink.url}
               path={theme.darkMode ? data.homeLink.imageWhite : data.homeLink.image}
            />
            <ThemeToggleContainer>
               <Toggle
                  aria-label="Dark mode"
                  defaultChecked={theme.darkMode}
                  icons={{
                     checked: <ToggleIcon label="moon" symbol="🌜" />,
                     unchecked: <ToggleIcon label="sun" symbol="🌞" />
                  }}
                  onChange={event => darkModeToggle(event.target.checked)}
               />
            </ThemeToggleContainer>
         </Wrapper>
      </LayoutContainer>
   )
}

export default Header

const Wrapper = styled.div`
   display: flex;

   ${LogoContainer} {
      @media(max-width: ${breakpoints.smMax}) {
         width: 160px;
      }
   }
`

const ThemeToggleContainer = styled.div`
   margin-left: auto;
   
   .react-toggle--checked,
   .react-toggle--checked:hover:not(.react-toggle--disabled) {
      .react-toggle-track {
         background-color: #4D4D4D;
      }
   }
`

type ToggleIconProps = EmojiProps & {}
const ToggleIcon: React.FC<ToggleIconProps> = (props) => {

   const { ... rest } = props

   return (
      <Icon>
         <Emoji {...rest} />
      </Icon>
   )
}

const Icon = styled.div`
   align-items: center;
   display: flex;
   font-size: 1.6rem;
   height: 100%;
   justify-content: center;
`
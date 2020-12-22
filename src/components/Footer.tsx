import React, { useRef } from 'react'
import styled from '@emotion/styled/macro'
import LayoutContainer from './LayoutContainer'
import Logo, { LogoContainer } from './Logo'
import breakpoints from '../styles/breakpoints'
import { graphql, useStaticQuery } from 'gatsby'
import { useTheme } from '@emotion/react'

type FooterData = {
   homeLink: {
      altText: string
      image: string
      imageWhite: string
      url: string
   },
   legal: Array<{
      text: string
      url?: string
   }>
}

const Footer: React.FC = () => {

   const { dataJson: { footer } } = useStaticQuery(
      graphql`
         query {
            dataJson {
               footer {
                 legal {
                   text
                   url
                 }
                 homeLink {
                   url
                   image
                   imageWhite
                   altText
                 }
               }
             }
         }
      `
   )

   const data = footer as FooterData

   const theme = useTheme()

   return (
      <LayoutContainer>
         <FooterContainer>
            <Links>
               <nav aria-label="Resources">
                  <ul>
                     {data.legal.map(item => {
                        if (item.url) {
                           return (
                              <li key={item.url}>
                                 <a href={item.url} dangerouslySetInnerHTML={{ __html: item.text} } />
                              </li>
                           )
                        } else {
                           return (
                              <li key={item.text} dangerouslySetInnerHTML={{ __html: item.text} } />
                           )
                        }
                     })}
                  </ul>
               </nav>
            </Links>
            <Branding>
               <Logo
                  altText={data.homeLink.altText}
                  link={data.homeLink.url}
                  path={theme.darkMode ? data.homeLink.imageWhite : data.homeLink.image}
               />
            </Branding>
         </FooterContainer>
      </LayoutContainer>
   )
}

export default Footer

const FooterContainer = styled.div`
   color: ${props => props.theme.colors.textPrimary};
   display: grid;
   grid-template-rows: auto;
   justify-content: center;
   grid-gap: 30px;
   padding: 50px 0;
   margin: 25px 0 0;

   @media(min-width: ${breakpoints.md}) {
      grid-template-columns: 1fr 1fr;
      justify-content: initial;
      margin: 50px 0 0;
   }

`

const Links = styled.div`
   font-size: 1.4rem;

   &,
   ul {
      align-items: center;
      display: flex;
      flex-direction: column;

      @media(min-width: ${breakpoints.xs}) {
         flex-direction: row;
      }

   }

   li + li {
      margin-top: 10px;

      @media(min-width: ${breakpoints.xs}) {
         margin: 0;

         &::before {
            content: '|';
            margin: 0 5px;
         }
      }
   }

   a {
      color: inherit;

      &:hover {
         color: ${props => props.theme.colors.textPrimary700};
      }
   }

`

const Branding = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   @media(min-width: ${breakpoints.md}) {
      justify-content: flex-end;
   }

   ${LogoContainer} {
      width: 140px;
      margin-right: 10px;
   }

`
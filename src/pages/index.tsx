import React from 'react'
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled/macro'
import { graphql, useStaticQuery } from 'gatsby'

import { themeColorsDark, themeColorsLight } from '../styles/theme'
import LayoutContainer from '../components/LayoutContainer'
import SignUpForm from '../components/SignUpForm'
import breakpoints from '../styles/breakpoints'
import Footer from '../components/Footer'
import BenefitCards from '../components/benefit-cards/BenefitCards'
import { appear } from '../styles/animations'
import SEO from '../components/seo'
import useDarkMode from '../hooks/useDarkMode'
import Header from '../components/Header'

import '../styles/reset.css'
import '../styles/global.css'

const IndexPage = () => {

   const { dataJson: data } = useStaticQuery(
      graphql`
         query {
            dataJson {
               headline {
                  description {
                    text
                  }
                  heading {
                    text
                  }
               }
             }
         }
      `
   )

   const [isDarkMode, setIsDarkMode] = useDarkMode()

   return (
      <PageWrapper>
         <SEO />
         <ThemeProvider theme={{ colors: isDarkMode ? themeColorsDark : themeColorsLight, darkMode: isDarkMode }}>
            <HeroContainer>
               <Header darkModeToggle={setIsDarkMode} />
               <LayoutContainer>
                  <LedeAndFormContainer>
                     <Headline>{data.headline.heading.text}</Headline>
                     <Summary>{data.headline.description.text}</Summary>
                     <SignUpFormContainer>
                        <SignUpForm />
                     </SignUpFormContainer>
                  </LedeAndFormContainer>
               </LayoutContainer>
            </HeroContainer>
            <BenefitCards />
            <Footer />
         </ThemeProvider>
      </PageWrapper>
   )
}

export default IndexPage

const PageWrapper = styled.div``

const HeroContainer = styled.div`
   background-color: ${props => props.theme.colors.heroBg};
   padding: 30px 0;

   @media(min-width: ${breakpoints.md}) {
      padding: 40px 0;
   }
   @media(min-width: ${breakpoints.lg}) {
      padding: 50px 0;
   }
`

const LedeAndFormContainer = styled.div`
   display: grid;
   grid-gap: 30px;
   grid-template-areas:
      "headline"
      "form"
      "summary";
   padding: 30px 0 0;
   animation: .4s ease ${appear};
   
   @media(min-width: ${breakpoints.lg}) {
      padding: 40px 0 0;
   }
   @media(min-width: ${breakpoints.lg}) {
      grid-column-gap: 80px;
      grid-row-gap: 10px;
      grid-template-areas:
         "headline form"
         "summary form";
      padding: 50px 0 0;
   }

`
const Headline = styled.h1`
   color: ${props => props.theme.colors.textPrimary};
   font-size: 3rem;
   font-weight: 600;
   grid-area: headline;
   line-height: 1.08333;

   @media(min-width: ${breakpoints.md}) {
      font-size: 4rem;
   }
   @media(min-width: ${breakpoints.xl}) {
      font-size: 4.8rem;
   }
`
const Summary = styled.div`
   color: ${props => props.theme.colors.textPrimary};
   font-size: 1.4rem;
   grid-area: summary;
   line-height: 1.55555;

   @media(min-width: ${breakpoints.md}) {
      font-size: 1.7rem;
   }
   @media(min-width: ${breakpoints.xl}) {
      font-size: 1.8rem;
   }
`
const SignUpFormContainer = styled.div`
   grid-area: form;

   @media(min-width: ${breakpoints.lg}) {
      width: 360px;
   }

`

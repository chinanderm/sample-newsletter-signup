import React, { useState } from 'react'
import styled from '@emotion/styled/macro'
import SwipableViews from 'react-swipeable-views'

import breakpoints from '../../styles/breakpoints'
import LayoutContainer from '../LayoutContainer'
import BenefitCard, { Card } from './BenefitCard'
import useMedia from '../../hooks/useMedia'
import { ResetButton } from '../ui/buttons'
import { appearSlideUp } from '../../styles/animations'
import { graphql, useStaticQuery } from 'gatsby'

const BenefitCards: React.FC = () => {

   const { dataJson: { benefitCards: data }} = useStaticQuery(graphql`
      query {
         dataJson {
            benefitCards {
               id
               text
               image {
                  altText
                  url
               }
            }
         }
      }
   `)

   const cardsData = data as Card[]

   const isMobile = useMedia<boolean>([`(max-width: ${breakpoints.smMax})`], [true], false)

   return (
      <BenefitCardsContainer>
         <LayoutContainer>
            {isMobile
               ? <SwipableCards cards={cardsData} />
               : <GridCards cards={cardsData} />
            }
         </LayoutContainer>
      </BenefitCardsContainer>
   )
}

export default BenefitCards

type CardsListsProps = {
   cards: Card[]
}
const GridCards: React.FC<CardsListsProps> = ({ cards }) => {
   return (
      <CardsList>
         {cards.map(c => (
            <li key={c.id}>
               <BenefitCard {...c} />
            </li>
         ))}
      </CardsList>
   )
}

const SwipableCards: React.FC<CardsListsProps> = ({ cards }) => {

   const [curIndex, setCurIndex] = useState(0)

   return (
      <SwipeCardsWrapper>
         <SwipableViews
            enableMouseEvents={true}
            index={curIndex}
            onChangeIndex={(index) => setCurIndex(index)}
            style={{ padding: '0 30px' }}
         >
            {cards.map(c => (
               <SwipeCard key={c.id}>
                  <BenefitCard key={c.id} {...c} />
               </SwipeCard>
            ))}
         </SwipableViews>
         <ChangerWrapper>
            <IndexChanger>
               {cards.map((_, i) => (
                  <Indicator key={i} active={i === curIndex} onClick={() => setCurIndex(i)} />
               ))}
            </IndexChanger>
         </ChangerWrapper>
      </SwipeCardsWrapper>
   )
}

const BenefitCardsContainer = styled.div`
   position: relative;

   &::before {
      content: '';
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background-color: ${props => props.theme.colors.heroBg};
   }

   @media(min-width: ${breakpoints.md}) {
      &::after {
         content: '';
         position: absolute;
         z-index: 0;
         bottom: 50%;
         left: 0;
         width: 100%;
         height: 200px;
         background-image: url('/images/cityscape-light-green.svg');
         background-position: center bottom;
         background-repeat: no-repeat;
      }
   }
`

const CardsList = styled.ul`
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   grid-gap: 15px;
   position: relative;
   z-index: 1;
   animation: 0.5s ease ${appearSlideUp};

   @media(min-width: ${breakpoints.lg}) {
      grid-gap: 35px;
   }
`

const SwipeCardsWrapper = styled.div`
   margin: 0 -2rem;
`

const SwipeCard = styled.div`
   margin: 0 10px;
`
const ChangerWrapper = styled.div`
   display: flex;
   justify-content: center;
   margin: 15px 0 0;
`
const IndexChanger = styled.div`
   display: inline-flex;
   margin: 0 auto;
`
const Indicator = styled(ResetButton) <{ active: boolean }>`
   background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.theme};
   border: 1px solid ${props => props.theme.colors.primary};
   border-radius: 50%;
   height: 12px;
   margin-left: 5px;
   transition: background-color .25s;
   width: 12px;

   &:first-of-type {
      margin-left: 0;
   }
`
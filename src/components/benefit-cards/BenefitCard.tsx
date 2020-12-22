import React from 'react'
import styled from '@emotion/styled/macro'
import breakpoints from '../../styles/breakpoints'

export type Card = {
   id: string
   image: {
      altText: string
      url: string
   }
   text: string
}

type Props = Card & {}
const BenefitCard: React.FC<Props> = (props) => {

   const { text, image } = props

   return (
      <Card>
         <CardInner>
            <CardIllustration src={image.url} alt={image.altText} />
            <CardText>
               {text}
            </CardText>
         </CardInner>
      </Card>
   )
}

export default BenefitCard

const Card = styled.div`
   height: 100%;
   position: relative;
   padding-bottom: 12px;

   &::after {
      content: '';
      position: absolute;
      z-index: 0;
      top: calc(100% - 14px);
      left: 10px;
      width: calc(100% - 20px);
      height: 10px;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 0 0 10px 10px;
      margin: 1px 0 0;
   }
`
const CardInner = styled.div`
   background-color: ${props => props.theme.colors.cardBg};
   border: 1px solid ${props => props.theme.colors.border};
   border-radius: 10px;
   display: grid;
   grid-gap: 15px;
   grid-template-rows: 110px auto;
   height: 100%;
   padding: 30px;

   @media(min-width: ${breakpoints.lg}) {
      grid-gap: 30px;
      grid-template-rows: 120px auto;
   }
   @media(min-width: ${breakpoints.xl}) {
      grid-template-rows: 155px auto;
      padding: 50px;
   }
`

const CardIllustration = styled.img`
   display: block;
   width: auto;
   height: 100%;
   margin: 0 auto;
`
const CardText = styled.div`
   color: ${props => props.theme.colors.textPrimary};
   font-size: 1.8rem;
   font-weight: 600;
   line-height: 1.29;
   text-align: center;

   @media(min-width: ${breakpoints.md}) {
      font-size: 1.6rem;
   }
   @media(min-width: ${breakpoints.lg}) {
      font-size: 2rem;
   }
   @media(min-width: ${breakpoints.xl}) {
      font-size: 2.4rem;
   }
`
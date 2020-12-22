import styled from '@emotion/styled/macro'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import breakpoints from '../styles/breakpoints'
import { ResetButton } from './ui/buttons'

const SignUpForm: React.FC = () => {

   const { dataJson: { signUpForm: data }} = useStaticQuery(graphql`
      query {
         dataJson {
            signUpForm {
               emailField {
                  id
                  placeholder
                  type
               }
               submitButton {
                  text
               }
            }
         }
      }
   `)

   const [email, setEmail] = useState('')

   const onSubmit = (event: React.FormEvent) => {
      event.preventDefault()
      console.log(`New sign up: ${email}`)
   }

   return (
      <FormContainer>
         <Form onSubmit={onSubmit}>
            <InputField
               onChange={e => setEmail(e.currentTarget.value)}
               placeholder={data.emailField.placeholder}
               required
               type={data.emailField.type}
               value={email}
            />
            <SubmitButton type="submit">
               {data.submitButton.text}
            </SubmitButton>
         </Form>
      </FormContainer>
   )
}

export default SignUpForm

const FormContainer = styled.div`
   background-color: ${props => props.theme.colors.primary};
   border-radius: 10px;
   height: 100%;
   padding: 2rem;

   @media(min-width: ${breakpoints.lg}) {
      padding: 3rem;
   }

`
const Form = styled.form`
   height: 100%;
   display: grid;
   grid-gap: 10px;
   grid-template-rows: 1fr 1fr;

   @media(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
      grid-template-rows: initial;
      grid-template-columns: auto 35%;
   }

`

const InputField = styled.input`
   background-color: ${props => props.theme.colors.cardBg};
   border-radius: 5px;
   color: ${props => props.theme.colors.textPrimary};
   font-family: inherit;
   font-size: 1.6rem;
   min-height: 40px;
   padding: 0 1.5rem;
`
const SubmitButton = styled(ResetButton)`
   background-color: ${props => props.theme.colors.cta};
   border-radius: 5px;
   font-size: 1.6rem;
   font-weight: 600;
   min-height: 40px;
   text-transform: uppercase;
   transition: .1s all ease;

   &:hover {
      background-color: ${props => props.theme.colors.cta700};
   }
`
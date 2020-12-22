/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Props = {
   description?: string
   lang?: string
   title?: string
}

const SEO: React.FC<Props> = ({ description, lang, title }) => {
   const { site } = useStaticQuery(
      graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
   )

   const metaDescription = description || site.siteMetadata.description
   const siteTitle = title ?? site.siteMetadata.title

   return (
      <Helmet
         htmlAttributes={{
            lang,
         }}
         title={siteTitle}
         meta={[
            {
               name: `description`,
               content: metaDescription,
            },
            {
               property: `og:title`,
               content: title,
            },
            {
               property: `og:description`,
               content: metaDescription,
            },
         ]}
      />
   )
}

SEO.defaultProps = {
   lang: `en`,
   description: ``,
}

export default SEO

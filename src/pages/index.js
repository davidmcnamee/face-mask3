import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import ProductTemplate from '../templates/product';

const IndexPage = props => {
  const products = props.data.allMdx.edges;
  const pageData = props.data.pageDataYaml || {
    name: "Home",
    title: "Christine's Masks 😷",
    img: "jfa_banner.jpg",
    greeting: "👋 Hey people",
    text: "I've been making face masks for COVID-19 preparedness, and so far I've been churning out about 10 a day!\nIf you want one from the display below, email me at cmcnamee1@rogers.com with the color name.\nHappy crafting!"
  };

  return (
    <Layout location={props.location} title={pageData.title}>
      <SEO
        title="Home"
        keywords={[`face mask`, `covid`, `tsung tsin`]}
      />
      <img style={{ margin: 0 }} src={pageData.img} alt="jfa wearing a mask" />
      <h1>
        {pageData.greeting}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          {pageData.text}
        </div>
        <div>
          <img src="/assets/undraw_wash_hands_nwl2.svg" alt="washing hands" />
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gridTemplateRows: 'auto',
        rowGap: 50,
        columnGap: `15%`,
        margin: '100px 0 200px',
      }}>
        {products
          .filter(p => p.node.frontmatter.adult || p.node.frontmatter.youth)
          .map(p => (
            <ProductTemplate
              key={p.node.frontmatter.tag}
              data={p.node.frontmatter}
            />
        ))}
      </div>
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query AllProducts {
    allMdx(filter: {fileAbsolutePath: {regex: "/products/"}}) {
      edges {
        node {
          frontmatter {
            date
            tag
            adult
            youth
            photo
          }
        }
      }
    }
    pageDataYaml(name: {eq: "Home"}) {
      name
      title
      img
      greeting
      text
    }
  }
`

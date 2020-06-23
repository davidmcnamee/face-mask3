import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import ProductTemplate from "../templates/product"

const ProductsGrid = props => {
  const { products } = props

  if (products.length === 0) {
    return <h3>Sorry, all gone!</h3>
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gridTemplateRows: "auto",
        rowGap: 50,
        columnGap: `15%`,
        margin: "100px 0 100px",
      }}
    >
      {products.map(p => (
        <ProductTemplate key={p.tag} data={p} />
      ))}
    </div>
  )
}

const IndexPage = props => {
  const ogProducts = props.data.allMdx.edges
  const products = ogProducts
    .map(p => p.node.frontmatter)
    .filter(p => {
      return !!p.adult || !!p.youth || !!p.small || !!p.medium || !!p.large
    })
    .map(p => {
      const newProduct = { ...p }
      // normalization
      newProduct.adult = p.adult || 0
      newProduct.youth = p.youth || 0
      newProduct.small = p.small || 0
      newProduct.medium = p.medium || 0
      newProduct.large = p.large || 0
      newProduct.creator = p.creator || "christine"
      return newProduct
    })
    .sort((a, b) => {
      return a.tag.localeCompare(b.tag)
    })
  const pageData = props.data.pageDataYaml

  return (
    <Layout location={props.location} title={pageData.title}>
      <SEO title="Home" keywords={[`face mask`, `covid`, `tsung tsin`]} />
      <img style={{ margin: 0 }} src={pageData.img} alt="jfa wearing a mask" />
      <h1>{pageData.greeting}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: pageData.text }} />
        <div>
          <img src="/assets/undraw_wash_hands_nwl2.svg" alt="washing hands" />
        </div>
      </div>
      <div>
        <h2>{pageData.rosieTitle}</h2>
        <p>{pageData.rosieBlurb}</p>
      </div>
      <ProductsGrid products={products.filter(p => p.creator === "rosie")} />
      <div>
        <h2>{pageData.mariaTitle}</h2>
        <p>{pageData.mariaBlurb}</p>
      </div>
      <ProductsGrid products={products.filter(p => p.creator === "maria")} />
      <div>
        <h2>{pageData.christineTitle}</h2>
        <p>{pageData.christineBlurb}</p>
      </div>
      <ProductsGrid
        products={products.filter(p => p.creator === "christine")}
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query AllProducts {
    allMdx(filter: { fileAbsolutePath: { regex: "/products/" } }) {
      edges {
        node {
          frontmatter {
            date
            tag
            creator
            adult
            youth
            small
            medium
            large
            photo
          }
        }
      }
    }
    pageDataYaml(name: { eq: "Home" }) {
      name
      title
      img
      greeting
      text
      christineTitle
      rosieTitle
      mariaTitle
      christineBlurb
      rosieBlurb
      mariaBlurb
    }
  }
`

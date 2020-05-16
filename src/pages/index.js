import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import ProductTemplate from '../templates/product';

const IndexPage = props => {
  const products = props.data.allMdx.edges;
  const siteTitle = "Gatsby Starter Personal Website"

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Home"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" />
      <h1>
        Hey people{" "}
        <span role="img" aria-label="wave emoji">
          👋
          </span>
      </h1>
      <p>Welcome to your new Gatsby website. You are on your home page.</p>
      <p>
        This starter comes out of the box with styled components and Gatsby's
        default starter blog running on Netlify CMS.
        </p>
      <p>Now go build something great!</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto',
        gridGap: '20px 20px',
      }}>
        {products.map(p => (
          <ProductTemplate
            data={p.node.frontmatter}
          />
        ))}
      </div>
      <Link to="/blog/">
        <Button marginTop="35px">Go to Blog</Button>
      </Link>
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
            description
            path
            name
            photo
            stock
          }
        }
      }
    }
  }
`

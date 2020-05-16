import axios from 'axios';
import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import ProductTemplate from '../templates/product';

const FUNCTIONS_BASE_URL = `${process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'https://christines-masks.netlify.app'}/.netlify/functions`

const IndexPage = props => {
  const products = props.data.allStrapiProducts.edges;
  const siteTitle = "Christine's Masks 😷"
  // const [selectedProducts, setSelectedProducts] = useState([1]);

  // useEffect(() => {
  //   (async function() {
  //     try {
  //       console.log(FUNCTIONS_BASE_URL);
  //       await axios.get(`${FUNCTIONS_BASE_URL}/requestMasks?products=${selectedProducts.join(',')}`);
  //       alert('success!');
  //     } catch(err) {
  //       alert(err.toString());
  //     }
  //   })();
  // }, []);

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Home"
        keywords={[`face mask`, `covid`, `tsung tsin`]}
      />
      <img style={{ margin: 0 }} src="./jfa_banner.jpg" alt="jfa wearing a mask" />
      <h1>
        <span role="img" aria-label="wave emoji">
          👋
        </span>{" "}Hey people
      </h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          <p>I've been making face masks for COVID-19 preparedness, and so far I've been churning out about 10 a day!</p>
          <p>
            If you want one from the display below, email me at cmcnamee1@rogers.com with the color name.
        </p>
          <p>Happy crafting!</p>
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
          .filter(p => p.node.stock)
          .map(p => (
            <ProductTemplate
              key={p.node.path}
              data={p.node}
            />
        ))}
      </div>
    </Layout>
  );
}

export default IndexPage;

// export const pageQuery = graphql`
//   query AllProducts {
//     allMdx(filter: {fileAbsolutePath: {regex: "/products/"}}) {
//       edges {
//         node {
//           frontmatter {
//             date
//             description
//             path
//             name
//             photo
//             stock
//           }
//         }
//       }
//     }
//   }
// `

export const pageQuery = graphql`
  query AllStrapiProducts {
    allStrapiProducts {
      edges {
        node {
          date
          description
          path
          name
          photo {
            publicURL
          }
          stock
        }
      }
    }
  }
`
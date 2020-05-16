import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

const ProductTemplate = props => {
  const { data } = props;
  const { date, description, path, name, photo, stock } = data;
  console.log(photo);
  return (
    <div>
      <img src={photo} style={{
        borderRadius: '50px',
        boxShadow: 'rgba(0, 0, 0,0.3) 5px 7px 9px',
      }}/>
    </div>
  );
}

export default ProductTemplate

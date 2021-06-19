import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components";

import Layout from "../components/layout"
import Seo from "../components/seo"
import { render } from "react-dom"

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: royalblue;
`;

const IndexPage = ({ data }) => {
  console.log(data.allMarkdownRemark);

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <h1>Shaine's Journey</h1>
        <h4>Posts Count: { data.allMarkdownRemark.totalCount }</h4>
        {
          data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <BlogLink to={node.fields.slug}>
                <BlogTitle>
                  {node.frontmatter.title} - {node.frontmatter.date}
                </BlogTitle>
              </BlogLink>
              <p>{node.excerpt}</p>
            </div>
          ))
        }
      </div>
    </Layout>
  )
}


export default IndexPage;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            date
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

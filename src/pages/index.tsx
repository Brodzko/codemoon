import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

interface IndexProps {
  data: {
    allMdx: any;
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: Location;
}

const BlogIndex = ({ data, location }: IndexProps) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }: any) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            <footer style={{ fontSize: '.7rem' }}>
              Tagged{' '}
              {node.frontmatter.tags.map((tag: string) => (
                <span
                  className="tag--small"
                  key={tag}
                  style={{ margin: '0 .2rem' }}
                >
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </span>
              ))}
            </footer>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;

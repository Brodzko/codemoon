import React from 'react';

// Components
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

interface TagProps {
  pageContext: {
    tag: string;
  };
  data: any;
  location: Location;
}

const Tag = ({ pageContext, data, location }: TagProps) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;
  return (
    <Layout location={location} title={`Posts tagged ${tag}`}>
      <h1>{tagHeader}</h1>
      <Link to="/tags">See all tags</Link>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {edges.map(({ node }: any) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={slug}>{title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Tag;

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`;

import React from 'react';
// Utilities
import kebabCase from 'lodash/kebabCase';
// Components
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

interface TagsPageProps {
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

const TagsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}: TagsPageProps) => (
  <Layout location={location} title="Tags">
    <Helmet title={title} />
    <div>
      <h1>Browse by tag</h1>
      <ul className="tags-list">
        {group.map(tag => (
          <li key={tag.fieldValue} className="tags-list__item">
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

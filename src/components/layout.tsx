import React from 'react';
import { Link, useStaticQuery } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import { graphql } from 'gatsby';

import Image from 'gatsby-image';

interface LayoutProps {
  location: Location;
  title: string;
  children?: any;
}

const Layout = ({ location, title, children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query Logo {
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `);

  const header = (
    <Link
      style={{
        boxShadow: `none`,
        textDecoration: `none`,
        color: `inherit`,
      }}
      to={`/`}
    >
      <Image fixed={data.logo.childImageSharp.fixed}></Image>
    </Link>
  );

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;

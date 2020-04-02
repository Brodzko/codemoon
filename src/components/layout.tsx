import React from 'react';
import { Link, useStaticQuery } from 'gatsby';

import { rhythm } from '../utils/typography';
import { graphql } from 'gatsby';

import Image from 'gatsby-image';

import { FaTwitter, FaGithub } from 'react-icons/fa';

interface LayoutProps {
  location: Location;
  title: string;
  children?: any;
}

const Layout = ({ location, title, children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
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
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {header}
        <div>
          <a
            className="header__social-icon"
            href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}
            target="_blank"
          >
            <FaTwitter />
          </a>
          <a
            className="header__social-icon"
            href={`https://github.com/${data.site.siteMetadata.social.github}`}
            target="_blank"
          >
            <FaGithub />
          </a>
        </div>
      </header>
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

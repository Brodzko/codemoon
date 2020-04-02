import Typography from 'typography';
import defaultTheme from 'typography-theme-fairy-gates';
import gray from 'gray-percentage';
import type, { OptionsType } from 'Types';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';
import verticalRhythm from 'compass-vertical-rhythm';

defaultTheme.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
  };
};

defaultTheme.bodyColor = '#f7f7f7';
defaultTheme.headerColor = '#f7f7f7';

defaultTheme.overrideStyles = (
  { adjustFontSizeTo, scale, rhythm },
  options,
) => {
  const linkColor = '#9cef37';
  const vr = verticalRhythm({
    baseFontSize: '17px',
    baseLineHeight: '24.65px',
  });
  return {
    a: {
      color: linkColor,
      textDecoration: 'none',
      // textShadow:
      //   '.03em 0 #fff,-.03em 0 #fff,0 .03em #fff,0 -.03em #fff,.06em 0 #fff,-.06em 0 #fff,.09em 0 #fff,-.09em 0 #fff,.12em 0 #fff,-.12em 0 #fff,.15em 0 #fff,-.15em 0 #fff', // eslint-disable-line
      // backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
    },
    'a:hover,a:active': {
      textShadow: 'none',
      backgroundImage: 'none',
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(1.5),
      marginBottom: rhythm(0.5),
    },
    // Blockquote styles.
    blockquote: {
      ...scale(1 / 5),
      borderLeft: `${rhythm(6 / 16)} solid ${linkColor}`,
      opacity: 0.9,
      paddingLeft: rhythm(10 / 16),
      fontStyle: 'italic',
      marginLeft: 0,
      marginRight: 0,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontStyle: 'normal',
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    [MOBILE_MEDIA_QUERY]: {
      html: {
        ...vr.establishBaseline(),
      },
      blockquote: {
        borderLeft: `${rhythm(3 / 16)} solid ${linkColor}`,
        opacity: 0.9,
        paddingLeft: rhythm(9 / 16),
        fontStyle: 'italic',
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
      },
    },
  };
};

// delete defaultTheme.googleFonts;

const typography = new Typography(defaultTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

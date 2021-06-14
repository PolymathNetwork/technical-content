import PropTypes from 'prop-types';
import React from 'react';
import SEO from '../../gatsby-theme-apollo-core/components/seo.js';
import {withPrefix} from 'gatsby';

export default function CustomSEO({image, baseUrl, twitterHandle, ...props}) {
  const imagePath = withPrefix('/' + image).replace("/social-cards/", "/social-cards-custom/");
  return (
    <SEO {...props} twitterCard="summary_large_image">
      <meta property="og:image" content={imagePath} />
      {baseUrl && <meta name="twitter:image" content={imagePath} />}
      {twitterHandle && (
        <meta name="twitter:site" content={`@${twitterHandle}`} />
      )}
    </SEO>
  );
}

CustomSEO.propTypes = {
  baseUrl: PropTypes.string,
  image: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string
};

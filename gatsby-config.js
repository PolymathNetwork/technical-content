const themeOptions = require('./theme-options');
const remarkTypescript = require('remark-typescript');

const pathPrefix = "/";

const getSidebarConfig = () => {
  const sidebarContent = require('./content/structure.js');
  const sidebarDefaults = {
    null: [
      'index',
    ]
  };

  return sidebarCategories = {...sidebarDefaults, ...sidebarContent};
}

const subSites = [
  {
    id: "polymesh-docs",
    sidebarCategories: require('./content/polymesh-docs/structure.js')
  }
]

console.log(subSites);

const sidebarConfig = getSidebarConfig();

const shareImageConfig = {
  cloudName: process.env.CLOUDINARY_NAME || 'dk6bl0g1a',
  imagePublicID: process.env.CLOUDINARY_IMAGE_ID || 'polimesh-social-bg',
  tagline: "",
  titleFont: "inter.woff2",
  textAreaWidth: 1200,
  titleLeftOffset: 80,
  titleBottomOffset: 80,
  titleFontSize: 92,
  textColor: "ffffff"
};

const apolloDocsOptions = {
  ...themeOptions,
  root: __dirname,
  contentDir: './content/',
  description: 'Polymesh Developer Portal',
  githubRepo: 'PolymathNetwork/technical-content',
  siteName: 'Polymesh Developer Portal',
  sidebarCategories: getSidebarConfig(),
  shareImageConfig: shareImageConfig,
  subSites: subSites
}

const apolloRemarkPluginConfig = require("gatsby-theme-apollo-docs/gatsby-config.js")({
  ...apolloDocsOptions,
  sidebarCategories: sidebarConfig
});

const apolloGatsbyRemarkPlugins = apolloRemarkPluginConfig.plugins.find(i => i.resolve == "gatsby-transformer-remark").options.plugins;

let remarkPluginConfig = [
  {
    resolve: "gatsby-remark-embed-video",
    options: {
      width: 800,
      related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
      noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
      urlOverrides: [
        {
          id: "youtube",
          embedURL: videoId =>
            `https://www.youtube-nocookie.com/embed/${videoId}`,
        },
      ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
      containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
    },
  },
  {
    resolve: `gatsby-remark-katex`,
    options: {
      // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
      strict: `ignore`
    }
  },
  {
    resolve: "gatsby-remark-images",
    options: {
      maxWidth: 936, // page max container width
      linkImagesToOriginal: false,
      showCaptions: false,
      quality: 70
    }
  },
  {
    resolve: "gatsby-remark-images-medium-zoom",
    options: {
      excludedSelector: "no-zoom"
    }
  }
]

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    title: "Polymesh Developer Portal",
    siteUrl: themeOptions.siteUrl,
    topMenu: [
      {
        category: null,
        name: "Developer Portal",
        link: "/"
      },
      {
        category: "polymesh-docs",
        name: "Polymesh Docs",
        link: "/polymesh-docs/network/polyx"
      },
      {
        category: "sdk-api-doc",
        name: "SDK Docs",
        link: "https://github.com/PolymathNetwork/polymesh-sdk/wiki",
        external: true
      },
      {
        category: "ref-doc",
        name: "Rust Docs",
        link: "https://docs.polymesh.live/polymesh/index.html",
        external: true
      },
      {
        category: "category",
        name: "Community",
        link: "/community/",
      },

    ]
  },
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: apolloDocsOptions
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: remarkPluginConfig.concat(apolloGatsbyRemarkPlugins, ['gatsby-remark-autolink-headers', 'gatsby-remark-check-links'])
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: remarkPluginConfig.concat(apolloGatsbyRemarkPlugins),
        remarkPlugins: [
          [remarkTypescript, {wrapperComponent: 'MultiCodeBlock'}]
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true
        /*srcSetBreakpoints: [ 200, 340, 520, 736, 1024, 1280 ]*/
      }
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-T48VT66",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "devportal" },
        // Specify optional GTM environment details.
        //gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        //gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        //dataLayerName: "YOUR_DATA_LAYER_NAME",
        routeChangeEventName: "devportal-navigate",
      },
    },
    {
      resolve: "gatsby-remark-reading-time"
    }
  ]
};
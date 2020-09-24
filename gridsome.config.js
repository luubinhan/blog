// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path');

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/style/_variables.scss'),
        path.resolve(__dirname, './src/assets/style/_function.scss'),
      ],
    })
}


module.exports = {
  siteUrl: 'https://vuilaptrinh.com',
  pathPrefix: '/',
  siteName: 'VuiLapTrinh.com',
  siteDescription: 'Tutorials, Blog, Hướng dẫn, chia sẽ kinh nghiệm về Frontend, react, vue, ux, ui',

  icon: './src/assets/luckyluu.svg',

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
    
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },

  templates: {
    Post: '/:title',
    Tag: '/tag/:id'
  },

  plugins: [
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/exclude-me'],
        config: {
          '/articles/*': {
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: '2020-02-19',
          },
          '/about': {
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: '2020-05-12',
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-29685098-2'
      }
    },
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: '@microflash/gridsome-plugin-feed',
      options: {

        // (required) Provide GraphQL collection types
        contentTypes: ['BlogPost'],

        // (optional) Properties used by feed API
        // See https://github.com/jpmonette/feed#example for all options
        feedOptions: {
          title: 'vuilaptrinh.com một trang web của luckyluu',
          description: 'Tutorials, Blog, Hướng dẫn, chia sẽ kinh nghiệm về Frontend, react, vue, ux, ui'
        },

        // Available options with their default values

        // (optional) Options for feed formats
        // RSS is enabled by default
        rss: {
          enabled: true,
          output: '/feed.xml'
        },
        atom: {
          enabled: false,
          output: '/feed.atom'
        },
        json: {
          enabled: false,
          output: '/feed.json'
        },

        // (optional) number of items to include in a feed
        maxItems: 25,

        // (optional) an array of properties to be parsed as HTML
        // Converts relative URLs to absolute URLs
        // You can disable this by omitting the option
        htmlFields: ['content'],

        // (optional) appends a trailing slash to the URLs
        enforceTrailingSlashes: false,

        // (optional) a function to filter out the nodes
        // e.g., filter out all outdated posts, filterNodes: (node) => !!node.outdated
        filterNodes: (node) => true,

        // (optional) sets the properties on each feed item
        // See https://github.com/jpmonette/feed#example for all options
        nodeToFeedItem: (node) => ({
          title: node.title,
          date: node.date,
          content: node.content
        })
      },      
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['title'],
        collections: [
          {
            typeName: 'Post',
            indexName: 'Post',
            fields: ['title', 'desc']
          }
        ]
      }
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
          // Service Worker Options
          disableServiceWorker: false,
          serviceWorkerPath: 'service-worker.js',
          cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
          disableTemplatedUrls: false,       // Optional

          // Manifest Options (https://developer.mozilla.org/en-US/docs/Web/Manifest)
          manifestPath: 'manifest.json',
          title: 'Gridsome',
          startUrl: '/',
          display: 'standalone',
          statusBarStyle: 'default',
          themeColor: '#666600',
          backgroundColor: '#ffffff',
          icon: '',
          shortName: 'Gridsome',              // Optional
          description: 'Gridsome is awesome!',// Optional
          categories: ['education'],          // Optional
          lang: 'en-GB',                      // Optional
          dir: 'auto',                        // Optional
          maskableIcon: true,                 // Optional
          screenshots: [                      // Optional
              {
                  src: 'src/screenshot1.png',
                  sizes: '1280x720',
                  type: 'image/png',
              },
          ],
          // gcmSenderId: undefined,             // Optional

          // Standard Meta Tags
          svgFavicon: 'favicon.svg',          // Optional. Requires favicon.ico fallback

          // Microsoft Windows Meta Tags
          msTileColor: '#666600',             // Optional

          // Apple MacOS Meta Tags
          appleMaskIcon: 'favicon.svg',       // Optional
          appleMaskIconColor: '#666600',      // Optional
      }
    },
    {
      use: "gridsome-plugin-recommender",
      options: {
        enabled: true,
        typeName: 'Post',
        field: 'title',
        relatedFieldName: 'related',
        minScore: 0.01,
        maxScore: 1,
        minRelations:3,
        maxRelations: 10,
        fillWithRandom:false,
        debug: false
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  }
};

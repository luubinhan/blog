// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Website Name",
  siteUrl: "#",
  siteDescription: "Description of your Website.",

  templates: {
    Post: "/:title"
  },

  plugins: [
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "My Awesome Blog",
          feed_url: "https://superblog.com/rss.xml",
          site_url: "https://superblog.com"
        },
        feedItemOptions: (node) => ({
          title: node.title,
          description: node.description,
          url: "https://superblog.com/post/" + node.slug
        }),
        output: {
          dir: "./static",
          name: "rss.xml"
        }
      }
    },
    {
      use: "gridsome-plugin-flexsearch",
      options: {
        collections: [
          {
            typeName: "Post",
            indexName: "Post",
            fields: ["title", "description"]
          }
        ],
        searchFields: ["title"]
      }
    }, /*     {
      use: "gridsome-plugin-pwa",
      options: {
        title: "Gridsome",
        startUrl: "/",
        display: "standalone",
        statusBarStyle: "default",
        manifestPath: "manifest.json",
        disableServiceWorker: true,
        serviceWorkerPath: "service-worker.js",
        cachedFileTypes: "js,json,css,html,png,jpg,jpeg,svg",
        shortName: "Gridsome",
        themeColor: "#666600",
        backgroundColor: "#ffffff",
        icon: "", // must be provided like 'src/favicon.png'
        msTileImage: "",
        msTileColor: "#666600",
      },
    }, */
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md"
      }
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-XXXXXXXXXXX"
      }
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000, // default
        exclude: ["/exclude-me"],
        config: {
          "/*": {
            changefreq: "weekly",
            priority: 0.5
          }
        }
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"]
    }
  }
};

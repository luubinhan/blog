module.exports = {
  pathPrefix: '/blog/',
  siteMetadata: {
    author: 'luckyluuu',
    title: `luckyluu | FrontEnd Developer live in Ho Chi Minh City`,
  },
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting; 
              // defaults to 'language-' (eg <pre class="language-js">). 
              // If your site loads Prism into the browser at runtime, 
              // (eg for use with libraries like react-live), 
              // you may use this to prevent Prism from re-processing syntax. 
              // This is an uncommon use-case though; 
              // If you're unsure, it's best to use the default value. 
              classPrefix: 'language-',
            },
          },
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',    
  ],
}

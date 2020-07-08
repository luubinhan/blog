import plugin_gridsome_plugin_flexsearch_6 from "D:\\project\\blog\\gridsome-starter-master\\node_modules\\gridsome-plugin-flexsearch\\gridsome.client.js"
import plugin_gridsome_plugin_google_analytics_8 from "D:\\project\\blog\\gridsome-starter-master\\node_modules\\@gridsome\\plugin-google-analytics\\gridsome.client.js"

export default [
  {
    run: plugin_gridsome_plugin_flexsearch_6,
    options: {"pathPrefix":"","siteUrl":"#","collections":[{"typeName":"Post","indexName":"Post","fields":["title","description"]}],"searchFields":["title"],"chunk":false,"autoFetch":true,"autoSetup":true,"flexsearch":{"profile":"default"}}
  },
  {
    run: plugin_gridsome_plugin_google_analytics_8,
    options: {"id":"UA-XXXXXXXXXXX"}
  }
]

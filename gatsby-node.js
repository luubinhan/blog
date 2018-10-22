const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");
const createPaginatedPages = require("gatsby-paginate");

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      //slug = `/${_.kebabCase(node.frontmatter.title)}`;
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.jsx");
    const tagTemplate = path.resolve(`src/templates/tag.jsx`);
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
              edges {
                node {
                  frontmatter {
                    title
                    desc
                    type
                    category
                    tags
                    date
                    cover
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const tagSet = new Set();
        const postsTag = {};
        const allPosts = result.data.allMarkdownRemark.edges;
        
        // Create Single Post
        allPosts.forEach((edge, index) => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
              if (!postsTag[tag]) {
                postsTag[tag] = [];
              }
              postsTag[tag].push(edge.node);
            });
          }          
          const prev = index === 0 ? false : allPosts[index - 1].node;
          const next = index === allPosts.length - 1 ? false : allPosts[index + 1].node;
          createPage({
            path: edge.node.fields.slug,
            component: postPage,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next
            }
          });
        });
        Object.keys(postsTag)
          .forEach(tagName => {
            const post = postsTag[tagName];
            createPage({
              path: `/tags/${_.kebabCase(tagName)}`,
              component: tagTemplate,
              context: {
                post,
                tag: tagName
              }
            })
          });
          // Create Home page
          createPaginatedPages({
            edges: result.data.allMarkdownRemark.edges,
            createPage: createPage,
            pageTemplate: "src/templates/index.js",
            pageLength: 30, // This is optional and defaults to 10 if not used
            pathPrefix: "", // This is optional and defaults to an empty string if not used
            context: {} // This is optional and defaults to an empty object if not used
          });
        })
    );
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
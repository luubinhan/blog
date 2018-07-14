const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

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
    const lessonPage = path.resolve("src/templates/category.jsx");
    const categoryPage = path.resolve("src/templates/category.jsx");
    const tagTemplate = path.resolve(`src/templates/tag.jsx`);
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    title
                    desc
                    type
                    category
                    tags
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
        const categorySet = new Set();

        const postsTag = {};

        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
              if (!postsTag[tag]) {
                postsTag[tag] = [];
              }
              postsTag[tag].push(edge.node);
            });
          }

          if (edge.node.frontmatter.category) {
            categorySet.add(edge.node.frontmatter.category);
          }
          if (edge.node.frontmatter.type === "post") {
            createPage({
              path: edge.node.fields.slug,
              component: postPage,
              context: {
                slug: edge.node.fields.slug
              }
            });
          } else {
            createPage({
              path: edge.node.fields.slug,
              component: lessonPage,
              context: {
                slug: edge.node.fields.slug
              }
            });
          }
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
        /* const tagList = Array.from(tagSet);
        tagList.forEach(category => {
          createPage({
            path: `/tags/${_.kebabCase(category)}/`,
            component: tagTemplate,
            context: {
              category
            }
          });
        }); */

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          });
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

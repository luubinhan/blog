---
slug: "/2019-03-31-huong-dan-7-thu-thuat-trong-gatsby"
date: "2019-03-31"
title: "7 thủ thuật trong gatsby"
desc: "Tập hợp những thủ thuật khi làm việc với gatsby"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["gatsby"]
---

<!-- TOC -->

- [Lấy Ngày build gần nhất](#l%E1%BA%A5y-ng%C3%A0y-build-g%E1%BA%A7n-nh%E1%BA%A5t)
- [Ngày chỉnh sửa gần nhất](#ng%C3%A0y-ch%E1%BB%89nh-s%E1%BB%ADa-g%E1%BA%A7n-nh%E1%BA%A5t)
- [Cùng source, khác Queries](#c%C3%B9ng-source-kh%C3%A1c-queries)
- [Previous/Next](#previousnext)
- [Bài viết ngẫu nhiên](#b%C3%A0i-vi%E1%BA%BFt-ng%E1%BA%ABu-nhi%C3%AAn)
- [Mặc định mở trình duyệt](#m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-m%E1%BB%9F-tr%C3%ACnh-duy%E1%BB%87t)
- [Sử dụng dotenv](#s%E1%BB%AD-d%E1%BB%A5ng-dotenv)

<!-- /TOC -->


## Lấy Ngày build gần nhất

```js
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const IndexPage = () => {
  const data = useStaticQuery(query)

  return (
    <>
      <p>This site was last built on:</p>
      <p>{data.site.buildTime}</p>
    </>
  )
}

export default IndexPage

const query = graphql`
  query Info {
    site {
      buildTime(formatString: "DD/MM/YYYY")
    }
  }
`
```

## Ngày chỉnh sửa gần nhất


```js
query YourQuery {
  allMdx {
    edges {
      node {
        parent {
          ... on File {
            modifiedTime(formatString: "MM/DD/YYYY")
          }
        }
      }
    }
  }
}
```

## Cùng source, khác Queries

Khi chúng ta định nghĩa 2 ( hoặc nhiều hơn) giá trị trong `gatsby-source-filesystem`

```js
// file gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `logos`,
        path: `${__dirname}/src/logos`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
```

Chúng ta có thể filter trong câu GraphQL chỉ lấy 1 trong 2 source đó

```js
// file src/pages/index.js
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const IndexPage = () => {
  const data = useStaticQuery(query)

  return (
    <>
      <p>First image (logo):</p>
      <Img
        style={{ width: '200px', marginBottom: '2rem' }}
        fluid={data.logo.childImageSharp.fluid}
      />
      <p>Assets images (two):</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.assets.edges.map(img => (
          <Img
            style={{ width: '200px', marginBottom: '2rem' }}
            fluid={img.node.childImageSharp.fluid}
          />
        ))}
      </div>
    </>
  )
}

export default IndexPage

const query = graphql`
  query Images {
    logo: file(sourceInstanceName: { eq: "logos" }) {
      childImageSharp {
        fluid(maxWidth: 200, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    assets: allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
```

## Previous/Next

Để show bài viết trước và sau bài viết hiện tại

```js
// file gatsby-node.js
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const bookTemplate = require.resolve('./src/templates/book.js')

  const result = await wrapper(
    graphql(`
      {
        allBooksYaml(sort: { fields: [title], order: ASC }) {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `)
  )

  const books = result.data.allBooksYaml.edges

  books.forEach((edge, index) => {
    // đặt biến prev/next cho tất cả node
    // để có truy cập slug & title ở bất kỳ đâu

    const prev = index === 0 ? null : books[index - 1].node
    const next = index === books.length - 1 ? null : books[index + 1].node

    createPage({
      path: edge.node.slug,
      component: bookTemplate,
      context: {
        slug: edge.node.slug,
        prev,
        next,
      },
    })
  })
}
```

```js
// file src/templates/books
import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

class BookTemplate extends React.Component {
  render() {
    const { booksYaml } = this.props.data
    // prev & next được truyền từ gatsby-node.js
    const { prev, next } = this.props.pageContext
    return (
      <Layout location={this.props.location}>
        <h2>{booksYaml.title}</h2>
        <div>
          {prev && (
            <div>
              <span>Previous</span>
              <Link to={prev.slug}>{prev.title}</Link>
            </div>
          )}
          {next && (
            <div>
              <span>Next</span>
              <Link to={next.slug}>{next.title}</Link>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

export default BookTemplate

export const pageQuery = graphql`
  query BookBySlug($slug: String!) {
    booksYaml(slug: { eq: $slug }) {
      title
      content
    }
  }
`
```

## Bài viết ngẫu nhiên

```js
// gatsby-node.js

const _ = require('lodash')

const prevNext = (list, item) => {
  // lấy danh sách bài post (không bao gồm bài post hiện tại)
  const filterUnique = _.filter(
    list,
    input => input.node.slug !== item.node.slug
  )
  const sample = _.sampleSize(filterUnique, 2)

  return {
    left: sample[0].node,
    right: sample[1].node,
  }
}

const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const bookTemplate = require.resolve('./src/templates/book.js')

  const result = await wrapper(
    graphql(`
      {
        allBooksYaml {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `)
  )

  const books = result.data.allBooksYaml.edges

  books.forEach(edge => {
    const { left, right } = prevNext(books, edge)

    createPage({
      path: edge.node.slug,
      component: bookTemplate,
      context: {
        slug: edge.node.slug,
        left,
        right,
      },
    })
  })
}
```

## Mặc định mở trình duyệt

```json
"scripts": {
  "dev": "gatsby develop -o"
}
```

## Sử dụng dotenv

Mặc định thì chúng ta có thể sử dụng biến môi trường khi cài Gatsby, do đó chỉ việc import `dotenv` trong file `gatsby-config.js` là có thể sử dụng.


```js
// gatsby-config.js
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

<a target="_blank" rel="noopener noreferrer" href="https://www.lekoarts.de/en/blog/tips-and-tricks-for-gatsby">Tips & Tricks for Gatsby
</a>

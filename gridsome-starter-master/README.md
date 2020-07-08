# Simple blog using Gridsome and Buefy

## Features included

## Demo

https://vuefy-gridsome-blog.netlify.com/

## Install

### Gridsome CLI:

`npm install --global @gridsome/cli`

### Use this project as your starter:

1. `gridsome create my-site https://github.com/wavrin/buefy-gridsome-blog.git`
2. `cd my-site`
3. `gridsome develop`

dev: http://localhost:8080

## Customize

### Google Analytics

In the `gridsome.config.js` file, add your own Google Analytics id:

```
  {
    use: "@gridsome/plugin-google-analytics",
    options: {
      id: "UA-XXXXXXXXXXX"
    }
```

### Disqus (for comments)

In the `Post.vue` template, add your own [Disqus](https://disqus.com/) shortname:

```
  <div class="post-comments">
    <vue-disqus shortname="yourshortname" :identifier="$page.post.title"></vue-disqus>
  </div>
```

### Font

The site is using a Google Font and is imported here: `/src/assets/style/_typography.scss`

`@import url("https://fonts.googleapis.com/css?family=Lato:400, 600");`

You can find a new font [here](https://fonts.google.com/) and update that file.

### Icons

The `AuthorCard.vue` component uses icons from [Font Awesome](https://fontawesome.com/icons).

Example:

```
  <a class="icon" href="#">
    <i class="fab fa-twitter fa-2x"></i>
  </a>
```

## Deploy

Great options for hosting include [Netlify](https://www.netlify.com/) and [AWS Amplify](https://aws.amazon.com/amplify/).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wavrin/buefy-gridsome-blog)

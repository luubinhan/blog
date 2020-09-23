<template>
  <Layout :show-logo="false">
    
    <h1 style="display: none">
      Frontend Developer live in Ho Chi Minh City, a photography geek, and a music lover - 
      Nơi mình chia sẽ kiến thức frontend, css, html, javascript, các framework như React, Vuejs
    </h1>

    <!-- List posts -->
    <div class="posts-list">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
      <Pager :info="$page.posts.pageInfo" />
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  posts: allPost(perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "YYYY-MM-DD")
        timeToRead
        desc
        cover_image
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";
import Pager from "~/components/Pager";

export default {
  components: {
    Author,
    PostCard,
    Pager,
  },
  metaInfo: {
    title: "Frontend Developer live in Ho Chi Minh City, a photography geek, and a music lover",
    description: "Nơi mình chia sẽ kiến thức frontend, css, html, javascript, các framework như React, Vuejs"
  },
};
</script>

<template>
  <Layout>
    <div id="scrollTop"></div>
    <h1 style="display: none">
      Frontend Developer live in Ho Chi Minh City, a photography geek, and a
      music lover - Nơi mình chia sẽ kiến thức frontend, css, html, javascript,
      các framework như React, Vuejs
    </h1>
    <div class="padding">
      <!-- List posts -->
      <div class="posts-list">
        <PostCard
          v-for="edge in $page.posts.edges"
          :key="edge.node.id"
          :post="edge.node"
        />
        <Pager :info="$page.posts.pageInfo" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  posts: allPost(perPage: 10, page: $page, filter: { hide: { ne: true } }) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        slug
        date (format: "YYYY-MM-DD")
        timeToRead
        desc
        cover_image
        path
        hide
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
  updated: function() {
		// location.href = '#scrollTop';
	},
  metaInfo: {
    title:
      "Frontend Developer live in Ho Chi Minh City, a photography geek, and a music lover",
    description:
      "Nơi mình chia sẽ kiến thức frontend, css, html, javascript, các framework như React, Vuejs",
  },
};
</script>


<style lang="scss" scoped>
.padding {
  padding: 15px 75px 0;
}
</style>
<template>
  <Layout>
    <h1 class="tag-title text-center space-bottom"># {{ $page.tag.title }}</h1>

    <div class="posts-list">
      <PostCard v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node" />
    </div>
    <Author />
  </Layout>
</template>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            id
            title
            path
            date (format: "YYYY-MM-DD")
            timeToRead
            desc
            content
            cover_image
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    Author,
    PostCard,
  },
  metaInfo: {
    title:
      "Frontend Developer live in Ho Chi Minh City, a photography geek, and a music lover",
  },
};
</script>

<style lang="scss">
</style>


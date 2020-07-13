<template>
  <Layout>
    <SearchBox />
    <PostCard
      v-for="edge in $page.posts.edges"
      :key="edge.node.id"
      :post="edge.node"
    />
  </Layout>
</template>

<page-query>
query {
  posts: allPost {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        desc
        path
      }
    }
  }
}
</page-query>

<script>
import PostCard from '~/components/PostCard.vue';
import SearchBox from '~/components/SearchBox.vue';

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    PostCard,
    SearchBox,
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

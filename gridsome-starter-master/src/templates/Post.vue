<template>
  <section class="section">
    <div class="container">
      <div class="columns is-desktop">
        <div class="column is-one-quarter is-narrow">
          <AuthorCard />
        </div>
        <div class="column">
          <a class="icon" href="/">
            <i class="fa fa-arrow-left fa-2x"></i>
          </a>
          <h1 class="title">{{ $page.post.title }}</h1>
          <em>{{ $page.post.date }}</em>
          <div class="content" v-html="$page.post.content" />

          <div class="post-comments">
            <vue-disqus shortname="DISQUSSHORTNAME" :identifier="$page.post.title"></vue-disqus>
          </div>
        </div>
      </div>
    </div>
    <br />
    <Disqus />
    <Footer />
  </section>
</template>

<script>
import { Disqus } from 'vue-disqus'
import AuthorCard from "~/components/AuthorCard.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    AuthorCard,
    Footer,
    Disqus
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.description
        }
      ]
    };
  }
};
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "MMMM D, YYYY")
    description
    content
  }
}
</page-query>

<style></style>

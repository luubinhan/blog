<template>
  <section class="section">
    <AuthorCard />
    <slot />
    <Footer />
  </section>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import AuthorCard from '~/components/AuthorCard.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    AuthorCard,
    Footer
  }
};
</script>

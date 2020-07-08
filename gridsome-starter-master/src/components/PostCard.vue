<template>
  <div>
    <g-link :to="post.path">
      <h2 class="title" v-html="post.title"></h2>
    </g-link>
    <p v-html="post.description" />
    <br /><br />
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style></style>

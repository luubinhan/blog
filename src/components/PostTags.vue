<template>
  <div class="post-tags">
    <g-link class="post-tags__link" v-for="tag in post.tags" :key="tag.id" :to="tag.path">
      <span>#</span>
      {{ tag.title }}
    </g-link>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="scss">
.post-tags {
  margin: 1em 0 0;

  &__link {
    margin-right: 0.7em;
    font-size: 0.8em;
    color: currentColor;
    text-decoration: none;
    background-color: var(--bg-tag);
    color: currentColor !important; //Todo: remove important;
    padding: 0.5em;
    border-radius: var(--radius);
    display: inline-block;
    white-space: nowrap;
    margin-bottom: 0.7em;
  }
}
</style>
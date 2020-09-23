<template>
  <div class="post-meta">
    Đăng ngày
    <time
      :dateTime="post.date"
      itemprop="dateModified"
      :content="post.date"
    >{{ post.date }}</time>.
    <template v-if="post.timeToRead">
      Mất khoảng
      <strong>{{ post.timeToRead }} phút</strong> để đọc.
    </template>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="scss">
.post-meta {
  font-size: 0.8em;
  opacity: 0.8;
}
</style>

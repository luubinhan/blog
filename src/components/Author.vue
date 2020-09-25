<template>
  <div class="author">
    <a href="https://luubinhan.github.io/" target="_blank">
      <g-image
        alt="Author image"
        class="author__image"
        src="~/assets/images/author.jpg"
        width="180"
        height="180"
        blur="5"
      />
    </a>
    <h2 class="author__site-title">{{ $static.metadata.siteName }}</h2>

    <p
      class="author__intro"
    >Nếu đọc bài viết thấy hay, bạn xài bớt cái bọc ni lông, ra chợ mua dùm cô bác cái bánh cam, bánh ít là đã cảm ơn mình</p>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  props: ["showTitle"],
};
</script>

<style lang="scss">
.author {
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
  padding: calc(var(--space) / 2) 0;

  &__image {
    border-radius: 100%;
    width: 90px;
    height: 90px;
    margin-bottom: 1em;
  }

  &__intro {
    opacity: 0.8;
  }

  &__site-title {
    font-size: 1.5em;
  }
}
</style>

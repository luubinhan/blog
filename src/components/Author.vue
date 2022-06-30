<template>
  <div class="author">
    <a href="https://luubinhan.github.io/" target="_blank">
      <g-image alt="Author image" class="author__image" src="~/assets/images/author.jpg" width="180" height="180"
        blur="5" />
    </a>
    <h2 class="author__site-title">{{ $static.metadata.siteName }}</h2>

    <p class="author__intro">
      Đời cho ta quá nhiều thứ, ta chưa cho đời được nhiều
    </p>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

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
    margin-bottom: 10px;
  }
}
</style>

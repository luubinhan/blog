<template>
  <div
    class="mystyle-item-post"
    :class="{ 'post-card--has-poster': post.poster }"
  >
    <article
      class="item-post clearfix"
      itemType="http://schema.org/NewsArticle"
    >
      <div class="post-card__header">
        <figure
          class="the-post-thumbnail"
          v-if="post.cover_image"
          aria-label="media"
          role="group"
          itemProp="associatedMedia"
          :itemID="post.cover_image"
          itemType="http://schema.org/ImageObject"
        >
          <g-link :to="post.path">
            <g-image
              alt="Cover image"
              itemProp="thumbnailUrl"
              :src="post.cover_image"
            />
          </g-link>
        </figure>
      </div>
      <section class="the-post-content">
        <header class="heading-post" itemProp="headline">
          <g-link :to="post.path"><span v-html="post.title"></span></g-link>
        </header>
        <footer class="post-excert" itemProp="description" v-html="post.desc" />

        <PostMeta class="post-card__meta" :post="post" />
        <PostTags class="post-card__tags" :post="post" />
      </section>
    </article>
  </div>
</template>

<script>
import PostMeta from '~/components/PostMeta';
import PostTags from '~/components/PostTags';

export default {
  components: {
    PostMeta,
    PostTags
  },
  props: ['post']
};
</script>

<style lang="scss">
$innerGlutter: 40px;
.item-post {
  padding: 35px 0;
  border-bottom: 1px solid $border-color;
  .heading-post {
    padding-bottom: 20px;
    font-size: 30px;
    line-height: 1.2em;
    color: rgba(0, 0, 0, 0.9);
    font-family: 'avo_bold', $serif;
    a:hover,
    a:focus {
      text-decoration: none;
      color: $primary-color;
    }
  }
  .the-post-thumbnail {
    margin-bottom: 20px;
  }
  .the-post-thumbnail + .the-post-content {
    overflow: hidden;
  }
  .post-excert {
    font-size: 21px;
    padding-bottom: 20px;
  }
}
@media (max-width: $breakpoint-xs) {
  .item-post {
    margin-bottom: 15px;
    padding-bottom: 15px;
    padding-top: 0;
    .post-excert {
      display: none;
    }
    .heading-post {
      font-size: 18px;
    }
  }
}
</style>

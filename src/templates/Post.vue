<template>
  <Layout>
    <div id="scrollTop"></div>
    <div class="scrolling-indicator">
      <div class="single-post">
        <div class="single-post-container">
          <article>
            <header>
              <div class="post-title">
                <h1 class="post-title__text single-post-title">
                  {{ $page.post.title }}
                </h1>
                <PostMeta :post="$page.post" />
                <a
                  :href="$page.post.slug | editLink"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Connect Facebook"
                  class="link"
                >
                  Sửa bài viết này
                </a>
              </div>
            </header>

            <div class="post content-box">
              <div class="post__header">
                <g-image
                  alt="Cover image"
                  v-if="$page.post.cover_image"
                  :src="$page.post.cover_image"
                />
              </div>
              <div class="blog-post">
                <div class="post-content" v-html="$page.post.content" />
              </div>
              <div class="post__footer">
                <PostTags :post="$page.post" />
              </div>
              <div class="single-post__share">
                <ShareNetwork
                  v-for="network in networks"
                  :network="network.network"
                  :key="network.network"
                  :style="{ backgroundColor: network.color }"
                  :url="`https://luubinhan.github.io/blog${$page.post.path}`"
                  :title="$page.post.title"
                  :description="$page.post.desc"
                  hashtags="frontend,developer,javascript,wordpress,react,hochiminh,web-developer"
                >
                  <i :class="network.icon"></i>
                  <span>{{ network.name }}</span>
                </ShareNetwork>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <template slot="below-master">
      <div class="section-below-post">
        <div class="post-comments">
          <div id="emojicom-widget-inline"></div>
          <div hidden class="doan-gioi-thieu">Mọi người thấy bài viết này có được ổn không, có chổ nào cần bổ sung không ?</div>
          <Vssue :title="$page.post.title" />
          <Disqus shortname="luckyluu-blog" />
        </div>
        <RelatedPosts :posts="$page.post.related" />
        <Author class="post-author" />
      </div>
    </template>
  </Layout>
</template>

<script>
import { Disqus } from "vue-disqus";
import { ShareNetwork } from "vue-social-sharing";
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";
import Author from "~/components/Author.vue";
import RelatedPosts from "~/components/RelatedPosts";

export default {
  data() {
    return {
      isMounted: false,
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "mst-icon icon-mail",
          color: "#333333",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "mst-icon icon-facebook",
          color: "#1877f2",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "mst-icon icon-linkedin",
          color: "#007bb5",
        },
        {
          network: "pocket",
          name: "Pocket",
          icon: "mst-icon icon-get-pocket",
          color: "#ef4056",
        },
        {
          network: "skype",
          name: "Skype",
          icon: "mst-icon icon-skype",
          color: "#00aff0",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "mst-icon icon-twitter",
          color: "#1da1f2",
        },
      ],
    };
  },
  mounted: function () {
    this.isMounted = true;
  },
  updated: function () {
    // location.href = '#scrollTop';
  },
  components: {
    Author,
    PostMeta,
    PostTags,
    ShareNetwork,
    Disqus,
    RelatedPosts,
  },
  filters: {
    editLink: (link) => {
      return `https://github.com/luubinhan/blog/edit/master/content/posts/${link}.md`;
    },
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.desc,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:title",
          content: this.$page.post.title,
        },
        {
          property: "og:description",
          cotent: this.$page.post.desc,
        },
        {
          property: "og:image",
          content: this.$page.post.cover_image || "",
        },
        {
          property: "image",
          content: this.$page.post.cover_image || "",
        },
        {
          name: "twitter:card",
          content: this.$page.post.cover_image
            ? "summary_large_image"
            : "summary",
        },
        {
          name: "twitter:creator",
          content: "@luubinhan",
        },
        {
          name: "fb:app_id",
          content: "445556375516928",
        },
      ],
    };
  },
};
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    slug
    date (format: "YYYY-MM-DD")
    timeToRead
    tags {
      id
      title
      path
    }
    desc
    content
    cover_image
    related {
      id
      path
      title
      desc
    }
  }
}
</page-query>

<style lang="scss">
.doan-gioi-thieu {
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
  color: var(--code-color);
}

.single-post {
  &__share {
    padding-top: 30px;
    a {
      cursor: pointer;
      margin-right: 6px;
      margin-bottom: 7px;
      display: inline-block;
      color: white;
      padding: 2px 10px 2px 4px;
      border-radius: 15px;
      white-space: nowrap;
      span {
        padding-left: 4px;
      }
    }
  }
}

.post-comments {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

a.link {
  color: var(--primary-color);
  text-decoration: underline;
}
.post-content {
  > ul:first-child {
    background: var(--bg-gray);
    margin: 0;
    padding: 15px;
    counter-reset: my-counter;
    list-style-type: none;
    &:before {
      content: "Nội dung";
      display: block;
      background: var(--bg-toc);
      margin-left: -20px;
      margin-right: -15px;
      margin-top: -15px;
      margin-bottom: 30px;
      padding: 5px 30px;
      font-weight: bold;
    }
    p {
      margin-top: 0;
    }
    > li {
      counter-increment: my-counter;
      position: relative;
      padding-left: 1.4em;
      &:before {
        content: counters(my-counter, ".") ".";
        font-weight: 700;
        text-transform: uppercase;
        position: absolute;
        left: 0;
        top: 0;
      }
      ul {
        margin-bottom: 5px;
        margin-left: 0;
        margin-top: 10px;
        counter-reset: my-counter;
        list-style-type: none;
        padding-left: 0;
        li {
          counter-increment: my-counter;
          position: relative;
          padding-left: 1.7em;
          &:before {
            color: var(--muted);
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            content: counters(my-counter, ".") ".";
          }
        }
      }
      a {
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
  img {
    background-color: #fff;
  }
}
.single-post-container {
  padding-top: 60px;
  position: relative;
  .post-title {
    text-align: center;
    margin-bottom: 30px;
  }
  .single-post-title {
    letter-spacing: -0.02em;
    font-weight: 700;
    font-style: normal;
    font-size: 2.6rem;
    line-height: 1.2;
    letter-spacing: -0.028em;
    text-align: center;
    color: var(--heading-post);
    margin: 0 30px 0;
    padding-bottom: 30px;

    @include mobile {
      font-size: 1.6rem;
      margin-left: 0;
      margin-right: 0;
    }
  }
  .post-excert {
    font-size: 1.2rem;
    line-height: 1.42;
    font-family: $san-serif;
    text-align: center;
  }
  h2 {
    code {
      font-size: inherit;
      border-radius: 0;
      font-size: 0.7em;
      line-height: 0.7;
      border: none;
      padding: 0 4px;
      color: #fff;
      background: #252525;
      font-family: $monospace;
      font-weight: normal;
      transform: rotate(-5deg) skew(-5deg);
      -webkit-transform: rotate(-5deg) skew(-5deg);
      -moz-transform: rotate(-5deg) skew(-5deg);
      position: relative;
      &:after {
        position: absolute;
        left: 0.0875em;
        top: 0.0875em;
        content: "";
        display: block;
        width: 100%;
        height: 100%;

        z-index: -1;

        background: repeating-linear-gradient(
          -55deg,
          #fff,
          #fff 1px,
          rgba(0, 0, 0, 0.2) 2px,
          rgba(0, 0, 0, 0.2) 3px
        );
        background-size: 100% 100%;
      }
    }
  }
  .social-media-bar {
    position: absolute;
    top: 100px;
    right: -135px;

    .share-social-component {
      text-align: center;
      border: none;
      padding: 0;
      margin: 0;
      .ssc-label {
        font-family: $monospace;
        float: none;
        padding: 0;
        margin-bottom: 7px;
        text-transform: uppercase;
        color: #fff;
      }
      .s-link {
        display: block;
        margin-bottom: 10px;
        border-radius: 9999em;
        width: 30px;
        padding: 0;
        text-align: center;
        font-size: 17px;
        line-height: 30px;
        height: 30px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #fff;
        background: transparent;
      }
      .s-name {
        display: none;
      }
    }
  }
  .blog-post {
    padding-top: 50px;
    position: relative;
    @include mobile {
      padding-top: 20px;
    }
    &:before {
      content: "...";
      display: inline-block;
      color: var(--dotted);
      position: relative;
      top: -30px;
      left: 46%;
      --x-height-multiplier: 0.363;
      --baseline-multiplier: 0.157;
      font-weight: 400;
      font-size: 28px;
      letter-spacing: 0.6em;
      @include mobile {
        display: none;
      }
    }
    table {
      border-collapse: collapse;
      margin-top: 18px;
      margin-bottom: 18px;
      tbody tr:nth-of-type(odd) {
        background: rgba(0, 0, 0, 0.02);
      }
      td,
      th {
        text-align: left !important;
        border-bottom: 1px solid var(--border-color);
        border-top: 1px solid var(--border-color);
        padding-bottom: 15px;
        padding-top: 15px;
        padding-right: 15px;
        margin: 0;
        border-collapse: inherit;
        border-spacing: 0;
      }
      th {
        font-size: 0.9rem;
      }
    }
  }
  .tag-list {
    margin-top: 20px;
    margin-bottom: 25px;
    li {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .post-content {
    --x-height-multiplier: 0.35;
    --baseline-multiplier: 0.179;
    letter-spacing: 0.01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    counter-reset: heading2;
    counter-reset: heading3;

    em {
      font-style: italic;
    }
    .note {
      padding: 20px;
      background: #fff9c4;
      border-left: 2px solid #ffeb8e;
      padding: 20px;
      margin: 20px 0;
      code {
        border: none;
        border-bottom: 2px solid rgba(236, 198, 48, 0.3);
        background: rgba(236, 198, 48, 0.4);
        color: #000;
        vertical-align: top;
        font-size: 1.1em;
      }
    }
    p code.language-text {
      background: var(--language-text);
      line-height: inherit;
      padding: 5px 7px 0;
      white-space: pre-wrap;
      border-top: none;
      border-left: none;
      border-right: none;
      color: var(--primary-text-color);
      font-family: $serif;
      border-bottom: 2px solid rgba(236, 198, 48, 0.3);
      font-style: normal;
      border-radius: 4px;
    }
    h2 {
      position: relative;
      padding-left: 50px;
      scroll-margin: 1rem;
      counter-increment: heading2;

      &::before {
        display: block;
        position: absolute;
        left: 0;
        content: counter(heading2) ". ";
      }
    }
    h3 {
      padding-top: 60px;
      position: relative;
      padding-left: 45px;
      counter-increment: heading3;

      &::before {
        display: block;
        position: absolute;
        left: 0;
        content: counter(heading2) "." counter(heading3) ". ";
      }
    }
    h1,
    h2 {
      margin-top: 56px;
      --x-height-multiplier: 0.363;
      --baseline-multiplier: 0.157;
      font-weight: 700;
      font-style: normal;
      font-size: 32px;
      margin-left: -2px;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }
    h2 {
      margin-bottom: 20px;
    }
    h3 {
      font-size: 1.3rem;
    }
    h4 {
      font-size: 1.2rem;
    }
    p {
      margin-bottom: 0;
      margin-top: 29px;
    }
    ul {
      margin-top: 30px;
      padding-left: 20px;
      li {
        padding-bottom: 10px;
      }
    }
    pre a {
      color: #ff9800;
    }
    a {
      color: var(--link-color);
      display: inline-block;
      position: relative;
      &:before {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: var(--muted);
        position: absolute;
        bottom: 2px;
      }
      &:after {
        position: absolute;
        content: "";
        display: block;
        height: 1px;
        width: 0;
        background: var(--primary-color);
        bottom: 2px;
        transition: all 0.3s ease-in-out;
      }
      &:hover {
        text-decoration: none;
        &:after {
          width: 100%;
        }
      }
    }
  }
  blockquote {
    padding: 20px;
    background: #fff9c4;
    border-left: 2px solid #ffeb8e;
    font-weight: 400;
    padding: 20px;
    margin: 20px 0;
    p {
      font-size: 1.5rem;
      line-height: 1.2;
      margin-top: 0 !important;
      color: #000;
    }
  }

  img[src$="png"] {
    background-color: #fff;
  }
}
@media (max-width: 980px) {
  .single-post-container {
    .social-media-bar {
      position: relative;
      right: auto;
      top: auto;
      padding-top: 35px;
      .share-social-component {
        .ssc-label {
          text-align: center;
        }
        .ssc-buttons {
          display: -webkit-flex;
          display: -moz-flex;
          display: -ms-flex;
          display: -o-flex;
          display: flex;
          justify-content: center;
          width: 100%;
          .social-link-container {
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flex;
            display: -o-flex;
            display: flex;
            width: 150px;
          }
        }
      }
    }
  }
}

@include mobile {
  .single-post-container {
    padding-top: 30px;
    .post-content {
      font-size: 1rem;
      h2 {
        font-size: 1.3rem;
        margin-top: 1rem;
      }
      p {
        font-size: 1rem;
      }
      ul {
        margin-top: 15px;
        padding-left: 10px;
        li {
          padding-bottom: 0;
        }
      }
    }
    .post-excert {
      font-size: 1rem;
    }
    blockquote {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }
}
</style>

<style lang="scss" scoped>
.scrolling-indicator {
	background-image: linear-gradient(to right top, #27c5c3 50%, #fff 50%);
	background-repeat: no-repeat;
	z-index: 1;
	position: relative;
	padding: 15px 75px 0;

	&::after {
		content: "";
		position: fixed;
		top: 5px;
		left: 0;
		bottom: 0;
		right: 0;
		background: #fff;
		z-index: -1;
	}
}

.section-below-post {
  background: var(--bg-gray);
  padding-top: 30px;
  padding-bottom: 40px;
  margin-top: 30px;
  position: relative;
  z-index: 6;
  background: #fff;

  @include tablet {
    margin-left: 0px;
    padding-left: 30px;
    padding-right: 30px;
    margin-right: 0px;
  }
}

</style>
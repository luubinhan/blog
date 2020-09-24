<template>
  <Layout>
    <div class="single-post">
      <div class="single-post-container">
        <article>
          <header>
            <div class="post-title">
              <h1 class="post-title__text single-post-title">{{ $page.post.title }}</h1>

              <PostMeta :post="$page.post" />
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
                :style="{backgroundColor: network.color}"
                :url="$page.post.path"
                :title="$page.post.title"
                :description="$page.post.desc"
                hashtags="frontend,developer,javascript,wordpress,react,hochiminh,web-developer"
              >
                <i :class="network.icon"></i>
                <span>{{ network.name }}</span>
              </ShareNetwork>
            </div>
          </div>

          <div class="post-comments">
            <div
              class="fb-comments"
              :data-href="`https://vuilaptrinh.com${$page.post.path}`"
              data-numposts="10"
              data-width="100%"
            ></div>
            <fb-comment :url="`https://vuilaptrinh.com${$page.post.path}`" />
            <Disqus shortname="luckyluu-blog" />
          </div>

          <Author class="post-author" />
        </article>
      </div>
    </div>
  </Layout>
</template>

<script>
import { Disqus } from "vue-disqus";
import { ShareNetwork } from "vue-social-sharing";
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";
import Author from "~/components/Author.vue";

export default {
  data() {
    return {
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
  components: {
    Author,
    PostMeta,
    PostTags,
    ShareNetwork,
    Disqus,
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "desc",
          content: this.$page.post.desc,
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
  }
}
</page-query>

<style lang="scss">
.single-post {
  &__share {
    padding-top: 30px;
    a {
      cursor: pointer;
      margin-right: 10px;
      color: white;
      padding: 2px 10px 2px 4px;
      border-radius: 15px;
      span {
        padding-left: 4px;
      }
    }
  }
  .post-comments {
    padding-top: 20px;
  }
}
.post-content {
  > ul:first-child {
    background: $bg-gray;
    margin: 0;
    padding: 15px;
    counter-reset: my-counter;
    list-style-type: none;
    &:before {
      content: "Nội dung";
      display: block;
      background: rgba(0, 0, 0, 0.2);
      margin-left: -15px;
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
            color: $muted;
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
}
.single-post-container {
  padding-bottom: 80px;
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
    color: #000;
    margin: 0 30px 0;
    padding-bottom: 30px;
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
    &:before {
      content: "...";
      display: inline-block;
      color: rgba(0, 0, 0, 0.6);
      position: relative;
      top: -30px;
      left: 46%;
      --x-height-multiplier: 0.363;
      --baseline-multiplier: 0.157;
      font-weight: 400;
      font-size: 28px;
      letter-spacing: 0.6em;
    }
    table {
      border-collapse: collapse;
      tbody tr:nth-of-type(odd) {
        background: rgba(0, 0, 0, 0.02);
      }
      td,
      th {
        text-align: left !important;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
        padding-bottom: 15px;
        padding-top: 15px;
        padding-right: 15px;
        margin: 0;
        border-collapse: inherit;
        border-spacing: 0;
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
      background: rgba(236, 198, 48, 0.1);
      line-height: inherit;
      padding: 5px 7px 0;
      white-space: pre-wrap;
      border-top: none;
      border-left: none;
      border-right: none;
      color: $primary-text-color;
      font-family: $serif;
      border-bottom: 2px solid rgba(236, 198, 48, 0.3);
      font-style: normal;
      border-radius: 4px;
    }
    h2,
    h1 {
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
      color: #fff;
    }
    a {
      color: #000;
      display: inline-block;
      position: relative;
      &:before {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: $muted;
        position: absolute;
        bottom: 2px;
      }
      &:after {
        position: absolute;
        content: "";
        display: block;
        height: 1px;
        width: 0;
        background: $primary-color;
        bottom: 2px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
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
    padding: 20px;
    margin: 20px 0;
    p {
      font-size: 1.5rem;
      line-height: 1.2;
      margin-top: 0 !important;
    }
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

@media (max-width: $breakpoint-sm) {
  .single-post-container {
    blockquote {
      max-width: none;
    }
  }
}
@media (max-width: $breakpoint-xs) {
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
    .blog-post {
      padding-top: 20px;
      &:before {
        display: none;
      }
    }
    .single-post-title {
      font-size: 1.6rem;
      margin-left: 0;
      margin-right: 0;
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

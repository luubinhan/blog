<template>
  <div id="app" class="layout-blog">
    <PrimaryNav />
    <div class="master">
      <main class="inner">
        <slot />
      </main>
    </div>
    <div class="layout-blog__aside">
      <div class="layout-blog__aside-inner">
        <Search />
        <div class="layout-blog__aside-footer">
          <slot name="aside" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";
import PrimaryNav from "~/components/PrimaryNav.vue";
import Search from "~/components/Search";

export default {
  props: {
    showLogo: { default: true },
  },
  components: {
    Logo,
    ToggleTheme,
    PrimaryNav,
    Search,
  },
};
</script>

<style lang="scss">
.layout-blog {
  position: relative;
  display: flex;
  .go-home {
    display: block;
    width: 50px;
    padding-bottom: 20px;
    color: #fff;
    font-family: "avo_bold", $san-serif;
    font-size: 1.1rem;
  }
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  .master {
    @include scroll;
    flex-basis: $masterWidth;
    min-width: $masterWidth;
    margin-left: $sidebarWidth;
    background: #fff;
    z-index: 2;
    position: relative;
    max-height: 100vh;
    overflow-y: auto;
    @media (max-width: $breakpoint-sm) {
      .master {
        margin-left: 0;
      }
    }
    @media (max-width: 980px) {
      width: auto;
    }
    @media (max-width: 1400px) {
      margin-left: 200px;
      flex-basis: 700px;
      min-width: 700px;
    }
    @media (max-width: $breakpoint-xs) {
      padding-top: 54px;
    }
    > .inner {
      background: #fff;
      padding: 15px 75px 0;
      min-height: 100vh;
      z-index: 2;
      position: relative;
      @media (max-width: $breakpoint-xs) {
        padding-left: 30px;
        padding-right: 30px;
      }
    }
  }
  &__aside {
    min-height: 100vh;
    z-index: 1;
    flex-grow: 1;
    @media (max-width: 980px) {
      display: none;
    }
    &-inner {
      display: flex;
      flex-direction: column;
      padding: 30px;
      height: 100%;
    }
    &-footer {
      margin-top: auto;
    }
  }
}

@media (max-width: $breakpoint-xs) {
  .gatsby-highlight {
    margin-left: -30px;
    margin-right: -30px;
    pre {
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  .section-below-post {
    margin-left: -30px;
    padding-left: 30px;
    padding-right: 30px;
    margin-right: -30px;
  }
  .fourzerofour {
    height: calc(100vh - 50px);
    background-size: auto 100%;
    background-position: center top;

    > .inner {
      background: rgba(0, 0, 0, 0.5);
      height: calc(100vh - 50px);
    }
    h1 {
      font-size: 28px;
    }
    p {
      font-size: 18px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .page-about {
    .about-header {
      padding-top: 0;
      margin-left: -30px;
      margin-right: -30px;
    }
  }
}
@media (max-width: $breakpoint-sm) {
  .layout-blog {
    .fourzerofour {
      margin-left: 0;
    }
  }
}
@media (max-width: 1400px) {
  .layout-blog {
    .sidebar {
      width: 200px;
    }
    .fourzerofour {
      margin-left: 200px;
    }
  }
}
</style>

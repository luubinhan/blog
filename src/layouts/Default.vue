<template>
  <div id="app" class="layout-blog">
    <PrimaryNav />
    <div class="master">
      <main class="inner">
        <slot />
      </main>
    </div>
    <div class="aside">
      <Search />
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
    Search
  },
};
</script>

<style lang="scss">

.layout-blog {
  position: relative;
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
    width: $masterWidth;
    margin-left: $sidebarWidth;
    background: #fff;
    z-index: 2;
    position: relative;
    > .inner {
      background: #fff;
      padding: 15px 75px 0;
      min-height: 100vh;
      z-index: 2;
      position: relative;
    }
  }
  .aside {
    background-color: #f1f1f1;
    min-height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
  }
}

.aside {
  .beautiful-post-name {
    position: absolute;
    bottom: 15%;
    right: 35px;
    width: calc(100% - 1300px);
    text-align: center;
    font-family: "avo_bold", $san-serif;
    font-size: 3rem;
    line-height: 1.2;
    transform: rotate(-5deg) skew(-5deg);
    text-shadow: 0.04em 0.04em 0 #fff;
    z-index: 1;
    margin: 0;
    letter-spacing: 0.1em;

    &:after {
      position: absolute;
      left: 0.0875em;
      top: 0.0875em;

      letter-spacing: 0.1em;
      content: attr(data-text-shadow);
      color: transparent;
      text-shadow: none;

      z-index: -1;
      background: linear-gradient(
        45deg,
        transparent 25%,
        white 25%,
        white 50%,
        transparent 50%,
        transparent 75%,
        white 75%,
        white
      );
      background-size: 3px 3px;
      -webkit-background-clip: text;
      background-clip: text;
    }
  }
  .company-info {
    position: absolute;
    bottom: 35px;
    right: 35px;
    width: calc(100% - 1300px);
    text-align: center;
    &.tag {
      bottom: auto;
      top: 70%;
      margin-right: -30px;
      text-transform: uppercase;
    }
  }
  .company-name {
    font-family: $san-serif;
    font-size: 2.5rem;
    display: inline-block;
    border: 1px solid #000;
    margin-bottom: 10px;
    line-height: 1;
    padding: 0 12px 6px;
  }
  .company-tagline {
    font-family: $serif;
    font-size: 20px;
  }
}

@media (max-width: $breakpoint-xs) {
  .layout-blog {
    
    .master {
      padding-top: 54px;
      float: none;
      > .inner {
        padding-left: 30px;
        padding-right: 30px;
      }
    }
  }
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
    
    .master {
      margin-left: 0;
    }
    .fourzerofour {
      margin-left: 0;
    }
  }
}
@media (max-width: 980px) {
  .layout-blog {
    .master {
      width: auto;
    }
    .aside {
      display: none;
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
    .master {
      margin-left: 200px;
      max-width: 700px;
    }
  }
  .aside {
    .company-info {
      width: calc(100% - 1000px);
    }
  }
}
</style>

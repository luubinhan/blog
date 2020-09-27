<template>
  <div id="app" class="layout-blog">
    <PrimaryNav />
    <div class="master">
      <main class="inner">
        <div class="master__search">
          <Search />
        </div>
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
  @media (max-width: $breakpoint-sm) {
    display: block;
  }
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

    @media (max-width: 1400px) {
      min-width: 0;
    }
    @media (max-width: 980px) {
      width: auto;
    }
    @media (max-width: $breakpoint-sm) {
      margin-left: 0;
      max-height: none;
    }
    @media (max-width: $breakpoint-xs) {
      padding-top: 54px;
    }
    &__search {
      display: none;
      @media (max-width: $breakpoint-sm) {
        display: block;
        position: relative;
        z-index: 7;
        margin-bottom: 1em;
      }
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
    z-index: 1;
    flex-grow: 1;
    max-width: 20vw;
    @media (max-width: 980px) {
      display: none;
    }
    &-inner {
      display: flex;
      flex-direction: column;
      padding: 30px;
      height: 100vh;
      overflow-y: auto;
      @include scroll;
    }
    &-footer {
      margin-top: auto;
    }
  }
}
</style>

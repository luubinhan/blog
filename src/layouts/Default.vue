<template>
  <div id="app" class="layout-blog">
    <PrimaryNav />
    <div class="master">
      <main class="inner">
        <slot />
      </main>
    </div>
    <div className="aside">
      <!-- search -->
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";
import PrimaryNav from "~/components/PrimaryNav.vue";

export default {
  props: {
    showLogo: { default: true },
  },
  components: {
    Logo,
    ToggleTheme,
    PrimaryNav,
  },
};
</script>

<style lang="scss">
.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}
</style>

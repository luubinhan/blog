<template>
  <div class="card">
    <div class="sidebar">
      <div class="inner">
        <g-link to="/" class="go-home">
        VuiLapTrinh.com
        </g-link>
        <button
          type="button"
          aria-expanded="false"
          :class="`navbar-toggle ${collapsed ? 'collapsed' : ''}`"
          onClick={this.handleNavClick}
          aria-label="nav"
        >
          <div class="hamburger hamburger-1">
            <span class="line" />
            <span class="line" />
            <span class="line" />
          </div>
        </button>
        <div class="navigation-component">
          <ul
            :class="`nav primary-menu ${collapsed ? 'collapsed' : ''}`"
          >
            <PrimaryNav />
            <li class="about">
              <a href="https://luubinhan.github.io/" target="_blank">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="footer">
        <footer class="footer">
          <section class="footer-inner">
            <div class="social-links">
              <a class="link-youtube" href="https://www.youtube.com/channel/UC0Te8s0b0aplS1ZoVLfjKHA" target="_blank" rel="noopener noreferrer">
                <IoSocialYoutube /> Youtube
              </a>
            </div>
            <div class="credit">
              Copyright © 2019. luckyluu
            </div>
          </section>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryNav from "~/components/PrimaryNav.vue";

export default {
  components: {
    PrimaryNav
  }
};
</script>

<style>
</style>

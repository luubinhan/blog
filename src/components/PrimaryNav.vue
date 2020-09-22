<template>
  <div className="sidebar">
    <div class="sidebar__inner">
      <g-link to="/" className="go-home">
        VuiLapTrinh.com
      </g-link>
      <div class="navigation-component">
        <ul class="nav primary-menu" :class="collapsed && 'collapsed'">
          <li
            v-for="(m, index) in menus"
            :key="index"
            :class="camelCase(m.name)"
          >
            <g-link
              :aria-label="`Kiến thức ${m.name}`"
              :title="`Kiến thức ${m.name}`"
              :to="m.href"
              activeClassName="active"
              :target="m.target || ''"
            >
              <span v-if="m.icon === 'js'"><IconJs /></span>
              {{m.name}}
            </g-link>
          </li>
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
            <a
              class="link-youtube"
              href="https://www.youtube.com/channel/UC0Te8s0b0aplS1ZoVLfjKHA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube /> Youtube
            </a>
          </div>
          <div class="credit">
            Copyright © 2019. luckyluu
          </div>
        </section>
      </footer>
    </div>
  </div>
</template>

<script>
import IconJs from '~/assets/images/js.svg';
import Youtube from '~/assets/images/youtube.svg';
import { camelCase } from 'lodash';

export default {
  data: () => ({
    menus: [
      {
        name: 'Javascript',
        href: '/tags/javascript',
        icon: 'js'
      },
      {
        name: 'React',
        href: '/tags/react',
        icon: 'nodejs'
      },
      {
        name: 'React native',
        href: '/tags/react-native',
        icon: 'react-native'
      },
      {
        name: 'Vue',
        href: '/tags/vuejs',
        icon: 'vue'
      },
      {
        name: 'HTML/CSS',
        href: '/tags/css',
        icon: 'html5'
      },
      {
        name: 'UX/UI',
        href: '/tags/ux-ui',
        icon: 'compass'
      }
    ]
  }),
  methods: {
    camelCase
  },
  components: {
    IconJs,
    Youtube
  }
};
</script>

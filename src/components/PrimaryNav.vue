<template>
  <div class="sidebar">
    <div class="sidebar__inner">
      <g-link to="/" class="go-home">VuiLapTrinh.com</g-link>
      <button
        type="button"
        aria-expanded="false"
        class="navbar-toggle"
        :class="`${collapsed ? 'collapsed' : ''}`"
        @click="handleNavClick"
        aria-label="nav"
      >
        <div class="hamburger hamburger-1">
          <span class="line" />
          <span class="line" />
          <span class="line" />
        </div>
      </button>
      <div class="navigation-component">
        <ul class="nav primary-menu" :class="collapsed && 'collapsed'">
          <li v-for="(m, index) in menus" :key="index" :class="camelCase(m.name)">
            <g-link
              :aria-label="`Kiến thức ${m.name}`"
              :title="`Kiến thức ${m.name}`"
              :to="m.href"
              exact-active-class="active"
              :target="m.target || ''"
            >
              <span class="primary-menu__icon" v-if="m.icon === 'js'">
                <IconJs />
              </span>
              <span class="primary-menu__icon" v-if="m.icon === 'nodejs'">
                <React />
              </span>
              <span class="primary-menu__icon" v-if="m.icon === 'react-native'">
                <Native />
              </span>
              <span class="primary-menu__icon" v-if="m.icon === 'html5'">
                <Html />
              </span>
              <span class="primary-menu__icon" v-if="m.icon === 'vue'">
                <Vue />
              </span>
              <span class="primary-menu__icon" v-if="m.icon === 'paint'">
                <Paint />
              </span>
              <span class="primary-menu__label">{{m.name}}</span>
            </g-link>
          </li>
          <li class="about">
            <a href="https://luubinhan.github.io/" target="_blank">About</a>
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
              <span class="link-youtube__icon">
                <Youtube />
              </span>
              Youtube
            </a>
          </div>
          <div class="credit">Copyright © 2019. luckyluu</div>
        </section>
      </footer>
    </div>
  </div>
</template>

<script>
import IconJs from "~/assets/images/js.svg";
import Youtube from "~/assets/images/youtube.svg";
import React from "~/assets/images/react.svg";
import Native from "~/assets/images/native.svg";
import Html from "~/assets/images/html.svg";
import Vue from "~/assets/images/vue.svg";
import Paint from "~/assets/images/paint.svg";
import { camelCase } from "lodash";

export default {
  data: () => ({
    collapsed: true,
    menus: [
      {
        name: "Javascript",
        href: "/tag/javascript",
        icon: "js",
      },
      {
        name: "React",
        href: "/tag/react",
        icon: "nodejs",
      },
      {
        name: "React native",
        href: "/tag/react-native",
        icon: "react-native",
      },
      {
        name: "Vue",
        href: "/tag/vuejs",
        icon: "vue",
      },
      {
        name: "HTML/CSS",
        href: "/tag/css",
        icon: "html5",
      },
      {
        name: "UX/UI",
        href: "/tag/ux-ui",
        icon: "paint",
      },
    ],
  }),
  methods: {
    camelCase,
    handleNavClick() {
      this.collapsed = !this.collapsed;
    },
  },
  components: {
    IconJs,
    Youtube,
    React,
    Html,
    Native,
    Vue,
    Paint,
  },
};
</script>

<style lang="scss" scoped>
.primary-menu {
  list-style: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  &__icon {
    flex-basis: 33px;
    min-width: 33px;
    svg {
      height: 25px;
    }
  }
  li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    &:before {
      position: absolute;
      display: block;
      content: "";
      width: 0;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      top: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0);
      z-index: 0;
      -webkit-transition: all 0.2s ease-in-out;
      -moz-transition: all 0.2s ease-in-out;
      -ms-transition: all 0.2s ease-in-out;
      -o-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      &:before {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    &.javascript {
      svg {
        fill: $yellow;
      }
      a:hover {
        color: $yellow;
      }
    }
    &.react {
      svg {
        fill: $cyan;
      }
      a:hover {
        color: $cyan;
      }
    }
    &.wordpress {
      svg {
        fill: $blue;
      }
      a:hover {
        color: $blue;
      }
    }
    &.htmlCss {
      svg {
        fill: $orange;
      }
      a:hover {
        color: $orange;
      }
    }
    &.uxUi {
      svg {
        fill: $google;
      }
      a:hover {
        color: $google;
      }
    }
    a {
      display: flex;
      align-items: center;
      color: #f2f2f2;
      font-family: "avo_bold", $san-serif;
      padding: 9px 0 12px;
      line-height: 1;
      font-size: $font-size-base;
      position: relative;
      z-index: 1;
      -webkit-transition: all 0.1s ease-in-out;
      -moz-transition: all 0.1s ease-in-out;
      -ms-transition: all 0.1s ease-in-out;
      -o-transition: all 0.1s ease-in-out;
      transition: all 0.1s ease-in-out;
      svg {
        padding-right: 7px;
      }
      &.active {
        color: $primary-color;
      }
    }
    a:hover,
    a:focus {
      background: transparent;
      padding-left: 10px;
    }
  }
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
  width: 320px;
  background: var(--sidebar-color);
  color: rgba(255, 255, 255, 0.65);
  &__inner {
    padding: 50px 30px 30px;
    @media (max-width: $breakpoint-sm) {
      padding: 15px;
    }
  }
  .footer {
    position: absolute;
    bottom: 15px;
    left: 30px;
    right: 30px;
    width: auto;
    .credit {
      text-align: left;
      float: none;
      width: auto;
    }
    .container {
      width: auto;
    }
  }
}
@media (max-width: $breakpoint-sm) {
  .sidebar {
    position: sticky;
    top: 0;
    bottom: auto;
    left: auto;
    width: auto;
    .collapsed {
      .hamburger {
        .line:nth-child(2) {
          opacity: 1;
        }
        .line:nth-child(1) {
          -webkit-transform: translateY(0px) rotate(0deg);
          -ms-transform: translateY(0px) rotate(0deg);
          -o-transform: translateY(0px) rotate(0deg);
          transform: translateY(0px) rotate(0deg);
        }
        .line:nth-child(3) {
          -webkit-transform: translateY(0px) rotate(0deg);
          -ms-transform: translateY(0px) rotate(0deg);
          -o-transform: translateY(0px) rotate(0deg);
          transform: translateY(0px) rotate(0deg);
        }
      }
    }
    .navbar-toggle {
      position: absolute;
      top: 11px;
      right: 20px;
      z-index: 999;
      padding: 2px 0;
      background: transparent;
      border: none;
      cursor: pointer;
      &:hover {
        background: transparent;
      }
    }
    .hamburger {
      .line {
        width: 30px;
        height: 3px;
        background-color: #a6a6a6;
        display: block;
        margin: 5px auto;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }
      .line:nth-child(2) {
        opacity: 0;
      }
      .line:nth-child(1) {
        -webkit-transform: translateY(8px) rotate(45deg);
        -ms-transform: translateY(8px) rotate(45deg);
        -o-transform: translateY(8px) rotate(45deg);
        transform: translateY(8px) rotate(45deg);
      }
      .line:nth-child(3) {
        -webkit-transform: translateY(-8px) rotate(-45deg);
        -ms-transform: translateY(-8px) rotate(-45deg);
        -o-transform: translateY(-8px) rotate(-45deg);
        transform: translateY(-8px) rotate(-45deg);
      }
    }
    .primary-menu {
      &.collapsed {
        display: none;
      }
      display: block;
      position: absolute;
      top: 50px;
      background: lighten(#252525, 2%);
      left: 0;
      right: 0;
      padding-left: 30px;
      padding-right: 30px;
    }
    .go-home {
      width: 34px;
      padding-bottom: 0;
      color: #fff;
      font-family: "avo_bold", $san-serif;
      img {
        display: block;
      }
    }
    > .inner {
      padding: 10px 30px;
    }
    .footer {
      display: none;
    }
  }
}
@media (max-width: $breakpoint-xs) {
  .sidebar {
    position: fixed;
    left: 0;
    right: 0;
  }
}
.social-links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 15px 0;
}

.social-links > div {
  margin: 5px 15px;
}

.share-count {
  text-align: center;
}

/* Footer
-------------------------------------------------------------- */
.footer {
  color: #f2f2f2;
  font-family: $monospace;
  line-height: 20px;
  position: absolute;
  font-size: $font-size-base;
  bottom: 0;
  width: 100%;
  .footer-inner {
    padding: $glutter 0;
    a {
      color: #f2f2f2;
    }
    .link-youtube {
      display: inline-flex;
      color: $google;
      font-weight: bold;
      font-family: $san-serif;
      &__icon {
        flex-basis: 25px;
        min-width: 25px;
        margin-right: 10px;
      }
    }
  }
  .copyright {
    float: left;
    width: 50%;
  }
  .credit {
    float: right;
    width: 50%;
    text-align: right;
  }
}
@media (max-width: $breakpoint-xs) {
  .footer {
    .copyright,
    .credit {
      float: none;
      width: auto;
      text-align: center;
      font-size: $font-size-small;
    }
  }
}
/* Footer --------------------------------------------- */
</style>
<template>
  <div class="navigation-component">
    <ul class="nav primary-menu" :className="`${collapsed ? '' : ''}`">
      <li key="{item.name}" class="{camelCase(item.name)}">
        <g-link
          :aria-label="`Kiến thức ${item.name}`"
          :title="`Kiến thức ${item.name}`"
          :to="item.href"
          exact
          active-class="active"
          :target="item.target || ''"
        >
          {{item.icon !== "" && this.renderIcon(item.icon)}} {{item.name}}
        </g-link>
      </li>
      <li class="about">
        <a href="https://luubinhan.github.io/" target="_blank">About</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    nav: [
      {
        name: 'Javascript',
        href: '/tags/javascript',
        isActive: false,
        icon: 'javascript'
      },
      {
        name: 'React',
        href: '/tags/react',
        isActive: false,
        icon: 'nodejs'
      },
      {
        name: 'React native',
        href: '/tags/react-native',
        isActive: false,
        icon: 'react-native'
      },
      {
        name: 'Vue',
        href: '/tags/vuejs',
        isActive: false,
        icon: 'vue'
      },
      {
        name: 'HTML/CSS',
        href: '/tags/css',
        isActive: false,
        icon: 'html5'
      },
      {
        name: 'UX/UI',
        href: '/tags/ux-ui',
        isActive: false,
        icon: 'compass'
      }
    ]
  }),
  methods: {
    renderIcon: name => {
        switch (name) {
        case "nodejs":
            return 'IoSocialNodejs';
        case "javascript":
            return 'IoSocialJavascript';
        case "wordpress":
            return 'IoSocialWordpress';
        case "html5":
            return 'IoSocialHtml5';
        case "compass":
            return 'IoAndroidCompass';
        case "react-native":
            return 'IoAndroidPhonePortrait';
        case "send":
            return 'IoAndroidSend';
        default:
            return 'IoAndroidMenu';
        }
    }
  }
};
</script>

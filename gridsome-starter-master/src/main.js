// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "~/assets/style/index.scss";
import DefaultLayout from "~/layouts/Default.vue";
import VueDisqus from "vue-disqus";

export default function(Vue, { router, head, isClient }) {
  head.link.push({
    rel: "stylesheet",
    href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css"
  });

  Vue.use(Buefy);
  Vue.component("Layout", DefaultLayout);
  Vue.use(VueDisqus);
}

// Import main css
import '~/assets/style/index.scss'
import '~/assets/fontello/css/down.css'
import Vssue from 'vssue';
import GithubV3 from '@vssue/api-github-v3';
// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'
import 'vssue/dist/vssue.css'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.use(Vssue, {
    api: GithubV3,
    owner: process.env.OWNER_OF_REPO,
    repo: process.env.NAME_OF_REPO,
    clientId: process.env.YOUR_CLIENT_ID,
    clientSecret: process.env.YOUR_CLIENT_SECRET,
  })
  /* head.link.push({
    rel: 'stylesheet',
    href: './fontello/css/down.css'
  }) */
}
import '~/assets/style/index.scss'
import '~/assets/fontello/css/down.css'
import Vssue from 'vssue';
import GithubV3 from '@vssue/api-github-v3';
import DefaultLayout from '~/layouts/Default.vue'
import 'vssue/dist/vssue.css'

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout);
  Vue.use(Vssue, {
    api: GithubV3,
    owner: 'luubinhan',
    repo: 'blog',
    clientId: '',
    clientSecret: '',
  })
  /* head.link.push({
    rel: 'stylesheet',
    href: './fontello/css/down.css'
  }) */
}
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
    clientId: '2f013a6e1a0440cf6dae',
    clientSecret: 'd56cfab31cb810c7e66a6b7b6c3bbe850647e4b0',
  })
  /* head.link.push({
    rel: 'stylesheet',
    href: './fontello/css/down.css'
  }) */
}
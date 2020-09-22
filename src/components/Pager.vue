<template>
  <div class="mst-pager">
    <Pager :info="$page.posts.pageInfo" />
  </div>
</template>

<script>
import { Pager } from 'gridsome';

export default {
  components: {
    Pager
  }
}
</script>

<style lang="scss">
.mst-pager {
  padding-top: 135px;
  padding-bottom: 135px;
  text-align: center;
  a {
    padding-left: 14px;
    padding-right: 14px;
    font-size: 24px;
    line-height: 32px;
    color: #000;
    &.active--exact {
      pointer-events: none;
      color: rgba(0, 0, 0, 0.2);
    }
    &:hover {
      color: var(--primary-color);
    }
  }
}
</style>
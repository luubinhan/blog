<template>
  <div class="mst-pager">
    <Pager ariaCurrentLabel="current" :info="$page.posts.pageInfo" />
  </div>
</template>

<script>
import { Pager } from "gridsome";

export default {
  components: {
    Pager,
  }
};
</script>

<style lang="scss">
.mst-pager {
  padding-top: 135px;
  padding-bottom: 135px;
  text-align: center;

  @include tablet {
    padding-top: 25px;
    padding-bottom: 25px;
  }

  a {
    padding-left: 14px;
    padding-right: 14px;
    font-size: 24px;
    line-height: 32px;
    color: var(--link-pager);
    &.active--exact {
      pointer-events: none;
      color: rgba(0, 0, 0, 0.2);
     
    }
    &:hover {
      color: var(--primary-color);
    }
    &[aria-label="current"] {
      background: var(--primary-color);
      color: white;
      border-radius: 3px;
    }
  }
}
</style>
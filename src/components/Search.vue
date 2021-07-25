<template>
  <div class="search-wrapper">
    <div class="mb-2">
      <PostTags :post="post" />
    </div>
    <div class="search__container">
      <input v-model="searchTerm" class="search__input" type="text" placeholder="Tìm bài viết..." />
      <button v-if="searchTerm" class="search_clear" @click="clearSearch">X</button>
    </div>
    <div class="search__list">
      <div v-if="searchResults.length === 0 && !!searchTerm">
        <div class="item-search">
          Không có kết quả nào cho
          <strong>{{ searchTerm }}</strong>
        </div>
      </div>
      <div v-if="searchResults.length > 0">
        <div class="item-search" v-for="(result, index) in searchResults" :key="index">
          <h4>
            <g-link :to="result.path" class="link">{{ result.title }}</g-link>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostTags from "~/components/PostTags";

const LIST_TAGS = [
  {
    id: "javascript",
    path: "tag/javascript",
    title: "Javascript",
  },
  {
    id: "dam-dao",
    path: "tag/dam-dao",
    title: "Đàm đạo chém gió chuyện nghề",
  },
  {
    id: "css",
    path: "tag/css",
    title: "CSS từ căn bản tới nâng cao",
  },
  {
    id: "thu-thuat",
    path: "tag/thu-thuat",
    title: "Thủ thuật",
  },
  {
    id: "hoc-thuat",
    path: "tag/hoc-thuat",
    title: "Kiến thức nền tảng",
  },
  {
    id: "react",
    path: "tag/react",
    title: "React",
  },
  {
    id: "vuejs",
    path: "tag/vuejs",
    title: "Vue JS",
  },
  {
    id: "chrome",
    path: "tag/chrome",
    title: "Chrome DevTools",
  },
];

export default {
  data: () => ({
    searchTerm: "",
    post: {
      tags: LIST_TAGS,
    },
  }),
  computed: {
    searchResults() {
      const searchTerm = this.searchTerm;
      if (searchTerm.length < 3) return [];
      return this.$search.search({ query: searchTerm, limit: 5 });
    },
  },
  methods: {
    clearSearch() {
      this.searchTerm = "";
    },
  },
  components: {
    PostTags,
  },
};
</script>

<style lang="scss">
.search-wrapper {
  z-index: 1;
  margin: 0;
}
.search__container {
  position: relative;
}
.search__input {
  border-radius: 0;
  display: block;
  padding: 10px 12px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  &:hover,
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}
.search__list {
  box-sizing: border-box;
  z-index: 1;
  height: 300px;
  overflow: auto;
  @include scroll;
  @include tablet {
    height: auto;
    position: absolute;
    right: 0;
    left: 0;
    background: #fff;
  }
}
.item-search {
  padding: 10px 12px 0;
  @include tablet {
    padding: 12px;
  }
  .link {
    &:hover,
    &:focus {
      outline: none;
      color: var(--primary-color);
    }
  }
}

.search_clear {
  border: none;
  background: transparent;
  position: absolute;
  z-index: 7;
  cursor: pointer;
  right: 7px;
  top: 12px;
  &:hover,
  &:focus {
    outline: none;
    color: var(--primary-color);
  }
}
</style>

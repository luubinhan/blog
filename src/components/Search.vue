<template>
  <div class="search-wrapper">
    <div class="search__container">
    <input
      id="search"
      v-model="searchTerm"
      class="search__input"
      type="text"
      placeholder="Tìm bài viết">
      </div>
    <div class="search__list">
      <div v-if="searchResults.length === 0 && !!searchTerm">
        <div class="item-search">
          Không có kết quả nào cho {{ searchTerm }}
        </div>
      </div>
      <div v-if="searchResults.length > 0">
        <div class="item-search" v-for="(result, index) in searchResults" :key="index">
          <h4>
            <g-link :to="result.path" class="link">
              {{ result.title }}
            </g-link>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchTerm: ''
  }),
  computed: {
    searchResults () {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 3) return []
      return this.$search.search({ query: searchTerm, limit: 5 })
    }
  }
}
</script>

<style lang="scss">

.search-wrapper {
  position: absolute;
  top: 15%;
  right: 35px;
  width: calc(100% - 1300px);
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
  border: 1px solid $border-color;
  &:hover,
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}
.search__list {
  box-sizing: border-box;
  z-index: 1;
  max-height: 300px;
  min-height: 200px;
  overflow: auto;
  @include scroll;
}
.item-search {
  padding: 10px 12px 0;
  .link {
    &:hover,
    &:focus {
      outline: none;
      color: $primary-color;
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
    color: $primary-color;
  }
}

</style>
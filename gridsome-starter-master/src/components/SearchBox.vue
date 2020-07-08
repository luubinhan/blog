<template>
  <div class="SearchBox">
    <b-field>
      <b-autocomplete
        v-model="searchTerm"
        ref="autocomplete"
        :data="searchResults"
        placeholder="Search..."
        @select="option => selected = option"
      >
        <template slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <g-link :to="props.option.path">
                  <h5 class="title" v-html="props.option.title"></h5>
                </g-link>
                <p v-html="props.option.description"></p>
              </div>
            </div>
          </article>
        </template>
        <template slot="empty">No results for {{searchTerm}}</template>
      </b-autocomplete>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data: () => ({
    searchTerm: ""
  }),
  computed: {
    searchResults() {
      const searchTerm = this.searchTerm;
      if (searchTerm.length < 3) return [];
      return this.$search.search({ query: searchTerm, limit: 5 });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 0;
}
</style>

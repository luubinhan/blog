<template>
	<div class="related-posts">
		<h4>Bài liên quan</h4>
		<ul class="related-posts__container">
			<li class="related-posts__media" v-for="(r, index) in posts" :key="r.id">
				<div class="related-posts__index">{{ index + 1 }}.</div>
				<div class="related-posts__content">
					<h4 class="related-posts__title">
						<g-link :to="r.path">{{ r.title }}</g-link>
					</h4>
					<p>{{ r.desc }}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['posts'],
};
</script>

<style lang="scss" scoped>
.related-posts {
  padding: 40px 35px 30px;
  background-color: var(--related-post);
  @media (max-width: var(--breakpoint-1400)) {
    padding: 15px;
  }
  &__container {
    margin-top: 20px;
  }
  &__media {
    margin-bottom: 14px;
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 15px;
  }
  &__title {
    margin-bottom: 7px;
  }
  &__index {
    font-weight: bold;
    font-size: 1.5em;
    flex-basis: 50px;
    min-width: 50px;
    @media (max-width: var(--breakpoint-1400)) {
      display: none;
    }
  }
}
</style>
<template>
	<span
		class="toggle-wrapper"
		@click="toggle"
		role="checkbox"
		:aria-checked="value.toString()"
		tabindex="0"
		@keydown.space.prevent="toggle"
	>
		<span class="toggle-background" :style="backgroundStyles">
			<span class="icon" v-if="value">
				🌜
			</span>
			<span class="icon" v-else>
				🌞
			</span>
		</span>
		<span class="toggle-indicator" :style="indicatorStyles"></span>
	</span>
</template>

<script>
export default {
	props: ['value'],
	methods: {
		toggle() {
			this.$emit('input', !this.value);
		},
	},
	computed: {
		backgroundStyles() {
			return {
				backgroundColor: this.value ? '#000' : '#dae1e7',
			};
		},
		indicatorStyles() {
			return { transform: this.value ? 'translateX(2rem)' : 'translateX(0)' };
		},
	},
};
</script>

<style scoped lang="scss">
[aria-checked='true'] {
	.icon {
		transform: translateX(-33px);
	}
}
.icon {
	display: block;
	font-size: 20px;
	padding-right: 5px;
}
.toggle-wrapper {
	display: inline-block;
	position: relative;
	cursor: pointer;
	height: 2rem;
	width: 4rem;
	border-radius: 9999px;
}
.toggle-wrapper:focus {
	outline: 0;
	box-shadow: 0 0 0 4px var(--primary-color);
}

.toggle-background {
	display: inline-block;
	border-radius: 9999px;
	height: 100%;
	width: 100%;
	box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: background-color 0.2s ease;
}

.toggle-indicator {
	position: absolute;
	top: 0.25rem;
	left: 0.25rem;
	height: 1.5rem;
	width: 1.5rem;
	background-color: #fff;
	border-radius: 9999px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease;
}
</style>

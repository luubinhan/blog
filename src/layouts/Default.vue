<template>
	<div id="app" class="layout-blog">
		<PrimaryNav />
		<div class="master">
			<div id="scrollTop"></div>
			<main class="inner">
				<div class="master__search">
					<Search />
				</div>
				<slot />
			</main>
		</div>
		<div v-if="showSidebar" class="layout-blog__aside">
			<div class="layout-blog__aside-inner">
				<div class="toggle-theme">
					☀️
					<toggle-button
						@change="toggleTheme"
						:value="colorScheme === 'dark'"
						color="#000"
						:labels="{ checked: 'Tối', unchecked: 'Sáng' }"
					/>
				</div>
				<Search />
				<!-- <iframe
					src="https://docs.google.com/forms/d/e/1FAIpQLSc2vHEFz9Un-BsJDvZ6-j5fyDZCYahvssIU15Dwp8M2WU7vyA/viewform?embedded=true"
					width="640"
					height="641"
					frameborder="0"
					marginheight="0"
					marginwidth="0"
					>Loading…</iframe
				> -->
				<div class="layout-blog__aside-footer">
					<slot name="aside" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button';
import Logo from '~/components/Logo.vue';
import ToggleTheme from '~/components/ToggleTheme.vue';
import PrimaryNav from '~/components/PrimaryNav.vue';
import Search from '~/components/Search';

export default {
	props: {
		showSidebar: { default: true },
	},
	computed: {
		colorScheme: {
			get: function() {
				if (localStorage.getItem("theme") === 'dark') {
					return 'dark';
				}

				return 'light'
			},
			set: function(newValue) {
				localStorage.setItem("theme", newValue);
			}
		} 
	},
	components: {
		Logo,
		ToggleTheme,
		PrimaryNav,
		Search,
		ToggleButton,
	},
	methods: {
		toggleTheme: function({ value }) {
			if (value) {
				document.body.setAttribute("data-theme", 'dark');
				localStorage.setItem("theme", "dark");
			} else {
				document.body.setAttribute("data-theme", 'light');
				localStorage.setItem("theme", "light");
			}
		},
	},
	updated: function() {
		location.href = '#scrollTop';
	},
};
</script>

<style lang="scss">
.toggle-theme {
	margin-bottom: 40px;
	text-align: right;
}

.master {
	@include scroll;
	flex-basis: var(--master-width);
	min-width: var(--master-width);
	margin-left: var(--sidebar-width);
	background-color: var(--bg-master);
	z-index: 2;
	position: relative;
	max-height: 100vh;
	overflow-y: auto;

	@media (max-width: var(--breakpoint-1400)) {
		min-width: 0;
	}
	@media (max-width: var(--breakpoint-980)) {
		width: auto;
	}
	@include tablet {
		margin-left: 0;
		max-height: none;
	}
	@include mobile {
		padding-top: 54px;
	}
	&__search {
		display: none;
		@include tablet {
			display: block;
			position: relative;
			z-index: 7;
			margin-bottom: 1em;
		}
	}
	> .inner {
		padding: 15px 75px 0;
		min-height: 100vh;
		z-index: 2;
		position: relative;

		@include mobile {
			padding-left: 30px;
			padding-right: 30px;
		}
	}
}
.layout-blog {
	position: relative;
	display: flex;
	@include tablet {
		display: block;
	}

	&__aside {
		z-index: 1;
		flex-grow: 1;
		background-color: var(--bg-aside);
		@media (max-width: var(--breakpoint-1400)) {
			max-width: 30vw;
		}
		@media (max-width: var(--breakpoint-980)) {
			max-width: 20vw;
			display: none;
		}
		&-inner {
			display: flex;
			flex-direction: column;
			padding: 30px;
			height: 100vh;
			overflow-y: auto;
			@include scroll;
			@media (max-width: var(--breakpoint-1400)) {
				padding: 15px;
			}
		}
	}
}
</style>

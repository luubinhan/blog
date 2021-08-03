<template>
	<div id="app" class="layout-blog">
		<PrimaryNav />
		<div class="master-container">
			<div v-if="showSidebar" class="aside">
				<div class="aside__inner">
					<div class="toggle-theme">
						<Toggle @input="toggleTheme" :value="isDarkMode" />
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
			<div class="master">
				<main class="inner">
					<slot />
				</main>
				<slot name="below-master" />
			</div>
		</div>
	</div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import ToggleTheme from '~/components/ToggleTheme.vue';
import PrimaryNav from '~/components/PrimaryNav.vue';
import Search from '~/components/Search';
import Toggle from '~/components/Toggle';

export default {
	data: () => ({
		isDarkMode: false,
	}),
	props: {
		showSidebar: { default: true },
	},
	components: {
		Logo,
		ToggleTheme,
		PrimaryNav,
		Search,
		Toggle,
	},
	methods: {
		toggleTheme: function(value) {
			if (value) {
				document.body.setAttribute('data-theme', 'dark');
				localStorage.setItem('theme', 'dark');
				this.isDarkMode = true;
			} else {
				document.body.setAttribute('data-theme', 'light');
				localStorage.setItem('theme', 'light');
				this.isDarkMode = false;
			}
		},
	},
	updated: function() {
		// location.href = '#scrollTop';
	},
	mounted: function() {
		this.isDarkMode = localStorage.getItem('theme') === 'dark' ? true : false;
	},
};
</script>

<style lang="scss">
.layout-blog {
	position: relative;
	display: flex;
	background-color: var(--bg-aside);
	@include tablet {
		display: block;
	}
}

</style>

<style lang="scss" scoped>
.toggle-theme {
	margin-bottom: 40px;
	text-align: right;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	@include z-index(toggle-theme);

	@include desktop {
		display: block;
		position: fixed;
		right: 81px;
		top: 13px;
	}
}
.master-container {
	@include z-index(master-container);
	display: flex;
	flex-direction: row-reverse;
	

	@include tablet {
		display: block;
		padding-top: 56px;
	}
}
.master {
	@include scroll;

	flex-basis: var(--master-width);
	min-width: var(--master-width);
	background-color: var(--bg-master);
	position: relative;

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
		padding-top: 10px;
	}
	> .inner {
		padding: 15px 75px 0;
		min-height: 100vh;
		z-index: 2;
		position: relative;

		@include tablet {
			padding-left: 20px;
			padding-right: 20px;
		}

		@include mobile {
			padding-left: 30px;
			padding-right: 30px;
		}
	}
}
.aside {
	@include z-index(4);
	
	flex-grow: 1;
	background-color: var(--bg-aside);
	position: relative;

	@media (max-width: var(--breakpoint-1400)) {
		max-width: 30vw;
	}	

	&__inner {
		display: flex;
		flex-direction: column;
		padding: 30px;
		height: 100vh;
		position: fixed;

		@include tablet {
			padding: 15px;
			height: auto;
			position: relative;
		}
	}
}
</style>
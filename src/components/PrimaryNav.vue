<template>
	<div class="sidebar">
		<div class="sidebar__inner">
			<Brand />
			<button
				type="button"
				aria-expanded="false"
				class="navbar-toggle"
				:class="`${collapsed ? 'collapsed' : ''}`"
				@click="handleNavClick"
				aria-label="nav"
			>
				<div class="hamburger hamburger-1">
					<span class="line" />
					<span class="line" />
					<span class="line" />
				</div>
			</button>
			<div class="navigation-component">
				<ul class="nav primary-menu" :class="collapsed && 'collapsed'">
					<li
						v-for="(m, index) in menus"
						:key="index"
						:class="camelCase(m.name)"
					>
						<g-link :to="m.href">
							<span class="primary-menu__icon" v-if="m.icon === 'js'">
								<IconJs />
							</span>
							<span class="primary-menu__icon" v-if="m.icon === 'nodejs'">
								<React />
							</span>
							<span
								class="primary-menu__icon"
								v-if="m.icon === 'react-native'"
							>
								<Native />
							</span>
							<span class="primary-menu__icon" v-if="m.icon === 'html5'">
								<Html />
							</span>
							<span class="primary-menu__icon" v-if="m.icon === 'vue'">
								<Vue />
							</span>
							<span class="primary-menu__icon" v-if="m.icon === 'paint'">
								<Paint />
							</span>
							<span class="primary-menu__label">{{ m.name }}</span>
						</g-link>
					</li>
					<li class="about">
						<a href="https://luubinhan.github.io/" target="_blank" rel="noopener noreferrer">About</a>
					</li>
				</ul>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
import IconJs from '~/assets/images/js.svg';
import React from '~/assets/images/react.svg';
import Native from '~/assets/images/native.svg';
import Html from '~/assets/images/html.svg';
import Vue from '~/assets/images/vue.svg';
import Paint from '~/assets/images/paint.svg';
import { camelCase } from 'lodash';
import Brand from '~/components/Brand';
import Footer from '~/components/Footer';

const MENU = [
	{
		name: 'Javascript',
		href: '/tag/javascript',
		icon: 'js',
	},
	{
		name: 'React',
		href: '/tag/react',
		icon: 'nodejs',
	},
	{
		name: 'Vue',
		href: '/tag/vuejs',
		icon: 'vue',
	},
	{
		name: 'HTML/CSS',
		href: '/tag/css',
		icon: 'html5',
	},
	{
		name: 'UX/UI',
		href: '/tag/ux-ui',
		icon: 'paint',
	},
];

export default {
	data: () => ({
		collapsed: true,
		activeHref: '',
		menus: MENU,
	}),
	methods: {
		camelCase,
		goTo(url) {
			this.collapsed = true;
			this.activeHref = url;
			this.$router.push(url);
		},
		handleNavClick() {
			this.collapsed = !this.collapsed;
		},
	},
	components: {
		Brand,
		IconJs,
		React,
		Html,
		Native,
		Vue,
		Paint,
		Footer,
	},
};
</script>

<style lang="scss">
.primary-menu {
	list-style: none;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	@include tablet {
		&.collapsed {
			display: none;
		}
		display: block;
		position: absolute;
		top: 50px;
		background: var(--sidebar-color);
		left: 0;
		right: 0;
		padding-left: 30px;
		padding-right: 30px;
	}
	&__icon {
		flex-basis: 33px;
		min-width: 33px;
		svg {
			height: 25px;
		}
	}
	li {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		&:before {
			position: absolute;
			display: block;
			content: '';
			width: 0;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
			top: 0;
			bottom: 0;
			background: rgba(255, 255, 255, 0);
			z-index: 0;
			-webkit-transition: all 0.2s ease-in-out;
			-moz-transition: all 0.2s ease-in-out;
			-ms-transition: all 0.2s ease-in-out;
			-o-transition: all 0.2s ease-in-out;
			transition: all 0.2s ease-in-out;
		}
		&:hover {
			&:before {
				width: 100%;
				background: rgba(255, 255, 255, 0.1);
			}
		}
		&.javascript {
			svg {
				fill: var(--yellow);
			}
			a:hover {
				color: var(--yellow);
			}
		}
		&.react {
			svg {
				fill: var(--cyan);
			}
			a:hover {
				color: var(--cyan);
			}
		}
		&.wordpress {
			svg {
				fill: var(--blue);
			}
			a:hover {
				color: var(--blue);
			}
		}
		&.htmlCss {
			svg {
				fill: var(--orange);
			}
			a:hover {
				color: var(--orange);
			}
		}
		&.uxUi {
			svg {
				fill: $google;
			}
			a:hover {
				color: $google;
			}
		}
		a {
			display: flex;
			align-items: center;
			color: #f2f2f2;
			font-family: 'avo_bold', $san-serif;
			padding: 9px 0 12px;
			line-height: 1;
			font-size: $font-size-base;
			position: relative;
			z-index: 1;
			cursor: pointer;
			transition: all 0.1s ease-in-out;
			svg {
				padding-right: 7px;
			}
			&.active {
				color: var(--primary-color);
			}
		}
		a:hover,
		a:focus {
			background: transparent;
			padding-left: 10px;
		}
	}
}

@include tablet {
	.collapsed {
		.hamburger {
			.line:nth-child(2) {
				opacity: 1;
			}
			.line:nth-child(1) {
				transform: translateY(0px) rotate(0deg);
			}
			.line:nth-child(3) {
				transform: translateY(0px) rotate(0deg);
			}
		}
	}
	
	.hamburger {
		.line {
			width: 30px;
			height: 3px;
			background-color: #a6a6a6;
			display: block;
			margin: 5px auto;
			transition: all 0.3s ease-in-out;
		}
		.line:nth-child(2) {
			opacity: 0;
		}
		.line:nth-child(1) {
			transform: translateY(8px) rotate(45deg);
		}
		.line:nth-child(3) {
			transform: translateY(-8px) rotate(-45deg);
		}
	}
}
</style>

<style scoped lang="scss">
.navbar-toggle {
	@include z-index(navbar-toggle);
	position: absolute;
	top: 11px;
	right: 20px;
	padding: 2px 0;
	background: transparent;
	border: none;
	cursor: pointer;
	display: none;

	&:hover {
		background: transparent;
	}

	@include tablet {
		display: block;
	}
}
.sidebar {	
	@include z-index(sidebar);
	flex-basis: var(--sidebar-width);
	min-width: var(--sidebar-width);
	background-color: var(--sidebar-color);
	color: rgba(255, 255, 255, 0.65);

	@include tablet {
		left: 0;
		right: 0;
		position: fixed;
		min-width: 0;
	}

	&__inner {
		height: 100vh;
		position: fixed;

		@include tablet {
			position: relative;
			height: auto;
			height: 56px;
		}
	}
}
</style>
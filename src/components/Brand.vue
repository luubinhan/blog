<template>
	<g-link v-once to="/" class="go-home">VuiLapTrinh.com</g-link>
</template>

<style lang="scss" scoped>
.go-home {
	display: block;
	width: 50px;
	padding-bottom: 20px;
	color: #fff;
	font-family: 'avo_bold', $san-serif;
	font-size: 1.1rem;

	@include tablet {
		padding-top: 12px;
		padding-left: 15px;
		width: 180px;
		padding-bottom: 0;
		color: #fff;
		font-family: 'avo_bold', $san-serif;
		img {
			display: block;
		}
	}
}
</style>

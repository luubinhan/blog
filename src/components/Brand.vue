<template>
	<g-link to="/" class="go-home">VuiLapTrinh.com</g-link>
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
		width: 34px;
		padding-bottom: 0;
		color: #fff;
		font-family: 'avo_bold', $san-serif;
		img {
			display: block;
		}
	}
}
</style>

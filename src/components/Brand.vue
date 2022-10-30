<template>
	<g-link v-once to="/" class="go-home">
		<span>
			<img src="../assets/images/logo-main.png" alt="vuilaptrinh" />
		</span>
	</g-link>
</template>

<script>
import Logo from '~/assets/images/logo-main.png';

export default {
	components: {
		Logo
	}
}
</script>


<style lang="scss" scoped>
.go-home {
	display: block;
	padding-bottom: 20px;
	color: #fff;
	font-family: 'avo_bold', $san-serif;
	font-size: 1.1rem;

	img {
		height: 80px;
	}

	@include tablet {
		padding-top: 12px;
		padding-left: 15px;
		width: 180px;
		padding-bottom: 0;
		color: #fff;
		font-family: 'avo_bold', $san-serif;
		img {
			height: 40px;
		}
	}
}
</style>

<template>
	<div id="footer" v-once>
		<footer class="footer">
			<section class="footer-inner">
				<div class="social-links">
					<a
						class="link-youtube"
						href="https://www.youtube.com/channel/UC0Te8s0b0aplS1ZoVLfjKHA"
						target="_blank"
						rel="noopener noreferrer"
						style="display: none;"
					>
						<span class="link-youtube__icon">
							<Youtube />
						</span>
						Youtube
					</a>
				</div>
				<div class="credit">Since 2016. luckyluu</div>
			</section>
		</footer>
	</div>
</template>

<script>
import Youtube from "~/assets/images/youtube.svg";

export default {
	components: {
		Youtube
	}	
}
</script>

<style lang="scss" scoped>
#footer {
	margin-top: auto;
	@include tablet {
		display: none;
	}
}
.footer {	
	width: auto;
    color: #f2f2f2;
	font-family: $monospace;
	line-height: 20px;
	font-size: $font-size-small;
	text-align: center;	

    .footer-inner {
		padding: 10px 0;
		a {
			color: #f2f2f2;
		}
		.link-youtube {
			display: inline-flex;
			color: $google;
			font-weight: bold;
			font-family: $san-serif;
			&__icon {
				flex-basis: 25px;
				min-width: 25px;
				margin-right: 10px;
			}
		}
	}
}
</style>

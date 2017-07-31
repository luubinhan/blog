// The key is to size the slides before starting CarouFredSel, and then refresh both the gallery and slide sizes on window resize. Pay attention to the height and responsive parameters when I init CarouFredSel too.
function sizeGallery(){

    // Set size of slides and gallery
    var winHeight = jQuery(window).height();
    var winWidth = jQuery(window).width();
    jQuery('.home-hero-slider, .home-hero-slider li').width(winWidth).height(winHeight);      

}

function startGallery() {
    
    if ( $('.home-hero-slider').length ) {		
		var duration = $('.home-hero-slider').data('duration');
		$('.home-hero-slider').carouFredSel({
			items: 1,
			responsive : true,			
			height: 'variable',
			next: $('.home-next-slide'),
			prev: $('.home-prev-slide'),
			pagination: $('.home-pagination'),			        
	        scroll : {
				items            : 1,
				fx: "crossfade",				
				duration        : duration,
				pauseOnHover    : true
	        },
	        items: {
	            visible: 1,
	            height: 'variable'
	        }
	    });
	
	}; // $('.home-hero-slider').length
}
jQuery(window).on("debouncedresize", function( event ) {
    //sizeGallery();  
    jQuery('.home-hero-slider').trigger('updateSizes');
});

jQuery(document).ready(function($) {

	//sizeGallery();
    startGallery();

    // Page loader
    $(".page-loader").delay(400).fadeOut("slow");

	//scroll to top
	$("a[href='#top']").click(function() {
	  $("html, body").animate({ scrollTop: 0 }, "slow");
	  return false;
	});

	//GALLERY
	if ( $('.section-gallery-detail').length ) {
		$(".section-gallery-detail").justifiedGallery({
			rowHeight: 400
		});	
	};

	//animate
	$(".intro-item").waypoint(function() {
		$(".intro-item").addClass('fadeInUp');
	}, { offset: '100%'});
	
	$(".staff-item").waypoint(function() {
		$(".staff-item").addClass('fadeInUp');
	}, { offset: '90%'});

	/*var docWidth = document.documentElement.offsetWidth;
	[].forEach.call(
	  document.querySelectorAll('*'),
	  function(el) {
	    if (el.offsetWidth > docWidth) {
	      console.log(el);
	    }
	  }
	);
	*/

});




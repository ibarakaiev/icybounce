$("video")[0].addEventListener("contextmenu", function (e) {
	e.preventDefault();
	e.stopPropagation();
}, false);

window.onload = function () {
	$("#loader").css("opacity", 0);
	setTimeout(function () {
		$("#loader").css("display", "none");
	}, 500);;
}

if ((localStorage.isDebug == "true") || (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf('Chrome') <= -1) ||
	((!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) || (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream))) {
	// put images (slides) to slideshow
	for (var i = 0; i < 7; ++i)
		$(".owl-carousel").append("<div style=\"background-image: url(assets/img/slides/$1.jpg)\"></div>".replace("$1",i));

	// enable slideshow
	$(".video").css("display", "none");
	$(".slideshow").css("display", "block");
	$(".owl-carousel").owlCarousel({
		loop: true,
		items: 1,
		nav: true,
		dots: true,
		autoplay: true,
		autoplaySpeed: 500,
		autoplayTimeout: 3500,
		autoplayHoverPause: true
	});
} else {
	$("video").html("<source src=\"assets/img/compressed.webm\" type=\"video/webm\">");
}
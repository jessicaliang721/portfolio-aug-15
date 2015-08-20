/* Sticky nav */

$('nav').sticky();

/* Back to top */

jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});

/* Contact form validation */

var inputs = document.getElementsByTagName("input");
var message = document.getElementById("message");

var validateForm = function() {

	for (var i = 0; i < inputs.length; i++) {
		console.log(inputs[i].value);
		//check if field is empty
		if (inputs[i].value === "" || inputs[i].value === null) {
			alert("Fields cannot be empty.");
			return false;
		}

		if (message.value === "" || message.value === null) {
		alert("Message field is empty.");
		return false;
		}
	}

}



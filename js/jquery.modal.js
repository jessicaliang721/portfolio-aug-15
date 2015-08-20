(function($){

	$.fn.modal = function(prop) {
		//default parameters

		var options = $.extend({
			height: "250",
			width: "500",
			title: "example modal",
			top: "20%",
			left: "30%",
		}, prop);

	return this.click(function(e) {
		add_block_page(); //block out screen to see only modal
		add_popup_box(); //create modal box HTML
		add_styles(); //style two new elements

		$(".modal").fadeIn(); //display the modal
	});

	return this;
	};
})(jQuery);
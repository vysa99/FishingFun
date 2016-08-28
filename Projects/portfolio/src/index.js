$(document).ready(function(){
	$('.nav-pills').on('click', 'li', function() {
		$(this).parent().find('li').removeClass('active');
		$(this).addClass('active');
	});

	// Add scrollspy to <body>
	$('body').scrollspy({target: ".navbar", offset: 120});

	// Add smooth scrolling on all links inside the navbar
	$("#my-navbar").on('click', 'a', function(event) {
	    // Make sure this.hash has a value before overriding default behavior
	    if (this.hash !== "") {
	      // Prevent default anchor click behavior
	      event.preventDefault();

	      // Store hash
	      var hash = this.hash;

	      // Using jQuery's animate() method to add smooth page scroll
	      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	      $('html, body').animate({
	        scrollTop: $(hash).offset().top - 70
	      }, 800, function(){
	   
	        // Add hash (#) to URL when done scrolling (default click behavior)
	        window.location.hash = hash;
	      });
	    }  // End if
	});
});
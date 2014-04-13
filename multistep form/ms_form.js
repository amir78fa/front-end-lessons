/* jQuery for multi-step form */

var current_fs, 
	next_fs, 
	previous_fs,
	left, 
	opacity, 
	scale, 
	animating = false; 

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	// activate next step on bar-progress
	$("#bar-progress li").eq($("fieldset").index(next_fs)).addClass("active");
	
	// Make next-fs visible
	next_fs.show(); 
	// Hide current-fs
	current_fs.animate({opacity: 0}, {
		step: function(current_opacity) {
			// Scaling down current_fs to 80%
			scale = 1 - (1 - current_opacity) * 0.2;
			// Bring next_fs from the right(50%)
			left = (current_opacity * 50)+"%";
			// Increase opacity of next_fs as it movs in
			opacity = 1 - current_opacity;

			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		easing: 'easeInOutBack' //plugin
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	// De-activate current step on bar-progress
	$("#bar-progress li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	// Make previous-fs visible
	previous_fs.show(); 
	// Hide current_fs
	current_fs.animate({opacity: 0}, {
		step: function(current_opacity) {
			// Scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - current_opacity) * 0.2;
			// Move current_fs to the right
			left = ((1 - current_opacity) * 50)+"%";
			// Increase opacity of previous_fs as it moves in
			opacity = 1 - current_opacity;

			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 1000, 
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		easing: 'easeInOutBack' // plugin
	});
});

$(".submit").click(function(){
	//blah blah blah...
	alert("Add something like this to your site =)");
	return false;
})

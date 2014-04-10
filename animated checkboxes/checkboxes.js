// JS file for animated checkboxes

//Add list item with text upon button click
$('#add_more').click(function() {

	//Text entered
	var newItemVal = $('#another').val();

	//Create the input element and label
	var input = $('<input type="checkbox">'). attr('id', newItemVal);
	var label = $("<label>").text(newItemVal).attr('for', newItemVal);

	//Insert input and label into a list item
	var listStyle = $("<li>").append(input); 
	listStyle.append(label);

	//append list item to List
	$('#checkboxes').append(listStyle);
	window.console&&console.log('Added: ' + newItemVal );

	//reset input field 
	$('#another').val("");

}); //-----end of click fn on add more --------------------

//Remove all checked list items
$('#remove_checked').click(function() {

	//current list
	$('#checkboxes li input').each(function(item) {
		if( $(this).is(':checked') ){
			var parentElem = $(this).parent();
			parentElem.remove();
		}
	});
	window.console&&console.log('In and out: removing items');

});//-----end of click fn on remove checked -------------------

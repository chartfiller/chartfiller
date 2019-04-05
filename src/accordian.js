$(document).ready(function() {
    $( "#accordion" ).accordion({
        active: false,
        collapsible: true
    });
    
    $("button").click(function(ev) {
	ev.preventDefault();
    });    
});

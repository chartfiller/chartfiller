$(document).ready(function() {
    $( "#accordion" ).accordion({
        active: false,
        collapsible: true
    });
    $( "button" )
    .button()
    .click(function( event ) {
        event.preventDefault();
    });
    
});
$('#home').live('pageshow', function(event, ui) {
	if (localStorage.getItem("LoggedIn") == "false") {
		$('#account').hide();
		$('#login').show();
		$('#logout').hide();
		HideMenu();
	}
	else {
		$('#account').show();
		$('#login').hide();
		$('#logout').show();
		ShowMenu();
	}     
});

function HideMenu() {
	if ($('#mybooks').length
		&& $('#addbooks').length && $('#agp').length && $('#register').length) {		
		$('#mybooks').hide();
		$('#addbooks').hide();
		$('#agp').hide();
		$('#register').show();
	}
}    
function ShowMenu() {
	if ($('#mybooks').length
		&& $('#addbooks').length && $('#agp').length && $('#register').length) {  		
		$('#mybooks').show();
		$('#addbooks').show();
		$('#agp').show();
		$('#register').hide();
	}
}
function GenrePageLoad() {
	if ($('#currentGenres').length) {		
		//$.mobile.loading('show', { theme: "b", text: "Loading..."});

		$.getJSON("http://apps.mfwd.net/PersonalLibrary/api/MobileGenres/alexwmoore@me.com/",
				  function(data) {
					  $('#currentGenres li').remove();					  
					  $.each($.parseJSON(data.Data)['Genres'], function(i, item) {
						  $('#currentGenres').append('<li class="listViewItem"><a class="listText">' + item.GenreName + '</a><a class="listDelete" id="genre'+ item.GenreId + '" href="#" data-icon="delete" data-role="button" data-mini="true" data-inline="true">&nbsp;</a></li>');
					  })
					  $('#currentGenres').trigger("create");
				  })
		//$.mobile.loading('hide');
	}    
}

$(document).delegate('[id^=genre]', 'click', function () { 
	var currentId = $(this).attr('id').replace("genre", "");
	$.ajax({
		type: "DELETE",
		url: "http://apps.mfwd.net/PersonalLibrary/api/MobileGenres/alexwmoore@me.com/" + currentId + "/",
		cache: false,                    
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",		
		data: "",
		success: function(result) {
			alert("Yay");
			GenrePageLoad();
		},                
		error:function (request, status, error) {
			alert(request.responseText);
		}
	});          
});
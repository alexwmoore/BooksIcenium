function AuthorPageLoad(){
    if ($('#currentAuthors').length) {
		//$.mobile.loading( 'show', { theme: "a", text: "Loading..."});
		$.getJSON(webServiceUrl + "MobileAuthors/" + foundEmailAddress + "/",
				  function(data) {
					  $('#currentAuthors li').remove();					  
					  $.each($.parseJSON(data.Data)['Authors'], function(i, item) {
						  $('#currentAuthors').append('<li class="listViewItem"><a href="#" class="listText">' + item.fullName + '</a><a class="listDelete" id="author' + item.AuthorId + '" href="#" data-icon="delete" data-role="button" data-mini="true" data-inline="true">&nbsp;</a></li>');                          
					  })
					  $('#currentAuthors').trigger("create");
				  })
		//$.mobile.loading('hide');
	}
    
}

$(document).delegate('[id^=author]', 'click', function () { 
	var currentId = $(this).attr('id').replace("author", "");
	$.ajax({
		type: "DELETE",
		url: webServiceUrl + "MobileAuthors/" + foundEmailAddress + "/" + currentId + "/",
		cache: false,                    
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",		
        data: "",
		success: function(result) {
			alert("Yay");
            AuthorPageLoad();
		},                
		error:function (request, status, error) {
			alert(request.responseText);
		}
	});          
});
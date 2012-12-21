$(document).delegate('[id^=publisher]', 'click', function () { 
	var currentId = $(this).attr('id').replace("publisher", "");
	$.ajax({
		type: "DELETE",
		url: "http://apps.mfwd.net/PersonalLibrary/api/MobilePublishers/alexwmoore@me.com/" + currentId + "/",
		cache: false,                    
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",		
		data: "",
		success: function(result) {
			alert("Yay");
			PageLoad();
		},                
		error:function (request, status, error) {
			alert(request.responseText);
		}
	});          
});

function PageLoad() {
	if ($('#currentPublishers').length) {
		
		$.getJSON("http://apps.mfwd.net/PersonalLibrary/api/MobilePublishers/alexwmoore@me.com/",
				  function(data) {
					  $('#currentPublishers li').remove();					  
					  $.each($.parseJSON(data.Data)['Publishers'], function(i, item) {
						  $('#currentPublishers').append('<li class="listViewItem"><a href="#" class="listText">' + item.PublisherName + '</a><a class="listDelete" id="publisher' + item.PublisherId + '" href="#" data-icon="delete" data-role="button" data-mini="true" data-inline="true">&nbsp;</a></li>');                             
					  })
					  $('#currentPublishers').trigger("create");
				  })		
	}    
}
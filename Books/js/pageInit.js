$(document).bind('pageinit', '#home', function () {        
    
	if (!("LoggedIn" in localStorage)) {
		localStorage.setItem("LoggedIn", "false");
	}
    
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
	
	if (!("Credentials" in localStorage)) {
		var credentials = { "emailAddress":"", "token":""};
		localStorage.setItem("Credentials", JSON.stringify(credentials));
	}        
    else
    {
        credentials = $.parseJSON(localStorage.getItem("Credentials"));
        foundEmailAddress = credentials.emailAddress
        foundToken = credentials.token;
    }
    
	$('#logout').click(function (e) {
		e.preventDefault()
		localStorage.setItem("LoggedIn", 'false');      
		location.reload();
	});
    
	HideFastAccess();
	
	if ("Credentials" in localStorage) {				
		credentials = $.parseJSON(localStorage.getItem("Credentials"));
		if (credentials.token == "") {
			HideFastAccess();
		}
		else {
			ShowFastAccess();
		}
	}       
    
	if ($('#fastAccessForm').length) {    
		$('#fastAccessForm').submit(function(e) {
			e.preventDefault();
			var mobilePin = $('#pinNumber').val();						
			var emailAddress = credentials.emailAddress;                                                       
			var token = credentials.token;
            
			var formData = new loginData(emailAddress, mobilePin, '', token);                                    
   
			$.ajax({
				type: "POST",
				url: "http://apps.mfwd.net/PersonalLibrary/api/Login",
				cache: false,                    
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				data: JSON.stringify(formData),
				success: function(result) {
					foundEmailAddress = emailAddress;
					OnLoginFast(result);
					$.mobile.changePage("index.html");
				},                
				error:function (request, status, error) {
					alert(request.responseText);
				}
			});       
		})
	}

	if ($('#slowAccessForm').length) {    
		$('#slowAccessForm').submit(function(e) {
			e.preventDefault();
			var emailAddress = $('#emailAddress').val();
			var password = $('#password').val();            						
			var token = credentials.token;
                                                          
			var formData = new loginData(emailAddress, '', password, token);                                    			
			$.ajax({
				type: "POST",
				url: "http://apps.mfwd.net/PersonalLibrary/api/Login",
				cache: false,    
				crossDomain: true,                
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				data:'=' + JSON.stringify(formData),
				success: function(result) {
					foundEmailAddress = emailAddress;
					OnLoginSlow(result);
					$.mobile.changePage("index.html");
				},                
				error:function (request, status, error) {
					alert(request.responseText);
				}
			});
		
		})
	}	
    
	//addNewBook.js
	newBookPageLoad();
	if ($('#createBook').length) {    
		$('#createBook').submit(function(e) {
			e.preventDefault();
			var title = $('#title').val();
			var isbn = $('#isbn').val();
			var publicationDate = $('#publicationDate').val();
			var edition = $('#edition').val();
			var description = $('#description').val();
			var isSchoolText = $('#isSchoolText').val();
			var userName = foundEmailAddress;
			var formData = new newBookData(title, isbn, publicationDate, edition, description, isSchoolText, userName);
   
			$.ajax({
				type: "POST",
				url: "http://apps.mfwd.net/PersonalLibrary/api/Book",
				cache: false,                    
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				data: "=" + JSON.stringify(formData),
				success: function(result) {
					alert("Book Was Added"); 
					$.mobile.changePage("SelectAuthors.html");
				},                
				error:function (request, status, error) {
					alert(request.responseText);
				}
			});       
		})
	}
    
    //Account
    accountPageLoad(foundToken);
    
	//myBookInitials.js
	var j = 0;
	var y = 0;
	if ($('#bookList').length) {
		$.mobile.showPageLoadingMsg();
		$.getJSON("http://apps.mfwd.net/PersonalLibrary/api/Initials/?userName=" + foundEmailAddress,
				  function(data) {
					  $('#bookList li').remove();					  
					  $.each($.parseJSON(data.Data)['Initials'], function(i, item) {
						  if (j < 4) {
							  if (j == 0) {
								  $('#bookList').append('<div id="' + y + '" data-type="horizontal" data-role="controlgroup">');
							  }
							  $('#' + y).append('<a href="#" data-role="button" id="clickLink' + item + '" value="' + item + '" data-theme="a">' + item + '</a>');
							  j = j + 1;
						  }
						  else {
							  $('#' + y).append('<a href="#" data-role="button" id="clickLink' + item + '" value="' + item + '" data-theme="a">' + item + '</a>');
							  $('#bookList').append('</div>');                                
							  j = 0;
							  y = y + 1;							  
						  }
					  })
					  $('#bookList').trigger("create");              
				  })        
		$.mobile.hidePageLoadingMsg();
	}
    
	///ManageAuthors
	AuthorPageLoad();
	if ($('#createAuthor').length) {    
		$('#createAuthor').submit(function(e) {
			e.preventDefault();
			var newFirstName = $('#firstName').val();
			var newMiddleName = $('#middleName').val();
			var newLastName = $('#lastName').val();
			var formData = new authorData(newFirstName, newMiddleName, newLastName, foundEmailAddress);                                    
   
			$.ajax({
				type: "POST",
				url: "http://apps.mfwd.net/PersonalLibrary/api/MobileAuthors",
				cache: false,                    
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				data: "=" + JSON.stringify(formData),
				success: function(result) {
					alert("Author Was Added"); 
					AuthorPageLoad();
				},                
				error:function (request, status, error) {
					alert(request.responseText);
				}
			});       
		})
	} 
    
    
    //Manage Genres
    GenrePageLoad();
	if ($('#createGenre').length) {    
		$('#createGenre').submit(function(e) {
			e.preventDefault();
			var newGenre = $('#genreName').val();									
			var formData = new genreData(newGenre, foundEmailAddress);                                    
   
			$.ajax({
				type: "POST",
				url: "http://apps.mfwd.net/PersonalLibrary/api/MobileGenres",
				cache: false,                    
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				data: "=" + JSON.stringify(formData),
				success: function(result) {
					alert("Genre Was Added"); 
					GenrePageLoad();
				},                
				error:function (request, status, error) {
					alert(request.responseText);
				}
			});       
		})
	} 
    
    //Manage Publishers
    PageLoad();    
	if ($('#createPublishers').length) {    
		$('#createPublishers').submit(function(e) {
			e.preventDefault();
			var newPublisher = $('#publisherName').val();									
			var formData = new publisherData(newPublisher, foundEmailAddress);                                    
   
			$.ajax({
				type: "POST",
				url: "http://apps.mfwd.net/PersonalLibrary/api/MobilePublishers",
				cache: false,                    
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				data: "=" + JSON.stringify(formData),
				success: function(result) {
					alert("Publisher Was Added"); 
                    PageLoad();
				},                
				error:function (request, status, error) {
					alert(request.responseText);
				}
			});       
		})
	}  
    
    //Register
    if ($('#registerForm').length) {    
		$('#registerForm').submit(function() {
            
			var passwordValue = $('#password').val();
			var confirmPasswordValue = $('#confirmPassword').val();

            var sendUserName = $('#emailAddress').val();
			var sendFirstName = $('#firstName').val();
			var sendLastName = $('#lastName').val();
			var sendNickName = $('#nickName').val();                        
            
            var formData = new registrationData(sendFirstName, sendLastName, sendNickName, sendUserName, passwordValue);
            var test = JSON.stringify(formData);
            alert(test);
            
            
			if (confirmPasswordValue != passwordValue) {
				var errorMessage = 'Password and Confirm Password Must Match';
				$('#errorMessage').text(errorMessage);
				return false;
			}
			else {
                //This will eventually need to be https: but for now this will work.  
                $.ajax({
                    type: "POST",
                    url: "http://apps.mfwd.net/PersonalLibrary/api/Register",
                    cache: false,                    
                    dataType: "json",
                    contentType: "json",
                    data: JSON.stringify(formData),                    
                    error: onError()
                });             				
			}            
		})
	}
    
    //Registration Confirmation
    if ($('#registerConfirmationForm').length) {    
		$('#registerConfirmationForm').submit(function() {
            
			var mobilePin = $('#mobilePin').val();
			var sendEmailAddress = "";   
            
			var formData = new registrationData(sendEmailAddress, mobilePin);                                    
   
			$.ajax({
				type: "POST",
				url: "http://apps.mfwd.net/PersonalLibrary/api/Register",
				cache: false,                    
				dataType: "json",
				contentType: "json",
				data: JSON.stringify(formData),                    
				error: onError()
			});             							
		})
	}
    
    //Update PIN
    if ($('#updatePINForm').length) {    
		$('#updatePINForm').submit(function() {
            
   
            var oldMobilePin = $('#oldMobilePin').val();
			var newMobilePin = $('#newMobilePin').val();
            var newMobilePinConfirm = $('#newMobilePinConfirm').val();
			var sendEmailAddress = foundEmailAddress;                                                       
            var token = foundToken;
                                                          
            if (newMobilePin == newMobilePinConfirm)
            {
			    var formData = new pinUpdateData(sendEmailAddress, newMobilePin, oldMobilePin, token);                                    
   
			    $.ajax({
			    	type: "POST",
			    	url: "http://apps.mfwd.net/PersonalLibrary/api/MobilePin",
    				cache: false,                    
				    dataType: "json",
    				contentType: "json",
				    data: JSON.stringify(formData),                    
    				error: onError()
			    });       
            }
            else
            {
                $('#errorMessage').html('New Pin and New Pin Confirm Do Not Match');
            }
		})
	}
    
    //Book Details
	if ($('#BookName').length) {		
		$.mobile.showPageLoadingMsg();
		$.getJSON("http://apps.mfwd.net/PersonalLibrary/api/Book?id=" + bookName + "&userName=" + foundEmailAddress, 
				  function (data) {
					  var singleBook = $.parseJSON(data.Data)['singleBook'];                                                
					  $('#BookName').text(singleBook.Title);
					  $('#bookAuthor').text(singleBook.Authors);
					  $('#bookPublisher').text(singleBook.Publishers);
					  $('#bookGenre').text(singleBook.Genres);
					  $('#bookISBN').text(singleBook.ISBN);
                      
					  var fullDate = new Date(singleBook.PublicationDate);
					  
					  var twoDigitMonth = fullDate.getMonth() + "";
					  if (twoDigitMonth.length == 1)
						  twoDigitMonth = "0" + twoDigitMonth;
					  var twoDigitDate = fullDate.getDate() + "";
					  if (twoDigitDate.length == 1)
						  twoDigitDate = "0" + twoDigitDate;
					  var currentDate = twoDigitMonth + "/" + twoDigitDate + "/" + fullDate.getFullYear();
					  
					  $('#bookPublicationDate').text(currentDate);
                      
                      
					  if (singleBook.Edition != null) {
						  $('#bookEdition').text(singleBook.Edition);
					  }
					  else {
						  $('#bookEdition').text(" ");
					  }
                
					  $('#bookDescription').text(singleBook.Description);
                
					  if ($('#isSchoolTextBook').length) {
						  $('#isSchoolTextBook').checkboxradio('disable');
					  }
					  $('#isSchoolTextBook').attr("checked", singleBook.SchoolText).checkboxradio("refresh");
                
				  })
		$.mobile.hidePageLoadingMsg();
	}

    //Book List
    if ($('#initialValue').length) {
		$('#initialDisplay').text(bookInitial);	
		$.getJSON("http://apps.mfwd.net/PersonalLibrary/api/Initials/?id=" + bookInitial + "&userName=" + foundEmailAddress,
				  function(data) {
					  $('#initialValue li').remove();					  
					  $.each($.parseJSON(data.Data)['ApiBooksModel'], function(i, item) {						  
						  $('#initialValue').append('<li><a href="#" data-role="button" id="clickBook' + item.Title + '" value="' + item.Title + '" data-theme="a">' + item.Title + '</a></li>');
					  })
                      $('#initialValue').trigger("create");
				  })						
	}
});
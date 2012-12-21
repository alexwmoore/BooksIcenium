function HideFastAccess() {
	$('#fastAccessForm').hide();
	$('#slowAccessForm').show();
}    
function ShowFastAccess() {
	$('#fastAccessForm').show();
	$('#slowAccessForm').hide();
}

//on submit must look if ok, then take returned token value set to member and loggedin=true;
function OnLoginSlow(returnData){
    var credentials = $.parseJSON(localStorage.getItem("Credentials"));
    credentials.token = "";
    credentials.emailAddress = foundEmailAddress;
    localStorage.setItem("Credentials", JSON.stringify(credentials));
    localStorage.setItem("LoggedIn", 'true');
}

function OnLoginFast(returnData){
    var credentials = $.parseJSON(localStorage.getItem("Credentials"));
    credentials.token = returnData;
    credentials.emailAddress = foundEmailAddress;
    localStorage.setItem("Credentials", JSON.stringify(credentials));
    localStorage.setItem("LoggedIn", 'true');
}
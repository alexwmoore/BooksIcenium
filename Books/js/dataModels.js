function loginData(emailAddress, mobilePin, password, token) {
	this.emailAddress = emailAddress;
	this.mobilePin = mobilePin;    
	this.password = password;
	this.token = token;
}

function newBookData(title, isbn, publicationDate, edition, description, isSchoolText, userName) {
	this.title = title;
	this.isbn = isbn;
	this.publicationDate = publicationDate;
	this.edition = edition;
	this.description = description;
	this.isSchoolText = isSchoolText;
    this.userName = userName;
} 

function authorData(firstName, middleName, lastName, userName) {
	this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.userName = userName;	
}

function genreData(genreName, userName) {
	this.genreName = genreName;
	this.userName = userName;	
}

function publisherData(publisherName, userName) {
	this.publisherName = publisherName;
    this.userName = userName;	
}

function registrationData(firstName, lastName, nickName, emailAddress, passwordValue)
{
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;
    this.emailAddress = emailAddress;
    this.passwordValue = passwordValue;
}

function pinData(emailAddress, mobilePin) {
	this.emailAddress = emailAddress;
	this.mobilePin = mobilePin;    
}

function pinUpdateData(emailAddress, mobilePin, oldMobilePin, token) {
	this.emailAddress = emailAddress;
	this.mobilePin = mobilePin;    
    this.oldMobilePin = oldMobilePin;
    this.token = token;
}
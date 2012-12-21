//http://www.shayanderson.com/javascript/jquery-wildcard-in-selector-id.htm
//http://stackoverflow.com/questions/9067259/jquery-mobile-click-firing-multiple-times-on-new-page-visit
$(document).delegate('[id^=clickBook]', 'click', function () {
   bookName = $(this).text();
	$.mobile.changePage("MyBookDetails.html", {data : { bookInitial : $(this).text()}});
});
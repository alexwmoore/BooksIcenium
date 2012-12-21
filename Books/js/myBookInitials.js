//http://www.shayanderson.com/javascript/jquery-wildcard-in-selector-id.htm
//http://stackoverflow.com/questions/9067259/jquery-mobile-click-firing-multiple-times-on-new-page-visit
$(document).delegate('[id^=clickLink]', 'click', function () {
   bookInitial = $(this).text();
	$.mobile.changePage("MyBooksByInitial.html?bookInitial=" + $(this).text(), {data : { bookInitial : $(this).text()}});
});
$(function (){
	$.expr[':'].external = function(obj){
		return !obj.href.match(/^mailto:/) && !obj.href.match(/^#:/) && (obj.hostname.replace(/^www\./i, '') != document.location.hostname.replace(/^www\./i, ''));
	};

	$("a:external").on("click keypress", function (e) {
		var eventLabel = $(this).attr("href");
		_gaq.push(['_trackEvent', 'Link', 'Outbound', eventLabel, null, true]);
	});
	$('a[href^="mailto:"]').on("click keypress", function (e) {
		var eventLabel = $(this).attr("href").substring(7);
		_gaq.push(['_trackEvent', 'Link', 'Email', eventLabel]);
	});
	$('a[href^="tel:"]').on("click keypress", function (e) {
		var eventLabel = $(this).attr("href").substring(4);
		_gaq.push(['_trackEvent', 'Link', 'Telephone', eventLabel]);
	});
	$("a[href^=#]").on("click keypress", function (e) {
		var eventLabel = $(this).attr("href").substr(1);
		_gaq.push(['_trackEvent', 'Link', 'Target', eventLabel]);
	});
	$(window).hashchange(function(){
		var pageName = location.hash.substr(1);
		_gaq.push(['_set','page','/' + pageName]);
		_gaq.push(['_trackPageview']);
	});
});
function fitHeader() {
	if($("header h1").offset().left/document.width > .20){
		$("header h1").css("padding",0).css("padding-top", ($("#logo").height()*1.05 + $("#logo").offset().top - $("header h1").height()) );
	}else{
		$("header h1").css("padding","");
	}
}
function windowSizers () {
	$("section").each(function (index) {
		$(this).css({
			"min-height" : $(window).height()
		});
		var offsets = $(this).offset();
		section[index] = {};
		section[index].min = offsets.top;
		section[index].max = offsets.top + $(this).height();
		switch($(this).attr("id")){
			case "primary":
				section[index].id = "";
				break;
			default:
				section[index].id = $(this).attr("id");
				break;
		}
	});
	$("#px-down").text(Math.round($("#about").offset().top - $("#px-down").offset().top));
}
section = [];
$(function () {
	$("header h1").fitText(.55,{},fitHeader);
	$("#random-fact").html( facts[Math.floor(Math.random()*facts.length)] );
	$(":not(header) > h1").fitText(.50, {"maxFontSize" : 96});
	windowSizers();
	$(window).on("resize", function () { windowSizers(); });
	window.setTimeout(fitHeader, 100);
	$("a[href^=#]").anchorjump();

	$(window).scroll(function () {
		for (var i = section.length - 1; i >= 0; i--) {
			if($(window).scrollTop() > section[i].min && $(window).scrollTop() < section[i].max){
				if(document.location.hash != "#" + section[i].id && document.location.hash != section[i].id){

					if(section[i].id){
						var hash = "#" + section[i].id;
					}else{
						var hash = "";
					}
					if(history.replaceState){
						history.pushState('', document.title, window.location.pathname + hash);
						$(window).hashchange();
					}else{
						if(section[i].id){
							var $currentSection = $(hash);
							$currentSection.attr("id","");
							document.location.hash = hash;
							$currentSection.attr("id",section[i].id);
						}else{
							var currentScrollTop = $(window).scrollTop();
							document.location.hash = "";
							$(window).scrollTop(currentScrollTop);
						}
					}
				}
			}
		};
	});

	// CHECKS
	
	// FONT CHECKS
	$('<div id="fontchecks">').css("visibility","hidden").appendTo("body");
	var check = "<span>i1lo0 abcdefghijklmnopqrstuvwxyz</span>";
	// HELVETICA
	var $helvetica = $(check).css("font-family","'Helvetica Neue', 'Courier New', 'Courier', monospace").appendTo("#fontchecks");
	var $test = $(check).css("font-family","'Courier New', 'Courier', monospace").appendTo("#fontchecks");
	if($test.width() == $helvetica.width() && Modernizr.fontface == true){
		$('<link rel="stylesheet" type="text/css">').appendTo("head").attr("href","//fonts.googleapis.com/css?family=Raleway:400,200,500");
		$('body').addClass("no-helvetica");
	}
	// FONT WEIGHT (Progressive Enhancement)
	$('#fontchecks').html("");
	var $semi = $(check).css("font-weight","500").appendTo("#fontchecks");
	var $bold = $(check).css("font-weight","bold").appendTo("#fontchecks");
	var $normal = $(check).css("font-weight","normal").appendTo("#fontchecks");
	if($semi.width() != $bold.width() && $semi.width() != $normal.width()){
		$('body').addClass("has-semibold");
	}
	$('#fontchecks').remove();

	// SVG CHECK
	if(Modernizr.svg == false){
		$("object[type='image/svg+xml']").each(function () {
			var $replacement = $("<img />").insertAfter($(this));
			var copy = ["id","class","style"];
			for (var i = copy.length - 1; i >= 0; i--) {
				$replacement.attr( copy[i], $(this).attr(copy[i]) );
			};
			$replacement.attr("src", $(this).attr("fallback") );
			$(this).remove();
		});
	}

	$("body").addClass("styled");
});
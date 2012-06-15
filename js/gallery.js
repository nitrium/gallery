(function() {
	
	var html_content = "";
	
	$(window).load(function()
	{

		$.ajax({
			url: "xml/gallery.xml",
			context: document.body,
			dataType: "xml",
			success: function(xml)
			{
				$('group',xml).each(function(i, e)
				{
					
					// starts html content for this slide (each image defines one slide)
					html_content += "<div class='slide'>";
					
					html_content += "<img src='" + $(this).attr('filename') + "' />";
					
					// loop through captions inside this slide
					$('dialog', this).each(function (i, e)
					{
						var _box_coord = $(this).find('box').text().split(','); // box coordinates
						var _arrow_coord = $(this).find('arrow').text().split(','); // arrow coordinates
						var _arrow_dir = $(this).find('arrow').attr('direction');
						
						html_content += "<div class='caption'><div class='arrow " + _arrow_dir + "' style='top: " + _arrow_coord[0] + "px; left: " + _arrow_coord[1] + "px;'></div><div class='box' style='top: " + _box_coord[0] + "px; left: " + _box_coord[1] + "px; width: " + $(this).find('box').attr('width') + "px'>" + $(this).find('text').text() + "</div></div>";
					});
					
					// ends slide
					html_content += "</div>";
					
				});
				
				
				
				// writes content on the main page
				$('.gallery-container').append(html_content);
				
				// special code for IE7/8
				if ($.browser.msie)
				{
					if (parseInt($.browser.version, 10) <= 8)
					{
						$(function()
						{
							settings = {
									tl: {radius: 10},
									tr: {radius: 10},
									bl: {radius: 10},
									br: {radius: 10},
									antiAlias: true,
									autoPad: true,
									validTags: ["div"]
								}
							$('.box').corner(settings);
						});
					}
				}
				
				$('#gallery_wrapper').slides(
				{
					preload: true,
					preloadImage: 'img/gallery_loading.gif',
					container: 'gallery-container',
					play: 8000,
					pause: 3500,
					generatePagination: false,
					hoverPause: true,
					animationStart: function(current) {
						
						$('.caption').animate({
							bottom: -305
						}, 250);
					},
					animationComplete: function(current) {
						$('.caption').animate({
							bottom: 0
						}, 500);
					},
					slidesLoaded: function() {
						$('.caption').animate({
							bottom: 0
						}, 500);
					}
				});
				
				
			}
		});
		
	});
	
}());
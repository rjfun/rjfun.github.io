
var platforms_img = {
	ios : 'img/logo_ios.png',
	android : 'img/logo_android.png',
	win : 'img/logo_windows.png'
};

var selected_plugins = {};

function list_plugin( div, products, cat, platform ) {
	var html = "";
	for(var i in products) {
		var product = products[i];
		if(! product.onsale) continue;
		if(typeof cat === 'string' && cat !== "all" && cat !== product.cat) continue;
		//if(typeof platform === 'string' && plugins[platform] !== true) continue;
		html += "<div class='plugin_item'>";
		html += "<h3 class='block_title'>" + product.name + " <span class='price'>" + ((product.price > 0) ? ("$" + product.price) : "FREE") + "</span></h3>";
		html += "<p class=''>" + product.intro + " <a target='_blank' href='" + product.github_url + "'>&nbsp; read more ... &nbsp;</a></p>";
		if(product.price > 0) {
			html += "<div class='plugin_links'><a class='buy_now' target='_blank' href='" + product.paypal_url + "'>Buy Now</a></div>";
		} else {
			html += "<div class='plugin_links'><a class='buy_now' target='_blank' href='" + product.github_url + "'>Download</a></div>";
		}
		for(var j in platforms_img) {
			if(product[j] === true) {
				html += " <img src='" + platforms_img[j] + "' class='tiny_logo'/> ";
			}
		}
		html += "</div>";
	}
	$("div#" + div).html( html );
}

function initUiEvents() {
	$('a.page_nav').on('click', function(e){
		$('a.page_nav').removeClass('active');
		$(this).addClass('active');
		
		var page = $(this).attr('page');
		$('div.page').hide();
		$('div#' + page).show();
		
		if(page === 'plugin_page') {
			var id = $(this).attr('id');
			if(id === 'cordova') selected_plugins = cordova_plugins;
			else if(id === 'coco2dx') select_plugins = cocos2dx_plugins;
			else if(id === 'unity') selected_plugins = unity_plugins;
			else selected_plugins = {};
			
			$('a.plugin_cat').removeClass('active');
			list_plugin('plugin_list', selected_plugins, "all");
		}
	});
	
	$('a.plugin_cat').on('click', function(e){
		$('a.plugin_cat').removeClass('active');
		$(this).addClass('active');
		
		var cat = $(this).attr('cat');
		list_plugin('plugin_list', selected_plugins, cat);
	});
}

function main() {
	initUiEvents();
}

$(document).ready(main);

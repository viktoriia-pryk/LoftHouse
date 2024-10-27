
const linksBtnsSelector = 'a[data-youtubeLightbox]';

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null; 

var youtubelightbox = document.getElementById('youtubelightbox');
var player; 


youtubelightbox.addEventListener(
	'click',
	function () {
		this.style.display = 'none';
		player.stopVideo();
	},
	false
);


youtubelightbox
	.querySelector('.youtubelightbox__centeredchild')
	.addEventListener(
		'click',
		function (e) {
			e.stopPropagation();
		},
		false
	);


function onYouTubeIframeAPIReady() {
	createlightbox();
}

function getyoutubeid(link) {
	
	var youtubeidreg =
		/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
	return youtubeidreg.exec(link)[1]; 
}

// Creates a new YT.Player() instance
function createyoutubeplayer(videourl) {
	player = new YT.Player('youtubelightboxPlayer', {
		videoId: videourl,
		playerVars: { autoplay: 1 },
	});
}


function createlightbox() {
	var targetlinks = document.querySelectorAll(linksBtnsSelector);

	for (var i = 0; i < targetlinks.length; i++) {
		var link = targetlinks[i];
		link._videoid = getyoutubeid(link);
		targetlinks[i].addEventListener(
			'click',
			function (e) {
				youtubelightbox.style.display = 'block';
				if (typeof player == 'undefined') {
			
					createyoutubeplayer(this._videoid);
				} else {
					if (isiOS) {
				
						player.cueVideoById(this._videoid);
					} else {
						player.loadVideoById(this._videoid);
					}
				}
				e.preventDefault();
			},
			false
		);
	}
}

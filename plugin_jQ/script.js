jQuery.fn.extend({

	slider: function() {
		var btnPrev = this.find('.buttons .prev');
		var btnNext = this.find('.buttons .next');
		var images = this.find('.photos img');
		var i = 0;

		btnPrev.on('click', function () {
			images[i].className = '';
			i--;
			if (i < 0) {
				i = images.length - 1;
			}
			$(images[i]).addClass('showed');
		});
		btnNext.on('click', function () {
			images[i].className = '';
			i++;
			if (i >= images.length) {
				i = 0;
			}
			$(images[i]).addClass('showed');
		});
		return this;
	}

});

$('.gallery').slider().css('border', '2px solid red');
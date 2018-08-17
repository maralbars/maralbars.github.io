$(function() {


	$(".questions").html(
		$(".questions").children("li").sort(function (a, b) {
			return $(a).text().toUpperCase().localeCompare(
				$(b).text().toUpperCase());
		})
		);

	$(".questions a").animatedModal({
		color: '#4e4e4e',
		animatedIn: 'fadeInRight',
		animatedOut: 'fadeOutLeft'
	});

	$(document).on('click', '.questions a', function(e){
		var answer = '#answer-' + $(this).data('question');
		$('.answers').hide();
		$(answer).show();
	});

	$(document).on('click', '.questions button.del', function(e){
		$(this).closest('li').remove();
		if ( $('.questions button.del').length < 4 )
			$('.questions button.del').hide();
	});

	$(document).on('click', '.questions button.good', function(e){
		$(this).closest('li').addClass('success').find('button.del').remove();
		if ( $('.questions .success').length > 3 ){
			$('.questions button.del').closest('li').each(function(i, item){
				if ( !$(item).hasClass('success') ) {
					$(item).hide();
				}
			});
		}
	});


});

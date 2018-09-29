// $(function() {

	var game_audio = {
		intro: new Audio('../music/intro.mp3'),
		hover_btn: new Audio('../music/click3.wav')
	}



	var Game = {
		init: function(){
			shadows.on();
			game_audio.intro.play();
			this.intro();
			shadows.off();
			Game.sound.init();
		},
		intro: function(target){
			var next_step,
				game = this,
				target = game.state.check();
			$('section.intro').addClass('active');
			next_step = ( target === 'level1' ) ? target : 'select_level';
			$(document).on('click', '#start-game', function(){
				shadows.on_revert();
				game[next_step].init(target);
				$(game.cut.selector).show();
				shadows.off_revert(function(){
					$(game[next_step].selector).show();
					$('section.intro').removeClass('active');
				});
			});
			$('#start-game, .sound, .shover').on('mouseenter', function(){
				game_audio.hover_btn.play();
			});
		},
		level1: {
			selector: 'section.level-1',
			init: function(){
				console.log('level 1 inited');
				// Пошел за кофе
				$(document).on('click', '.coffee, .want-coffee, .standart-pass, .banya, .whos, .danu', function(){
					shadows.on_revert();
					$('.cut-scene .win').hide();
					$('.cut-scene .lose').show();
					setTimeout(cut_scene.level.one.fail, 1500);
				});
				// Нажал открыть
				$(document).on('click', '.closed-laptop button, .closed-laptop img', function(){
					$('.closed-laptop').hide();
					$('.laptop-open').show();
				});
				$(document).on('click', '.settings', function(){
					if ( !$(this).hasClass('disabled') ) {
						$('.folder, .settings').addClass('disabled');
						$('.password').show();
						$('.want-coffee').hide();
					}
				});
				$(document).on('click', 'button.cancel-pass, .pass-close', function(){
					$('.folder, .settings').removeClass('disabled');
					$('.password').hide();
					$('.want-coffee').show();
				});
				$(document).on('input','input[type="password"]', function(){
					var password = $(this).val();
					console.log(password.length);
					if ( password.length > 8 ) {
						$('button.save-pass').prop('disabled', false);
					} else {
						$('button.save-pass').prop('disabled', true);
					}
				});
				$(document).on('click', '.folder', function(){
					if ( !$(this).hasClass('disabled') ) {
						$('.folder, .settings').addClass('disabled');
						$('.folder-opened').show();
						$('.want-coffee').hide();
					}
				});
				$(document).on('click', '.folder-close', function(){
					$('.folder, .settings').removeClass('disabled');
					$('.folder-opened, .danu').hide();
					$('.want-coffee').show();
				});
				$(document).on('click', '.photos', function(){
					$('.coffee').hide();
					$('.want-coffee').hide();
					// $('.folder-close').hide();
					$('.whos').show();
					setTimeout(function(){
						$('.danu').show();
					}, 1200);
				});

				$(document).on('click', '.save-pass', function(){
					shadows.on_revert();
					$('.cut-scene .win').show();
					$('.cut-scene .lose').hide();
					setTimeout(cut_scene.level.one.fail, 1500);
				});

			}
		},
		cut: {
			init: function(){

			},
			selector: ''
		},
		level2: {
			init: function(){
				console.log('level 2 inited');
			}
		},
		select_level: {
			init: function() {
				console.log('Level select inited');
			}
		},
		state: {
			current: '',
			check: function(){
				var temp = '';
				this.current = getCookie('game_state') || 'level1';
				this.save(this.current);
				return this.current;
			},
			save: function(level){
				setCookie('game_state', level, {
					expires: 31104000
				});
			},
			clear: function(){
				deleteCookie('game_state');
			}
		},
		sound: {
			on: function(){
				for ( sound in game_audio ) {
					game_audio[sound].volume = 1;
					$('.sound').removeClass('mute');
					// var timer = setInterval(function(){
					// 	if (game_audio[sound].volume != 1){
					// 		game_audio[sound].volume = game_audio[sound].volume + 0.05
					// 	} else {
					// 		clearInterval(timer);
					// 	}
					// }, 50)
				}
			},
			off: function(){
				$('.sound').addClass('mute');
				for ( sound in game_audio ) {
					game_audio[sound].volume = 0;
				}
			},
			init: function(){
				if (typeof getCookie('game_sound') == 'undefined') {
					setCookie('game_sound', true, { expires: 31104000 });
				}
				if ( getCookie('game_sound') == 'true' ) {
					console.log('sound On');
					this.on();
				} else {
					console.log('sound Off');
					this.off();
				}
			}
		}
	}

	Game.init();
	$(document).on('click', '.sound', function(){
		var volume = ( getCookie('game_sound') == 'true' ) ? false : true;
		setCookie('game_sound', volume, { expires: 31104000 });
		Game.sound.init();
	});

	$(document).on('click', '.repeat', function(){
		location.reload();
	});

	var cut_scene = {
		level: {
			one: {
				fail: function(){
					$('body').addClass('noscroll');
					$('.cut-scene').show();
					shadows.on_revert();
				}
			}
		}
	}



// });



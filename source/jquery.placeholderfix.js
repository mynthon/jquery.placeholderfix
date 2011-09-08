(function($){
		$.fn.placeholderFix = function(opts){
			var options = $.extend({
					'wrapperCSS': {},
					'inputCSS': {},
					'labelCSS': {},
					'spanCSS': {},
					'force': false,
					'content' : '',
					'attr':'placeholder',
					'nl':true
				}, opts);
			var t = document.createElement('input');
			var getDefaultCSS = function($input){
				var right_scrollbar = $input.width() - $input.get(0).clientWidth;
				var top_pad = parseInt($input.css('padding-top')) + parseInt($input.css('border-top-width'));
				var right_pad = parseInt($input.css('padding-right')) + parseInt($input.css('border-right-width')) + right_scrollbar;
				var bottom_pad = parseInt($input.css('padding-bottom')) + parseInt($input.css('border-bottom-width'));
				var left_pad = parseInt($input.css('padding-left')) + parseInt($input.css('border-left-width'));
				
				var extLabel = {}
				var extSpan = {}
				
				if($input.get(0).tagName == 'INPUT' && $input.attr('type') == 'text'){
					extLabel = {
						'line-height': $input.height() + 'px'
					}
					extSpan = {
						'line-height': 'inherit'
					}
				}else if($input.get(0).tagName == 'TEXTAREA'){
					extLabel = {
						'line-height': $input.css('line-height')
					}
				}
				
				return {
					'wrapper': $.extend({
						'height':$input.outerHeight() + 'px',
						'width':$input.outerWidth() + 'px',
						'position':$input.css('position') == 'static' ? 'relative' : $input.css('position'),
						'top':$input.css('top'),
						'left':$input.css('left'),
						'float':$input.css('float'),
						'clear':$input.css('clear'),
						'padding':'0',
						'margin':$input.css('margin-top') + ' ' + $input.css('margin-right') + ' ' + $input.css('margin-bottom') + ' ' + $input.css('margin-left'),
						'display':$input.css('display') == 'inline' ? 'inline-block' : $input.css('display'),
						'background':'none',
						'border':'0'
					}, options.wrapperCSS),
					'label':$.extend({
						'width':($input.width() - right_scrollbar) + 'px',
						'height':$input.height() + 'px',
						'padding-top':top_pad,
						'padding-right':right_pad,
						'padding-bottom':bottom_pad,
						'padding-left':left_pad,
						'position':'absolute',
						'top':0,
						'left':0,
						'margin':0,
						'float':'none',
						'clear':'none',
						'background':'none',
						'border':0,
						'z-index':10
					}, extLabel, options.labelCSS),
					'input':$.extend({
						'position':'absolute',
						'top':0,
						'left':0,
						'margin':0,
						'z-index':1
					}, options.wrapperCSS),
					'span':$.extend({
						'color':'#999',
						'font-size': $input.css('font-size'),
						'font-weight': $input.css('font-weight'),
						'font-family': $input.css('font-family'),
						'text-align': $input.css('text-align'),
						'margin':0,
						'padding':0,
						'width': 'auto',
						'height':'auto'
					}, extSpan, options.spanCSS)
				}
			}
						
			if (undefined == t.placeholder || options.force){
				var i = 0;
				this.each(function(){
					i+=1;
					
					var $this = $(this)
					var id = $this.attr('id') || 'placeholder_fix_' + i + '_' + (+new Date());
					var content = options.content !== '' ? options.content : $this.attr(options.attr) || 'Placeholder';
					content = options.nl ? content.replace(/\t\t/g, '<br />') : content
					var label = $('<label style="vertical-align:middle;" for="' + id + '"></label>');
					var span = $('<span>' + content + '</span>');
					var wrapper;
					var defaultCSS;
					
					$this.wrap('<div id="wrapper_for_' + id + '" class="placeholderfix_wrapper"></div>');
					wrapper = $('div#wrapper_for_' + id)
					label.append(span);
					wrapper.append(label);
					$this.removeAttr(options.attr)
					$this.attr('id', id);

					defaultCSS = getDefaultCSS($this)
					wrapper.css(defaultCSS.wrapper)
					$this.css(defaultCSS.input)
					label.css(defaultCSS.label)
					span.css(defaultCSS.span)
					
					if('' !== $(this).val()){
						label.hide();
					}
					
					label.click(function(){
						$(this).hide();
					});
					
					$this.focus(function(){
						label.hide();
					});
					
					$this.blur(function(){
						if('' == $(this).val()){
							label.show();
						}
					});
				});
			}
			return this;
		}
	})(jQuery);
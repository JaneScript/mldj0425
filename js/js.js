var t = 0;
var pici = 0;
var maire = {//玛丽黛佳 全局方法
	curvycorners : function(){//圆角
		curvyCorners.addEvent(window, 'load', initCorners);
		function initCorners() {
			var settings = {
				tl: { radius: 8 },
				tr: { radius: 8 },
				bl: { radius: 8 },
				br: { radius: 8 },
				antiAlias: true
			}
			var settings12 = {
				tl: { radius: 12 },
				tr: { radius: 12 },
				bl: { radius: 12 },
				br: { radius: 12 },
				antiAlias: true
			}
			curvyCorners(settings, ".playerPanel");
			curvyCorners(settings12, ".suggestion img");
		  }
	},
	isHidden : function(dom) {
		return $(dom).css('display')=='none';
		},
	selectUI : function(){//自定义下拉菜单
		$(".open_select").click(function(event){	
			event.stopPropagation();
			$(this).parents('.select_box').find(".select_list").toggle();
			$(this).parents('.select_box').siblings('.select_box').find('.select_list').hide();
		});

		//离开选择区域后，展开的下拉列表关闭
		$(document).click(function(event){
			var eo=$(event.target);
			if($(".open_select").is(":visible") && eo.attr("class")!="select_list" && !eo.parent(".select_list").length)
			$('.select_list').hide();
		});

		/*获取选中的值*/
		var $dss=$(".currency_type");
		$dss.click(function(){	
				var $txt=$(this).text();//展开菜单中的列表文本值
				var $hidden_txt=$(this).parents('.selectbox').find(".hidden_txt");
				var $t1=$(this).parents('.select_box').find('.open_select');//模拟文本框，接受选择的值
				$t1.text($txt);	
				$hidden_txt.val($txt);
				$(this).parents(".select_list").hide();			
			});
		//下拉列表滑过的背景
		$(".select_list li").hover(function(){
				$(this).addClass("h_bg");
			},function(){
				$(this).removeClass("h_bg");		
			});
	},
	popshow : function(html,w,h,popId){
		var winW = document.body.clientWidth;
        var windowH = document.documentElement.clientHeight;
        var bodyH = document.body.clientHeight;
		var maskH = bodyH;
		var winScroll = $(window).scrollTop();
        var popTop = windowH > h ? ((windowH - h) / 2 + winScroll) : 0;
        var popLeft = (winW - w) / 2;
		if($('.colorbody').length>0){
			var cb = $('.colorbody').height();
			maskH = cb+162;
		}
		if($('#probody').length>0){
			var probody = $('#probody').height();
			maskH = probody+162;
		}
		$('body').append('<div id="masklogin" style="position:absolute;width:100%;height:'+maskH+'px;top:0;left:0;z-index:10001;background:#000;opacity:0.5;filter:alpha(opacity=50);"></div>')
        $('body').append(html);
        //$('#mask').css({ 'height': bodyH });
        $('#' + popId + '').css({ 'top': popTop, 'left': popLeft });
	
		$('.closepop').live('click', function() {
            var $this = $(this);
            $this.parents('.poppanel').remove();
            $('#masklogin').remove();
        })
	},
	initialize : function(){
		var _this = this;
		$('a,input[type="button"],input[type="file"],input[type="radio"],input[type="submit"],input[type="checkbox"],button').live('focus',function(){$(this).attr('hidefocus','hidefocus')});//FF IE去除虚线框
		$("#product").mouseover(function(){
			$("#pop").show();
		});
		$("#nav").mouseleave(function(){
			$("#pop").hide();
		})
		$("#navcyt").mouseleave(function(){
			$("#pop").hide();
		})
		$('.logbtns p').live('mouseover',function(){
			$(this).addClass('hoverbtn');
		})
		$('.logbtns p').live('mouseout',function(){
			$(this).removeClass('hoverbtn');
		})
		$('.toplink_login').click(function(e){
			_this.popshow('<div id="poplogin" class="poppanel"><p class="closepop"></p><div class="logform"><p class="logheader">用户登陆</p><div class="logitem"><label for="">手机号码</label><input type="text" class="input1" id="mobilenumber" /><a href="regist.html" class="toregist">&nbsp;&nbsp;点击注册</a></div><div class="logitem"><label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码</label><input type="password" class="input1" id="psd" /><a href="regist.html" class="toforget hide">&nbsp;&nbsp;忘记密码</a></div><div class="logbtns"><p class="submit">提交</p><p class="reset">重置</p></div></div></div>',444,368,'poplogin')
		})
		$('#poplogin .reset').live('click',function(){
			$('#poplogin input').val('');
		})
		$('#poplogin .submit').live('click',function(){
			function trim(str){ //删除左右两端的空格
　　     	return str.replace(/(^\s*)|(\s*$)/g, "");
　　	 }
			var username = $('#mobilenumber').val();
			var psd = $('#psd').val();
			
			$.ajax({
				url : 'login.jsp?username='+username+'&password='+psd+'',
				type : 'post',
				success : function(data){
					if(data=='true'){
						$('#poplogin').remove();
						$('#mask').remove();
						$('.toplink_login').addClass('hidden');
						$('.toplink_reg').addClass('hidden');
						$('.topnavname').show();
					}else{
						data.replace(/(^\s*)|(\s*$)/g,"")
						alert(data);
					}
				}
			})
		})
		//网站搜索高亮
		$('.shhbtns p').hover(function(){
			$(this).addClass('shhhover')
		},function(){
			$(this).removeClass('shhhover')
		})
		//prolist页面高亮
		$('.prolistheader1').click(function(){
			$(this).siblings().removeClass('prolefthover1')
			$(this).siblings().removeClass('prolefthover2')
			$(this).addClass('prolefthover1');
		})
		$('.prolistheader2').click(function(){
			var $this = $(this);
			var t = $this.attr('t')*1;
			$this.siblings().removeClass('prolefthover1');
			$this.siblings().removeClass('prolefthover2');
			$this.addClass('prolefthover2');
			$('.prolistheader1').eq(t).addClass('prolefthover1');
		})
		
	}
}
maire.homePage = {//玛丽黛佳首页
	initialize :function(){
	function scroll() {
		var i=$(document).scrollTop();
		i+=5;
		if(i<=685){
		$(document).scrollTop(i);
		setTimeout(arguments.callee,1);
		}
	}
	$("#homenav").mouseover(function(){
		scroll();
	});
	$('.subnav02').hover(function(e){//滑出小视频
		var evt = e|| window.event;
		evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
		var tinyvideo = $('#tiny').val();
		$(this).css('z-index',11)
		$('#cover').show();
		$('#tinyvedio').animate({
			'width':182
		},500,function(){
			$('#tinyvedio').css('background','none');
			$('#tinyvedio').append('<embed src="p182_145.swf?v='+tinyvideo+'" width="182" height="145" type="application/x-shockwave-flash" ></embed>')
		})
	},function(e){
		var evt = e|| window.event;
		evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
		$(this).css('z-index',9)
		$('#cover').hide();
		$('#tinyvedio').animate({
			'width':0
		},500,function(){
			$('#tinyvedio embed').remove();
			$('#tinyvedio').css({'background':'url(img/brandtinypic.jpg) no-repeat'});
			
		})
	})
	$('.movex').hover(function(e){
		var evt = e|| window.event;
		evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
		var dis = $(this).attr('distance')*1;
		if($(this).children('.moveimg').width()==0){
			$(this).css('z-index',11)
			$('#cover').show();
			$(this).children('.moveimg').animate({
				'width':dis
			},500)
		}else{
			return false;
		}
	},function(e){
		var evt = e|| window.event;
		evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
		var dis = $(this).attr('distance')*1;
		
			$(this).css('z-index',9)
			$('#cover').hide();
			$(this).children('.moveimg').animate({
				'width':0
			},500)
		
	})
	$('.movey').hover(function(e){
		var evt = e|| window.event;
		evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
		var dis = $(this).attr('distance')*1;
		if($(this).children('.moveimg').height()==0){
			$(this).css('z-index',11)
			$('#cover').show();
			$(this).children('.moveimg').animate({
				'height':dis
			},500)
		}else{
			return false;
		}
	},function(e){
		var evt = e|| window.event;
		evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
		var dis = $(this).attr('distance')*1;
			$(this).css('z-index',9)
			$('#cover').hide();
			$(this).children('.moveimg').animate({
				'height':0
			},500)
		})
		
		var len=$(".topwarp li").length;
		$('.homeprev').click(function(){
			var i=$(".topwarp .homekv li:visible").prevAll().length;
			i=i<=1?1:i;
			$(".topwarp li").eq(i-1).show().siblings().hide();
		})
		$('.homenext').click(function(){
			var i=$(".topwarp .homekv li:visible").prevAll().length;
			i=i>=len-2?len-2:i;
			$(".topwarp li").eq(i+1).show().siblings().hide();
		})
		//关闭广告
		$('.adclose').click(function(){
			$(this).parent().hide();
		})
	}
}
maire.brand = {	//品牌页面
	/*playerClose : function(){//关闭大视频窗口
		var $player = $('.playerPanel');
		//var src = $('#svideoname').val();
		$player.hide();
		setTimeout(function(){
			$player.remove();
			//$('.svideo embed').attr('src','p284_220.swf?v='+sv+'');
			$('.svideo embed').css('visibility','visible');
			},500);
		},*/
	playerClose : function(){//关闭大视频窗口
		var $player = $('.playerPanel');
		//var src = $('#svideoname').val();
		$player.remove();
	},
	BigFlashPlayer : function(bv){//大视频窗口打开
		var _this = this;
		var winW = document.body.clientWidth;
		var winH = document.body.clientHeight; 
		var left = (winW-855)/2;
		var $player = $('.playerPanel');
		var $playerCloseBtn = $('.playerPanel span');
		$('#center').append('<div class="playerPanel" style="position:absolute;width:855px;height:550px;top:35px;left:0px;background:#000;"><p style="text-align:right;height:20px;";><span style="margin-right:10px;line-height:20px;font-size:12px;color:#fff;cursor:pointer"><img src="img/close.png" /></span></p><div class="player" style="width:855px;height:510px;display:none;"><embed src=p854_510.swf?v='+bv+' width="854" height="510" type="application/x-shockwave-flash" wmode="transparent"></embed></div><p style="height:20px;"></p></div>')
		var $playerDiv = $('.player');
		$playerDiv.show(1000);
		$playerCloseBtn.live('click',function(){
			_this.playerClose()
		});
	}
	/*initialize : function(){
		var src = $('#svideoname').val();
		var html = '';
			html +='<embed style="display:none;margin-top:30px;" src="'+src+'" width="284" height="220" type="application/x-shockwave-flash"></embed>'
		$('.svideo').append(html);
	}*/
}
maire.brand.mark = {//品牌印记
	svideodefault : function(){
		var p = $('#svideodefault').attr('p')*1;
		var src = $('#svideodefault').attr('src');
		if(p==0){
			$('.svideo').html('<embed src="p284_220.swf?v='+src+'" allowFullScreen="true" width="284" height="220" type="application/x-shockwave-flash" wmode="transparent"></embed>')
		}else{
			$('.svideo').html('<img src="'+src+'" alt="" />')
		}
	},
	yearPage : function(timeArray,json){//年份翻动
		var i=0;
		var h=$(".textDiv li").height();
		var len=timeArray.length;
		$(".downarrow").click(function(){
			var previ = 0;
			var nexti = 0;
			for(var j=0;j<timeArray.length;j++){
			  if(timeArray[j]==$('.prevYear').html()){
				previ = j;
				break;
			  }
			};
			 
			for(var k=0;k<timeArray.length;k++){
			  if(timeArray[k]==$('.nextYear').html()) {
				nexti = k;
				break;
			  }
			}
			//var previ = timeArray.indexOf($('.prevYear').html());
			//var nexti = timeArray.indexOf($('.nextYear').html());
			i--;
			if(i > -(len-1)){
				$('.prevYear').html(timeArray[previ+1]);
				$('.nextYear').html(timeArray[nexti+1]);
			}else if(i==-(len-1)){
				$('.prevYear').html(timeArray[previ+1]);
				$('.nextYear').hide();
				$('.downarrow').hide();
			}
			i = Math.max(-(len-1), i);
			$(".uparrow").css({'visibility':'visible'})
			var dis=i*h;
			var mt = $(".textDiv ul").css('margin-top');
			$(".textDiv ul").animate({"margin-top":dis});
			var currentyear = $('.prevYear').html();
			var currentsrc = json[currentyear][0].src;
			if(json[currentyear][0].html=='video'){
				$('.svideo').html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="100%" height="100%"><param name="movie" value="p284_220.swf?v='+currentsrc+'" /><param name="quality" value="high" /><param name="wmode" value="transparent"><embed src="p284_220.swf?v='+currentsrc+'" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%"></embed></object>')
			}else{
				$('.svideo').html('<img src="'+currentsrc+'" alt="" />')
			}
		});
		$(".uparrow").click(function(){
			//var previ = timeArray.indexOf($('.prevYear').html());
			//var nexti = timeArray.indexOf($('.nextYear').html());
			var previ = 0;
			var nexti = 0;
			for(var j=0;j<timeArray.length;j++){
			  if(timeArray[j]==$('.prevYear').html()){
				previ = j;
				break;
			  }
			};
			 
			for(var k=0;k<timeArray.length;k++){
			  if(timeArray[k]==$('.nextYear').html()) {
				nexti = k;
				break;
			  }
			}
			if(i<-1&&i!=-(len-1)){
				$('.prevYear').html(timeArray[previ-1]);
				$('.nextYear').html(timeArray[nexti-1]);
			}else if(i==-(len-1)){
				$('.nextYear').show();
				$('.downarrow').show();
				$('.prevYear').html(timeArray[previ-1]);
			}else if(i==-1){
				$(".uparrow").css('visibility','hidden');
				$('.prevYear').html(timeArray[previ-1]);
				$('.nextYear').html(timeArray[nexti-1]);
			}
			i++;
			i = Math.min(0, i);
			var dis=i*h;
			$(".textDiv ul").animate({"margin-top":dis})
			var currentyear = $('.prevYear').html();
			var currentsrc = json[currentyear][0].src;
			if(json[currentyear][0].html=='video'){
				$('.svideo').html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="100%" height="100%"><param name="movie" value="p284_220.swf?v='+currentsrc+'" /><param name="quality" value="high" /><param name="wmode" value="transparent"><embed src="p284_220.swf?v='+currentsrc+'" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%"></embed></object>')
			}else{
				$('.svideo').html('<img src="'+currentsrc+'" alt="" />')
			}
		});
	}
}
maire.brand.fans = {//品牌玛粉
	picShow : function(x){
		var $picdiv = $('.picdiv');
		$picdiv.children().eq(x).fadeIn(2000);
		$picdiv.children().eq(x).fadeOut(2000);
	},
	fadeShow : function(){//淡入淡出效果
		var _this = this;
		var $picdiv = $('.picdiv');
		var imglength = $picdiv.children().length;
		if(imglength==1){
			$picdiv.children().fadeIn(2000);
		}else{
			if(pici==imglength) pici=0;
			_this.picShow(pici);
			pici++;
		}
	}
}
maire.exchange = {//交流
	slider : function(main){
			//var len=$(main).children().find(".img").length;
			//$(main).find(".flip").find(".flip-left").text("1/"+len);
			$(main).click(function(event){
				event.stopPropagation();
			});
		},
	newsPanelShow : function(){//点击新闻弹出新闻面板
		var w = document.body.clientWidth;
		var h = 780;
		var p = $(this).parents('li').attr('p')*1;
		var html = '';
		html += '<div class="newsPanel"><div class="titlenews"><a class="closenews"><img src="img/close.png"/></a></div><div class="nano"><div class="content"><p class="mainnews">';
		html += '毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美于是他笔下的女人兑现了他的座右铭。她们很美，不是美得单一精致，她们美的迥然不同并真实可见。毕加索说，他从不追寻，却一直在发现。于是他笔下的女人兑现了他的座右铭。她们很美'			
		html += '</p></div></div></div>';
		$('body').append('<div id="mask"></div>')
		$('#mask').css({'width':w,'height':h});//获取屏幕高宽调整遮罩大小
		$('body').append(html);
		$('.newsPanel').css('left',300+30*p)//弹出新闻面包根据根据页数位置有偏移
		
		$(window).resize(function(){//屏幕大小改变，遮罩层大小调整
			var newW = document.body.scrollWidth;
			var newH = document.body.scrollHeight;
			if($('body').find('#mask').length>0){
				$('#mask').css({'width':newW,'height':newH});
			}
		});
		$(".nano").nanoScroller();//自定义滚动条
		$('.closenews').live('click',function(){//点击X关闭新闻面板
			$(this).parents('.newsPanel').remove();
			$('#mask').remove();
		})
	},
	// initNews : function(){//初始新闻箭头
	// $('.news').each(function(){
		// var h = $(this).children().height();
		// if(h>120){//根据新闻数量控制向上向下箭头的隐藏/显示
		// $(this).siblings('.uparrow').show();
		// $(this).siblings('.downarrow').show();
			// }
		// })
	// },
	/*newsOpen : function(){//根据新闻打开不同图片，默认打开第一条（新增方法）
		var p = $(this).attr('p')*1;//p为自定义属性，可以理解为新闻的编号，p=0,1,2,3,4...表示第一条新闻，第二，第三，第四。。。
		var $li = $(this).parents('li');
		var $right = $li.find('.li-right');
		var len=$right.find(".img").length;
		if(navigator.userAgent.indexOf('Firefox') >= 0){//ff浏览器闪动BUG
			$li.find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
			$li.css({"opacity":1,"background-color":"#000000","cursor":"default"}).animate({"width":"924px"},1).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":1,"background-color":"#2b211c"}).animate({"width":"32px"},1).children().hide().end().find(".small").show();
			$right.find('.img').hide();
			$right.find('.img[p='+p+']').show();
			$right.find(".flip-left").text((p+1)+"/"+len);
		}else{
			$li.find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
			$li.css({"opacity":1,"background-color":"#000000","cursor":"default"}).animate({"width":"924px"}).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":1,"background-color":"#2b211c"}).animate({"width":"32px"}).children().hide().end().find(".small").show();
			$right.find('.img').hide();
			$right.find('.img[p='+p+']').show();
			$right.find(".flip-left").text((p+1)+"/"+len);
		}
	},*/
	newsOpen : function(){
		var p = $(this).attr('p')*1;
		var $li = $(this).parents('li');
		var $right = $li.find('.li-right');
		var dom = $right.find('.exslider').children().eq(p);
		$(this).parents().find('a').removeClass('currnews')
		$(this).addClass('currnews');
		if(navigator.userAgent.indexOf('Firefox') >= 0){//ff浏览器闪动BUG
			$li.find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
			$li.css({"opacity":1,"background-color":"#000000","cursor":"default"}).animate({"width":"924px"},1).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":1,"background-color":"#2b211c"}).animate({"width":"32px"},1).children().hide().end().find(".small").show();
			dom.siblings().hide();
			dom.show();
		}else{
			$li.find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
			$li.css({"opacity":1,"background-color":"#000000","cursor":"default"}).animate({"width":"924px"}).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":1,"background-color":"#2b211c"}).animate({"width":"32px"}).children().hide().end().find(".small").show();
			dom.siblings().hide();
			dom.show();
			dom.children().eq(0).show();
			dom.children().eq(0).nextAll().hide();
		}
	},
	openLi : function(){//点击LI打开新闻（原来的方法）
		if(navigator.userAgent.indexOf('Firefox') >= 0){//ff浏览器闪动BUG
			if($(this).width()!=924){
			$(this).css({"opacity":1,"background-color":"#000000","cursor":"default"}).animate({"width":"924px"},1).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":1,"background-color":"#2b211c"}).animate({"width":"32px"},1).children().hide().end().find(".small").show();
			$(this).find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
			}
			else{
			$(this).css({"opacity":0.7,"background-color":"#0a0000"}).animate({"width":"255px"},1).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":0.7,"background-color":"#0a0000"}).animate({"width":"255px"},1).children().show().end().find(".small").hide();
			$(this).find(".exchangeNewsPanel").hide();
			}
		}else{
			if($(this).width()!=924){
				$(this).css({"opacity":1,"background-color":"#000000","cursor":"default"}).animate({"width":"924px"}).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":1,"background-color":"#2b211c"}).animate({"width":"32px"}).children().hide().end().find(".small").show();
				$(this).find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
				}
				else{
				$(this).css({"opacity":0.7,"background-color":"#0a0000"}).animate({"width":"255px"}).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":0.7,"background-color":"#0a0000"}).animate({"width":"255px"}).children().show().end().find(".small").hide();
				$(this).find(".exchangeNewsPanel").hide();
				}
		}
	},
	birdOpen : function(dom){
		dom.css({"opacity":1,"background-color":"#000000","cursor":"default","width":"924px"}).children().show().end().find(".small").hide().end().siblings("li").css({"opacity":1,"background-color":"#2b211c",'width':'32px'}).children().hide().end().find(".small").show();
		dom.find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
	},
	initialize : function(){
		var _this = this;
		//_this.initNews();//根据新闻数量控制向上向下箭头的隐藏/显示
		$('.exchangeNewsPanel a').click(_this.newsOpen);//点击新闻事件
		//$('.li-right .more').click(_this.newsPanelShow);//点击“更多”打开新闻面板
		$('.exchangeNewsPanel').click(function(event){//阻止冒泡
			event.stopPropagation();
			event.preventDefault();
		})
		$('.uparrow').click(function(){//向上翻动新闻面板
			var mt = $(this).siblings('.news').children().css('margin-top').split('p')[0]*1;
			if(mt!=0&&mt%120==0){
			var dis = mt+120;
			$(this).siblings('.news').children().animate({"margin-top":dis})
			}
		})
		$('.downarrow').click(function(){//向下翻动新闻面板
			var mt = $(this).siblings('.news').children().css('margin-top').split('p')[0]*1;
			var h = -($(this).siblings('.news').children().height());
			if(mt%120==0&&mt>(h+120)){
				var dis = mt-120;
				$(this).siblings('.news').children().animate({"margin-top":dis})
			}
		})
		/*$('.news div a').hover(function(){//鼠标悬停新闻变亮效果
			$(this).css('color','#fff');
		},function(){
			$(this).css('color','#433E3E')
		})*/
		$("#page li").mouseover(function(){
			if($(this).width()==255){
			$(this).css({"opacity":1,"background-color":"#000000","cursor":"pointer"}).siblings("li").css({"opacity":0.7,"background-color":"#0a0000"});
			$(this).find(".exchangeNewsPanel").show().end().siblings("li").find(".exchangeNewsPanel").hide();
			var index=$(this).prevAll().length+1;
			$("#content").css("background-image","url(img/exchange"+index+".jpg)");
			}
		})
		$("#page li").click(_this.openLi);
		$('.down').click(function(event){//翻页向后
			var len = $(this).parents('.flip-right').siblings('.flip-left').find('.em2').html()*1;
			var i=$(this).parents('.exslider1').find(".img:visible").prevAll().length;
			i=i>=len-2?len-2:i;
			$(this).parents('.exslider1').find(".img").eq(i+1).show().siblings(".img").hide();
			//$(this).parents('.exslider1').find(".flip-left em1").html(i+1+1);
			event.stopPropagation();
		});
		$('.up').click(function(event){//翻页向前
			var len = $(this).parents('.flip-right').siblings('.flip-left').find('.em2').html()*1;
			var i=$(this).parents('.exslider1').find(".img:visible").prevAll().length;
			i=i<=1?1:i;
			$(this).parents('.exslider1').find(".img").eq(i-1).show().siblings(".img").hide();
			//$(this).parents('.exslider1').find(".flip-left em1").html(i-1+1);
			event.stopPropagation();
		});
		_this.slider("#slider01")
		_this.slider("#slider02")
		_this.slider("#slider03")
		_this.slider("#slider04")
	}
}
maire.findcounter = {//查询专柜页面
	initialize : function(){
		$('.chosenselect').chosen();
		$('.provinceicon').hover(function(){
			var $this = $(this);
			h = $this.attr('h');
			$(this).css('background','url(img/provincebg'+h+'a.png)')
		},function(){
			var $this = $(this);
			h = $this.attr('h');
			$(this).css('background','url(img/provincebg'+h+'.png)')
		})
		$('.recruitmentBtn img').hover(function(){//招聘按钮
			$(this).attr('src','img/recruitment_btn1.png');
		},function(){
			$(this).attr('src','img/recruitment_btn.png');
		})
		$('.btn').hover(function(){//查询按钮鼠标悬停样式切换
			$(this).css('background-position','top')
		},function(){
			$(this).css('background-position','bottom')
		})
		$('.areasection').hover(function(){//地址面板悬停样式切换
			$(this).css('background','url(img/area_bg2.png) no-repeat')
		},function(){
			$(this).css('background','url(img/area_bg1.png) no-repeat')
		})
		$('.pagepoint').click(function(){//分页按钮样式切换
			$(this).addClass('current').siblings().removeClass('current');
		})
	}
}
maire.college = {//玛粉学院
	videoplay : function(){
		var $this = $(this);
		var src = $this.attr('src');
		var html = '';
		html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="100%" height="100%">';
		html += '<param name="movie" value="playVideoF-2.swf?v='+src+'" />';
		html += '<param name="quality" value="high" />';
		html += '<embed src="playVideoF-2.swf?v='+src+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%"></embed>'
		html += '</object>'
		$('.videopanel').html(html);
	},
	initialize : function(){
		var len=$("#topbg li").length;
		$('.content dt').click(this.videoplay);	
		$('.collegeprev').click(function(){
			var i=$("#topbg li:visible").prevAll().length;
			i=i<=1?1:i;
			$("#topbg li").eq(i-1).show().siblings().hide();
		})
		$('.collegenext').click(function(){
			var i=$("#topbg li:visible").prevAll().length;
			i=i>=len-2?len-2:i;
			$("#topbg li").eq(i+1).show().siblings().hide();
		})
		//点击视频自动播放
		$('.content dt').click(function(){
			var src = $(this).attr('src');
			var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="100%" height="100%" >'
				html +='<param name="movie" value="p448_356.swf?v='+src+'" />'
				html += '<param name="quality" value="high" />'
				html += '<param name="wmode" value="transparent">'
				html += '<embed src="p448_356.swf?v='+src+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%" wmode="transparent"></embed>'
				html += '</object>'
			$('.videopanel').html(html);
			
		})
	}
}
maire.fansvideo = {
	initHeight : function(dom,row,unith){
		var length = dom.children().length;
		var h = Math.ceil(length/row)*unith+32;
		dom.height(h);
	},
	initialize : function(){
		$('.fansv_ul').each(function(){
			var _this = this;
			maire.fansvideo.initHeight($(this),4,215);	
		})
	}
}
maire.regist = {
	initialize : function(){
		$('.logbtns p').hover(function(){
			$(this).addClass('hoverbtn');
		},function(){
			$(this).removeClass('hoverbtn');
		});
		
		$('.chosenselect').chosen();
		
		$('.registmore').click(function(){
			var $this = $(this);
			$('.hideregist').animate({'height':138},500,function(){$this.parent().remove();$('.hideregist').css('overflow','visible')})
		})
	}
}
maire.color = {
	initHeight : function(height){
		$('.pickul').height(height)
	},
	initialize : function(){
		//玩法提示
		var h1 = $('.colorbody').height()+162;
		$('.colormask').height(h1);
		$('.tipclose').click(function(){
			$('.colormask').hide();
			$('.colortip').hide();
		})
		
		$('.oprateicon').live('click',function(){
			var $this = $(this);
			if($this.hasClass('oprateicon2')){
				$this.siblings('.coloroprate').animate({'top':'-36px'},500,function(){
					$this.removeClass('oprateicon2')
				})
			}else{
				$this.siblings('.coloroprate').animate({'top':'-10px'},500,function(){
					$this.addClass('oprateicon2')
				})
			}	
		})
		//玩法介绍弹出
		$('#guide').click(function(){
			var h2 = $('.colorbody').height()+162;
			$('.colormask').height(h2);
			$('.colormask').show();
			$('.colortip').show();
		})
		//隐藏色块面板
		$('.coloroprate li').live('click',function(){
			$(this).parent().css({'top':'-26px'});
			$(this).parent().siblings('.oprateicon').removeClass('oprateicon2');
		})
		
		//色块导航高亮效果
		$('.pc').click(function(){
			var $this = $(this);
			if($this.children('span').hasClass('hidden')){
				$this.children('span').removeClass('hidden');
			}else{
				$this.children('span').addClass('hidden');
			}
		})
	}
}
maire.inispiration = {//灵感页面
	initialize : function(){
		$('#contentleft i').click(function(){//灵感来源翻页
			var Left = $('#contentmiddle ol').css('margin-left').split('p')[0]*1;
			var LiWidth = 902;
			var p = -Left/902;
			var kind = $(this).parent().siblings('#contentmiddle').find('li').attr('kind');
			if(Left%LiWidth==0&&Left<0){
				$('#contentmiddle ol li[p='+(p-1)+']').siblings().removeClass('currentli');
				$('#contentmiddle ol li[p='+(p-1)+']').addClass('currentli');
				$('#contentmiddle ol').animate({'margin-left':Left+LiWidth},function(){
					if(Left==-LiWidth){$('#contentleft i').css({'visibility':'hidden'});}
					var currp = $('.currentli').attr('p')*1;
					var leftpic = $('.currentli').attr('leftpic');
					var rightpic = $('.currentli').attr('rightpic');
					if(currp==0){
						$('#contentleft').css({'background':'url('+leftpic+') repeat-y 0 0','opacity':1})
						$('#contentright').css({'background':'url('+rightpic+') no-repeat -240px 0','opacity':0.7})
					}else{
						$('#contentleft').css({'background':'url('+leftpic+') no-repeat -240px 0','opacity':0.7})
						$('#contentright').css({'background':'url('+rightpic+') no-repeat -240px 0','opacity':0.7})
					}
				})
			}
			$('#contentright i').css({'visibility':'visible'});
		})
		$('#contentright i').click(function(){//灵感来源翻页
			var Li = $('#contentmiddle ol li').length;
			var LiWidth = 902;
			var W = -((Li-1)*LiWidth)
			var Left = $('#contentmiddle ol').css('margin-left').split('p')[0]*1;
			var p = -Left/902;
			var kind = $(this).parent().siblings('#contentmiddle').find('li').attr('kind');
			if(Left%LiWidth==0&&Left>W){
			$('#contentmiddle ol li[p='+(p+1)+']').siblings().removeClass('currentli');
			$('#contentmiddle ol li[p='+(p+1)+']').addClass('currentli');
			$('#contentmiddle ol').animate({'margin-left':Left-LiWidth},function(){
					if(Left==(W+LiWidth)){$('#contentright i').css({'visibility':'hidden'});}
					var currp = $('.currentli').attr('p')*1;
					var leftpic = $('.currentli').attr('leftpic');
					var rightpic = $('.currentli').attr('rightpic');
					if(currp==(Li-1)){
						$('#contentleft').css({'background':'url('+leftpic+') no-repeat -240px 0','opacity':0.7})
						$('#contentright').css({'background':'#000','opacity':1})
					}else{
						$('#contentleft').css({'background':'url('+leftpic+') no-repeat -240px 0','opacity':0.7})
						$('#contentright').css({'background':'url('+rightpic+') no-repeat -240px 0','opacity':0.7})
					}
				})
			}
			$('#contentleft i').css({'visibility':'visible'});
		})
	}
}
maire.pro_list = {
	getHeight : function(h){
		if(h){
			$('.lipstickpanel').height(h);
		}else{
			$('.lipstickpanel').height(500);
		}
		
	}
}
maire.product1 = {
	purchaseonline : function(){
		var h = $('.newbox').height()+126;
		var scrolltop = $(window).scrollTop();
		var top = scrolltop-184;
		$('.purchaseonlinepanel').show();
		$('.purchaseonlinepanel').css({'margin-top':top})
		$('#purchasemask').show();
		$('#purchasemask').height(h);
		
		$('.closepurchase').click(function(){
			$('.purchaseonlinepanel').hide();
			$('#purchasemask').hide();
		})
	},
	initialize : function(){
		$('#buyrn a').click(maire.product1.purchaseonline)
		$('.chosenselect').chosen();
		$('.purchaseformbtn1 a').hover(function(){
			$(this).addClass('purchasebtnhover');
		},function(){
			$(this).removeClass('purchasebtnhover');
		});
		$('.purchasemore').hover(function(){
			$(this).addClass('purchasemorehover');
		},function(){
			$(this).removeClass('purchasemorehover');
		});
		$('.closepurchase').click(function(){
			$(this).parent().hide();
		});
		
		$('.videopickul li').eq(0).width(200);
		$('.videopickul li').click(function(){
			var $this = $(this);
			var src = $this.attr('src');
			var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="100%" height="100%"><param name="movie" value="p398_278.swf?'+src+'" /><param name="quality" value="high" /><param name="wmode" value="transparent"><embed src="p398_278.swf?v='+src+'" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%"></embed></object>'
			$this.siblings().width(20);
			$this.siblings().children().hide();
			$this.animate({'width':200},function(){
				$this.children().show();
				$('.product1videoplay').html(html);
			})
		})
	}
}
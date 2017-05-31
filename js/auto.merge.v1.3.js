/*============================auto.js=================================*/
typeof $ === 'undefined' && typeof jQuery !== 'undefined' && ($=jQuery);
/**
 * ip定向保存空间
 **/
var citys = {};

citys.ipUrl = "http://fw.qq.com:80/ipaddress";
citys.exist = false;
citys.list = [
	{
		name:"北京",
		cn:"beijing",
		url:"http://auto.qq.com/buycar/homemarket/hq_beijing/hangqingtop10.htm"
	},{
		name:"沈阳",
		cn:"shenyang",
		url:"http://auto.qq.com/buycar/homemarket/hq_liaoning/hq_shenyang/hangqingtop10.htm"	
	},{
		name:"南京",
		cn:"nanjing",
		url:"http://auto.qq.com/buycar/homemarket/hq_jiangsu/hq_nanjing/hangqingtop10.htm"	
	},{
		name:"杭州",
		cn:"hangzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_zhejiang/hq_hangzhou/hangqingtop10.htm"	
	},{
		name:"上海",
		cn:"shanghai",
		url:"http://auto.qq.com/buycar/homemarket/hq_shanghai/hangqingtop10.htm"	
	},{
		name:"福州",
		cn:"fuzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_fujian/hq_fuzhou/hangqingtop10.htm"	
	},{
		name:"广州",
		cn:"guangzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_guangdong/hq_guangzhou/hangqingtop10.htm"	
	},{
		name:"武汉",
		cn:"wuhan",
		url:"http://auto.qq.com/buycar/homemarket/hq_hubei/hq_wuhan/hangqingtop10.htm"	
	},{
		name:"长沙",
		cn:"changsha",
		url:"http://auto.qq.com/buycar/homemarket/hq_hunan/hq_changsha/hangqingtop10.htm"	
	},{
		name:"成都",
		cn:"chengdu",
		url:"http://auto.qq.com/buycar/homemarket/hq_sichuan/hq_chengdu/hangqingtop10.htm"	
	},{
		name:"重庆",
		cn:"chongqing",
		url:"http://auto.qq.com/buycar/homemarket/hq_chongqing/hangqingtop10.htm"	
	},{
		name:"西安",
		cn:"xian",
		url:"http://auto.qq.com/buycar/homemarket/hq_shanxi/hq_xian/hangqingtop10.htm"	
	},{
		name:"郑州",
		cn:"zhengzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_henan/hq_zhengzhou/hangqingtop10.htm"	
	}
];


/**
 * 隐藏面板
 **/
function TPanel(ops) {
	this.btn = ops.btn;
	this.panel = ops.panel;
	this.event = ops.event || "click";
	this.timer = null;
	this.delay = ops.delay || 4000;
	this.open = false;
	this.effect = ops.effect || false;
	this.init();
}
TPanel.prototype = {
	init: function () {
		var _this = this;
		this.btn.on(this.event, function (e) {
	
			_this.toggle();

			
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				window.event.cancelBubble = true;
			}
				
			return false;
		});

		if (_this.effect) {
			
			$("body").on("click", function (){
			
				_this.hide_pan();
			});
		}
	},
	show_pan: function(){
		this.btn.find("em:not(.up)").addClass("up");
		this.panel.is(':hidden') && this.panel.show();
	},
	hide_pan: function () {
		this.btn.find("em").removeClass("up");
		!this.panel.is(":hidden") && this.panel.hide();
	},
	clear: function(){
		(this.timer) && clearTimeout(this.timer);
		this.btn.find("em.up").removeClass("up");
	},
	set: function(){
		var _this = this;
		this.timer = setTimeout(function () {
			_this.toggle();
		}, _this.delay);
	},
	down_pan: function () {
		this.btn.find("em").addClass("up");
		this.panel.slideDown();
	},
	toggle: function () {
		this.btn.find("em").toggleClass("up");
		if (this.effect) {
			this.panel.toggle();
		} else {
			this.panel.slideToggle();
		}
	}
};

/*头部隐藏面板*/
var top_panel = new TPanel({
	btn: $("#control_panel_btn"),
	panel: $("#hide_panel")
});

var top_city = new TPanel({
	btn: $("#top_city_btn"),
	panel: $("#top_select_city"),
	delay: 1500,
	effect: true
});

$.getScript(citys.ipUrl, function(){
	$(citys.list).each(function (i,e) {
		if ((IPData[3] == '' && IPData[2].split("市")[0] == e.name) || (IPData[3]!=''&&IPData[3].split("市")[0] == e.name)) {
			citys.exist = true;
			
			$("#slt1").show();
			$.ajax({
				url: e.url,
				dataType: "html",
				success: function (html) {
					$("#control_panel_btn").attr("bosszone",e.cn+"auto");
					$("#control_panel_btn").find("span").html(e.name);
					$("#hide_panel_middle").empty().append(html);
				}
			});
			$.ajax({
				url: "http://auto.qq.com/index_inc/2014/" + e.cn + "auto/hq_x.htm",
				dataType: "html",
				success: function (html) {
					$("#hide_panel_left").empty().append(html);
				}
			});
			$.ajax({
				url: "http://auto.qq.com/index_inc/2014/" + e.cn + "auto/hq_z.htm",
				dataType: "html",
				success: function (html) {
					$("#hide_panel_right").empty().append(html);
				}
			});
			top_panel.down_pan();
		}
	});

	if (citys.exist) {top_panel.set();}
});

var hot_car_num = 0;

$.ajax({
	url:"http://i.match.qq.com/auto/hotserial",
	dataType:"jsonp",
	success: function (d){
		if (d.code == 0 && d.num > 0) {
			$("#hot_cars").find("ul:not(.first)").remove();
			
			for (var i=0; i<d.serials.length; i++) {
				if (hot_car_num >= 16) {break; }
				var flag = 0;
				if (hot_car_num%8 == 0)  {
					var oUl = $('<ul></ul>');
					$("#hot_cars").append(oUl);
				}
				
				$("#hot_cars").find("ul.first li a").each(function () {
					if ($(this).attr("sid") == d.serials[i].id) {
						flag = 1;
					}
				});
				if (!flag) {
					hot_car_num++;
					var oLi = $('<li><a target="_blank" href="http://data.auto.qq.com/car_serial/'+d.serials[i].id+'/index.shtml?alg=at">'+d.serials[i].name+'</a></li>');
					oUl.append(oLi);
				}
			}
			if ($("#hot_cars").find("ul:empty").length) {
				$("#hot_cars").find("ul:empty").remove();
			}
		}
	}
});


/**
 * 焦点图
 **/
function Foucs(ops) {
	this.cons = ops.cons;
	this.menus = ops.menus;
	this.btnL = ops.btnL || null;
	this.btnR = ops.btnR || null;
	this.event = ops.event || "mouseover";
	this.cls = ops.cls || "active";
	this.cur = 4;
	this.timer = null;
	this.delay = ops.delay || 6000;
	this.init();
}
Foucs.prototype = {
	init: function () {
		var _this = this;
		this.menus.each(function (i) {
			$(this).on(_this.event, function () {
				_this.clear();
				_this.cur = i;
				_this.change(i);
			});
		});
		
		this.cons.on("mouseover", function () {
			_this.clear();
		}).on("mouseout", function () {
			_this.set();
		});

		if (this.btnL) {
			this.btnL.on("mouseover", function () {
				_this.clear();
			}).on("mouseout", function () {
				_this.set();
			}).on("click", function () {
				_this.cur--;
				if (_this.cur < 0) {
					_this.cur = _this.menus.length-1;
				}
				_this.change(_this.cur);
			});
		}

		if (this.btnR) {
			this.btnR.on("mouseover", function () {
				_this.clear();
			}).on("mouseout", function () {
				_this.set();
			}).on("click", function () {
				_this.cur++;
				if (_this.cur >= _this.menus.length) {
					_this.cur = 0;
				}
				_this.change(_this.cur);
			});
		}
		
		this.set();
	},
	clear: function () {
		if (this.timer) {clearInterval(this.timer);}
	},
	set: function () {
		var _this = this;
		this.clear();
		this.timer = setInterval(function () {
			_this.cur = (_this.cur+1)%_this.cons.length;
			_this.change(_this.cur);
		}, this.delay);
	},
	change: function (index) {
		var _this = this;
		
		this.menus.removeClass(this.cls).eq(index).addClass(this.cls);
		this.cons.eq(index).hide().css({
			"z-index":3
		}).fadeIn("slow",function () {
			_this.cons.css({"z-index":1}).eq(index).css({"z-index":2});
			_this.changing = false;
		});
	}
};

/*焦点图*/
var foucs1 = new Foucs({
	cons:$("#foucs_pic .pic_lists li"),
	menus:$("#foucs_pic .mini_nav li"),
	btnL:$("#focusGoR"),
	btnR:$("#focusGoL")
});

/*腾讯任务*/
var task1 = new Foucs({
	cons:$(".task_win .task_list li"),
	menus:$(".task_win .mini_task li")
});

/**
 * 页卡切换
 **/
function Tab(ops) {
	this.menus = ops.menus;
	this.cons = ops.cons;
	this.clsname = ops.clsname || "active";
	this.event = ops.event || "mouseover";
	this.cur = ops.cur || 0;
	this.lbtn = ops.lbtn || null;
	this.rbtn = ops.rbtn || null;
	
	this.init();
}
Tab.prototype = {
	init: function () {
		var _this = this;
		this.menus.each(function (i) {
			$(this).on(_this.event, function () {
				_this.cur = i;
				_this.change(_this.cur);
			});
		});

		if (this.lbtn) {
			this.lbtn.on("click", function () {
				_this.cur--;
				if (_this.cur < 0) {
					_this.cur = _this.menus.length -1;
				}
				_this.change(_this.cur);
			});
		}

		if (this.rbtn) {
			this.rbtn.on("click", function () {
				_this.cur++;
				if (_this.cur >= _this.menus.length) {
					_this.cur = 0;
				}
				_this.change(_this.cur);
			});
		}
		
		this.change(this.cur);
	},
	change: function (i) {
		this.menus.removeClass(this.clsname).eq(i).addClass(this.clsname);
		this.cons.hide().eq(i).show();
	}
}

/*车型大全*/
var cx_tab = new Tab({
	menus: $(".cx_tab ul li"),
	cons: $(".cx_content_item")
});

/*长测车型*/
var try1 = new Tab({
	menus: $(".try_menus a"),
	cons: $(".try_cons ul")
});

/*有情链接*/
var links1 = new Tab({
	menus: $(".links_bot .menus a"),
	cons: $(".links_bot .cons")
});


/*腾讯出品*/
function SlideTab(ops) {
	this.cons = ops.cons;
	this.len = this.cons.find("li").length;
	this.up = ops.up;
	this.down = ops.down;
	this.moving = false;
	this.cur = 0;
	this.delay = ops.delay || 4000;
	this.timer = null;
	
	this.init();
}
SlideTab.prototype = {
	init: function () {
		var _this = this;
		this.cons.html(this.cons.html()+this.cons.html());

		this.up.on("mouseover", function() {
			_this.clear_timer();
		}).on("mouseout", function() {
			_this.set_timer();
		}).on("click",function () {
			if (_this.moving) {return}
			_this.clickup();
		});

		this.down.on("mouseover", function() {
			_this.clear_timer();
		}).on("mouseout", function() {
			_this.set_timer();
		}).on("click",function () {
			if (_this.moving) {return}
			_this.clickdown();
		});

		this.cons.find("li").on("mouseover", function (){
			_this.clear_timer();
		}).on("mouseout", function () {
			_this.set_timer();
		})
		
		this.set_timer();
	},
	clickup: function () {
		var _this = this;
		this.cur++;
		this.change(this.cur,function () {
			
			if (_this.cur >= _this.len) {
				_this.cons.css({
					top:-5
				});
				_this.cur = 0;
			}
		});
		
	},
	clickdown: function () {
		this.cur--;
		if (this.cur < 0) {
			this.cur = this.len;
			this.cons.css({
				top:-this.calc(this.cur+1)
			})
		}
		this.change(this.cur);
	},
	calc: function (index) {
		var dis = 4;
		this.cons.find('li').each(function (i) {
			if (i >= index) {return}
			dis += $(this).outerHeight();
		});
		return dis;
	},
	change: function (index,fn) {
		var _this = this;
		this.moving = true;
		this.cons.stop().animate({
			top:-this.cons.find("li").eq(index)[0].offsetTop-5
		},function () {
			if (fn) fn();
			_this.moving = false;
		});
	},
	clear_timer: function () {
		if (this.timer) {clearInterval(this.timer);}
	},
	set_timer: function () {
		var _this = this;
		this.timer = setInterval(function () {
			_this.clickup();
		}, this.delay);
	}
};

var cp1 = new SlideTab({
	cons:$("#txcp ul"),
	up:$("#txcp a.up_btn"),
	down:$("#txcp a.down_btn")
});

/*历史回顾*/
var history_timer = null;
$("#hgIcon").on("mouseover",function () {
	if (history_timer) {clearTimeout(history_timer);}
	$(".datebar").show().attr("aria-disabled", "false").attr("aria-hidden", "false").attr("tabindex", "0");
}).on("keydown", function () {
	$(this).attr("aria-pressed", "true");
}).on("keyup", function () {
	$(this).attr("aria-pressed", "false");
}).on("mouseout", function () {
	history_timer = setTimeout(function () {
		$(".datebar").hide().attr("aria-disabled", "true").attr("aria-hidden", "true").attr("tabindex", "-1");
	}, 1500);
});

$(".datebar").on("mouseover", function () {
	if (history_timer) {clearTimeout(history_timer);}
		$(".datebar").show();
}).on("mouseout", function () {
	history_timer = setTimeout(function () {
		$(".datebar").hide();	
	}, 1000);
});

/*回到顶部*/
var ie6=!-[1,]&&!window.XMLHttpRequest;
$(window).scroll(function () {
	if ($(window).scrollTop() > $(window).height()) {
		$("#toTop").show();
		if (ie6) {
			$("#toTop").css({
				"position":"absolute",
				"top":$(window).scrollTop()+$(window).height()-100
			});
			
		}
	} else {
		$("#toTop").hide();
	}
});



/*===============================auto.dev.js=================================*/
/*
 * jQuery Cookie Plugin v1.3.1
 */
;(function(e,f,b){var d=/\+/g;function g(j){return j}function h(j){return c(unescape(j.replace(d," ")))}function c(j){if(j.indexOf('"')===0){j=j.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}return j}function i(j){return a.json?JSON.parse(j):j}var a=e.cookie=function(r,q,w){if(q!==b){w=e.extend({},a.defaults,w);if(q===null){w.expires=-1}if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setDate(v.getDate()+s)}q=a.json?JSON.stringify(q):String(q);return(f.cookie=[escape(r),"=",a.raw?q:escape(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var j=a.raw?g:h;var u=f.cookie.split("; ");var x=r?null:{};for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=j(o.shift());var m=j(o.join("="));if(r&&r===k){x=i(m);break}if(!r){x[k]=i(m)}}return x};a.defaults={};e.removeCookie=function(k,j){if(e.cookie(k)!==null){e.cookie(k,null,j);return true}return false}})(jQuery,document);

(function($){if(!$)return;
document.domain = 'qq.com';
var doc  = document,port='',win  = window,_loc = location;
/*
* 公共部分
*
*/
	
	// 模拟commonJS require
	var require=function(module){
		var exports={};
		module=require.modules[module]||undefined;
		typeof module=='function'&&module.call(exports,exports);
		return exports;
	}
	
	
	require.modules={};

	require.registar=function(module,fn){
		module&&fn&&(require.modules[module]=fn);
	}
	
	// 浏览器判断
	var userAgent = navigator.userAgent.toString().toLowerCase();
	$.browser = {
		tt  : /tencenttraveler|qqbrowser/i.test( userAgent ),
		ie6 : !-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent),
		ie7 : /msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7),
		ie8 : /msie.[8]\.0/i.test(userAgent) || (document.documentMode == 8),
		ie67 : ((!-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent)) || (/msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7))),
		ie78 : /msie.[7|8]\.0/i.test(userAgent),
		ie678: !$.support.leadingWhitespace,
		ie9 : /msie.[7|9]\.0/i.test(userAgent) && /mozilla\/[4|5]\.0/i.test(userAgent) && /trident\/5\.0/i.test(userAgent) || (document.documentMode == 9),
		safari: /webkit/i.test( userAgent ), 
		chrome: /chrome/i.test(userAgent) && /mozilla/i.test(userAgent) ,
		msie  : /msie/i.test(userAgent) && !/opera/.test(userAgent),
		ff:  /.*(firefox)\/([\w.]+).*/i.test(userAgent)
	};
	
	// 事件停止响应
	$.stopEvent=function(event){
		if(event){
			(event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
			(event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
		}
	}
	//  事件订阅
	var eventSubscribeBox={};
	function eventSubscribe(type,fn){
		eventSubscribeBox[type]=eventSubscribeBox[type]||[];
		eventSubscribeBox[type].push(fn);				
	}
	function eventSpeaker(type,evt){
		var box=eventSubscribeBox[type];
		if(box){
			var i=box.length;
			while(i){
				i--;
				box[i](evt)
			}
		}
	}

/*
* 各个功能模块
*
*/

	// 选车中心  selectCarCenter.js
	require.registar('selectCarCenter',function(exports){
		
		var configs={el:'#cp_xczx .select_search_box'};
		var getId=function(id){return document.getElementById(id||'')};
		configs.getApi=function(key,id){
			var api={
				'brand':'http://js.data.auto.qq.com/car_public/1/manufacturer_list_json.js',
				'serial':'http://js.data.auto.qq.com/car_manufacturer/'+id+'/serial_list_json.js',
				'serialDetail':'http://data.auto.qq.com/car_serial/'+id,
				'brandSearch':'http://cgi.data.auto.qq.com/php/search.php?manufacturer_id='+id
			}
			return api[key]||'';
		}
		
		

		function select(options){
			var aClass='subItemBtnActive';
			var selector=options.selector||'';
			var module='_'+Math.random();
			var el=$(selector);
			var btn=options.btn;
			var popBody=btn.siblings('div');
			
			function blur(){
				popBody.removeClass(aClass).hide();
				$(document.documentElement).unbind('click',blur);
			}
			function show(){
				popBody.addClass(aClass).show();
				$(document.documentElement).bind('click',blur);					
			}
			btn.bind('click',function(e){
				$.stopEvent(e);
				eventSpeaker('click',module);
				if(popBody.children('div').children('div').children().length){
					return popBody.hasClass(aClass)?blur():show();
				}
			});
			
			eventSubscribe('click',function(active){
				if(active!=module)blur();
			});
		}
		
		function subSelect(event,type){
			var option=$(event.target).closest('a');
			var inputBox=$(event.target).closest('.select_item').children('.xc_select_btn');
			var isBrand=!!$(event.target).closest('.brand').length;
			if(option.length){
				var val=option.attr('data-value')||'';
				var valArr=val.split(',');
				if(valArr.length==2){
					var valId=valArr[0],valName=valArr[1];
					inputBox.attr('data-value',val).children('span').text(valName);
					isBrand&&setTimeout(function(){getSerial(valId)},0);;
				}
			}
		
		}
		
		
		var getBrand= exports.getBrand=function(){		
			$.getScript(configs.getApi('brand'),parse);
			
			function parse(){
				var rs=new Array();
				if(window.oManufacturerData){
					var tmp={}
					$.each(oManufacturerData.arrManufacturer,function(index,item){
						var bLetter=item.FirstLetter;
						var sName=item.Name;
						!tmp[bLetter]&&(tmp[bLetter]=['<span class="">'+bLetter+'</span>']);
						tmp[bLetter].push('<a href="javascript:;" data-value="'+item.ID+','+sName+'">'+sName+'</a>');
					})
					for(var key in tmp)rs.push('<div class="pp_ops_item">'+(tmp[key].join('')||'')+'</div>');
					$(configs.el).find('.pp_ops_list').html(rs.join('')).bind('click',subSelect);
					
				}
			
			}
		
		}
		
		var getSerial=exports.getSerial=function(brandId){
			$.getScript(configs.getApi('serial',brandId),parse);
			
			function parse(){
			//debugger;
				var rs=new Array('<ul><li><a href="javascript:;" data-value="0,\u9009\u62e9\u8f66\u7cfb" >\u9009\u62e9\u8f66\u7cfb</a></li>')
				//console.log(configs.getApi('serial',brandId));
				if(window.oManufacturerSerialData){
					var tmp={}
					$.each(oManufacturerSerialData.arrSerial,function(index,item){
						var bName=item.BrandName;
						var sName=item.Name;
						!tmp[bName]&&(tmp[bName]=['<li><span>'+bName+'</span></li>']);
						tmp[bName].push('<li><a href="javascript:;" title="'+sName+'" data-value="'+item.ID+','+sName+'">'+sName+'</a></li>');
					})
					for(var key in tmp)rs.push(tmp[key].join('')||'');
					rs.push('</ul>')
					$(configs.el).find('.cx_ops_list').html(rs.join('')).unbind('click').bind('click',subSelect).find('a').first().trigger('click');				
				}
			
			}	
		}
		
		exports.submit=function(event){
			$.stopEvent(event);
			var brand=[],serial=[],url=''
			$(configs.el).find('.xc_select_btn').each(function(index,item){
				var value=$(item).attr('data-value')||'';
				if($(item).closest('.brand').length){
					brand=value.split(',');
				}else{				
					serial=value.split(',');
				}
			});
			if(brand.length!==2){alert('\u8bf7\u9009\u62e9\u54c1\u724c\u6216\u8f66\u7cfb');return }
				url=configs.getApi('brandSearch',brand[0]);
			if(+serial[0]){
				url=configs.getApi('serialDetail',serial[0]);
			}
			window.open(url);
		}
		
		exports.init=function(opts){
			$.extend(configs,opts);
			$('<style type="text/css">.pp_ops_win, .cx_ops_win{width:100%;*position:relative;}</style>').appendTo('body');
			this.getBrand();
			$(configs.el).find('.select_item').each(function(){
				select({selector:$(this),btn:$(this).find('.xc_select_btn').attr('data-value','')});
			});
			$(configs.el).find('.search_btn').bind('click',this.submit);
		}
	});

	// 曾经看过
	require.registar('visitHistory',function(exports){
		exports.init=function(el){
			var history= $.cookie("wz_autoapp_ReviewSerials")||'',visitLink=['<span><em class="eye"></em>\u66fe\u7ecf\u770b\u8fc7:</span>'];
			history=history.split("|").reverse();
			$.each(history,function(a,b){
				var item;
				b&&(item=b.split(","));
				if(item && item.length==3){
					visitLink.push('<a target="_blank"  href="http://data.auto.qq.com/car_serial/'+item[1]+'">'+item[0]+'</a>');
				}					
			});
			visitLink.length>1&&$(el).find('.history_links').append(visitLink.splice(0,6).join(''));				
		}	

	});
	
	// 获取top排行榜
	require.registar('getTopList',function(exports){
		var api='http://js.data.auto.qq.com/car_public/1/attentionlist_auto.js';
		var jjdom,hmdom;
		function insertBody(){
			var jjrs=[],hmrs=[];
			if(window.down_hot_models){			
				$.each(down_hot_models.jiangjia,function(index,item){				
					jjrs.push('<li><span class="num '+(index<=2?'top':'')+'">'+(index+1)+'</span><a href="'+(item.url||'###')+'" target="_blank">'+(item.name||'')+'</a><span class="price"><em class="green_arr"></em>'+(item.content.replace('\u2193','')||'')+'</span></li>');
				});
				$.each(down_hot_models.hotmodels,function(index,item){
					hmrs.push('<li><span class="num '+(index<=2?'top':'')+'">'+(index+1)+'</span><a href="'+(item.url||'###')+'" target="_blank">'+(item.name||'')+'</a><span class="price">'+(item.content||'')+'</span></li>');
				});			
			}		
			jjdom.find('.depr_list').children('ul').html(jjrs.join('')||'\u672a\u52a0\u8f7d\u5230\u6570\u636e.');			
			hmdom.find('.list').children('ul').html(hmrs.join('')||'\u672a\u52a0\u8f7d\u5230\u6570\u636e.');			
		}
		exports.init=function(jjel,hmel){
			jjdom=$(jjel),hmdom=$(hmel);
			$.getScript(api,insertBody);
			jjdom.find('.depr_list').children('ul').html('loading...');
			hmdom.find('.depr_list').children('ul').html('loading...');
			jjdom.find('a.more').attr('href','http://auto.qq.com/gouche/hangqing09/top10/2014007.htm')
		}
	
	});
	
	// 车系排行榜
	require.registar('serialTop',function(exports){
		var api='http://i.match.qq.com/auto/hotserialapp?val=hotcarrankdata';
		var dom;
		function insertHtml(){
			if(!window.hotcarrankdata)return;
			if(!window.oBrandSerialData)return setTimeout(insertHtml,1000);
			var arr=[],hmrs=[],dom;
			var i=0;
			var len=oBrandSerialData.list.length;
			while(i<10){
				arr.push(hotcarrankdata.serials[i].id);
				i++;
			}
			while(len--){
				var item=oBrandSerialData.list[len];				
				var index=hmrs.length;
				if(~arr.indexOf(oBrandSerialData.list[len].ID))hmrs.push('<li><span class="num '+(index<=2?'top':'')+'">'+(index+1)+'</span><a href="http://data.auto.qq.com/car_serial/'+(item.ID||'###')+'" target="_blank">'+(item.Name||'')+'</a><span class="price">'+(item.PriceLow+'-'+item.PriceHigh+'万元')+'</span></li>');
			}
			hmdom.find('.list').children('ul').html(hmrs.join('')||'\u672a\u52a0\u8f7d\u5230\u6570\u636e.');
		}
		
		exports.init=function(selector){
			hmdom=$(selector)
			hmdom.find('.depr_list').children('ul').html('loading...');
			$.getScript(api,insertHtml);
		}
		
		
		
		
	});
	
	// 评测中心
	require.registar('evaluationCenter',function(exports){
		var api='http://js.data.auto.qq.com/car_evaluat/manu_left.js';
		var letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var lettersExist={};
		var dom;
		
		function parseData(){
			if(!window._hq_left_nav)return;
			var brandList=_hq_left_nav._auto_left_nav_brand_list;
			var letterls=_hq_left_nav._auto_left_nav_letter_list;	
			var letterrs=['<dl id="auto-list-tree" class="auto-lists">']
			$.each(letters.split(''),function(index,letter){
				var brandls=letterls[letter];
				var brandrs=[];
				if(brandls.length){
					brandrs=['<dd id="letter-'+letter+'" class="tree-cate"><i class="letter">'+letter+'</i><ul>'];
					lettersExist[letter]=1;
					$.each(brandls,function(i,brand){
						var maunfls=brand['maunfacture_list'];
						var maunfrs=['<li><h4><a class="cate-name" href="javascript:;;">'+brand['name']+'</a><span class="open"></span></h4><dl class="items">']						
						
						$.each(maunfls,function(j,maunfid){
							var maunf=brandList[maunfid];
							var serialls=maunf['serial_list'];
							var serialrs=['<dt>'+maunf['name']+'</dt>'];							
							for(var key in serialls){
								serialrs.push('<dd><a target="_blank" href="'+serialls[key]['url']+'"><span class="item-name">'+serialls[key]['name']+'</span></a></dd>');
							}
							maunfrs.push(serialrs.join(''));
						});
						maunfrs.push('</dl></li>');
						brandrs.push(maunfrs.join(''));
					});				
					brandrs.push('</ul></dd>');
				}
				letterrs.push(brandrs.join(''));
			});
			letterrs.push('</dl>')
			insertData(letterrs);
		}
			
		
		function createLetterIndex(){
			var rs=[];
			$.each(letters.split(''),function(index,letter){
				rs.push(lettersExist[letter]?'<li><a href="#letter-'+letter+'">'+letter+'</a></li>':'<li>'+letter+'</li>');
			});
			return rs.join('');
		}
		function insertData(data){
			var letters=$('<ul class="letters"><ul>').html(createLetterIndex()||'')
			var results=$('<div class="results"><div>').html('<div id="auto-list-box">'+data.join('')+'</div>')
			$(dom).append(letters).append(results);
		
		}
		function parseEvent(event){
			var target=$(event.target);
			if(target.closest('.letters').length){
				$.stopEvent(event);
				catTo(target.closest('a').attr('href'));
			}
			if(target.closest('h4')){
				openTree(target.closest('h4'));
			}
			
		}
		
		function catTo(cat){
			cat='#'+cat.split('#').pop(); //兼容ie 67
			if(cat){
				dom.find('.results').scrollTop($(cat).position().top);
			}
		}
		function openTree(el){
			$(el).closest('.tree-cate').siblings().find('.state-open').removeClass('state-open').find('.items').hide();
			var ico=$(el).closest('li');
			ico.is('.state-open')?$(el).siblings('.items').hide():$(el).siblings('.items').show();
			ico.toggleClass('state-open').siblings('.state-open').removeClass('state-open').find('.items').hide();
			
		}
		
		exports.init=function(selector){
			dom=$(selector).bind('click',parseEvent);			
			$.getScript(api,parseData);
		}
		
	});
	
	// 购车-选车
	require.registar('selectAndBuyCar',function(exports){
		var api='http://js.data.auto.qq.com/car_public/brand_man_serial_auto.js';
		var db;
		
		function moduleDb(data){
			data=data||[];			
			var db={
				serial:data,
				search:function(key,fn){
					var list=typeof key =="object"?key:this[key];
					list=list.reverse(),i=list.length;
					while(i--)fn(list[i]);
					list.reverse();
				}
			}
			
			var budget=["7\u4e07\u4ee5\u4e0b","7-10\u4e07","10-15\u4e07","15-22\u4e07","22-35\u4e07","35-50\u4e07","50-100\u4e07","100-300\u4e07","300\u4e07\u4ee5\u4e0a"],
				nation=["\u4e2d\u56fd","\u7f8e\u56fd","\u5fb7\u56fd","\u65e5\u672c","\u6cd5\u56fd","\u82f1\u56fd","\u610f\u5927\u5229"].join("|");
				for(var i=0,len=data.length;i<len;i+=1){
					var serial=data[i];
					var option=((~nation.indexOf(serial.BCountry))?serial.BCountry:"\u5176\u4ed6")+"|"+serial.Level+"|"+serial.Useway;
					var max=+serial.PriceHigh,min=+serial.PriceLow;
					$.each(budget,function(a,b){
						var c,d,e=b.split("-");
						if(e.length==2){
							c=parseInt(e[0]),d=parseInt(e[1]);
						}else{
							c=parseInt(e[0]);
							if(c>7){
								c=c;
								d=1000000;
							}else{
								c=0.0001;
								d=7;
							}
						}
						if((max>c&&max<d)||(!(min<c)&&min<d)||(min<c&&max>d)){
							option+=("|"+b);
						}
					
					});
					serial.option=option;
				}
			return db;		
		}
		function _getTpl(){
			var tpl='<li>\
						<a href="http://data.auto.qq.com/car_serial/{ID}" target="_blank" class="pic">\
							<img style="width:100%;height:100%;" src="http://img1.gtimg.com/datalib_img/{Pic}" alt="">\
						</a>\
						<a href="http://data.auto.qq.com/car_serial/{ID}" target="_blank" class="txt">{Name}</a>\
					</li>';
			return tpl.replace(/\s+/g," ");						
		}
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (searchElement , fromIndex) {
				var i,pivot = (fromIndex) ? fromIndex : 0,length;
				if (!this) {
					throw new TypeError();
				}
				length = this.length;
				if (length === 0 || pivot >= length){
					return -1;
				}
				if (pivot < 0) {
					pivot = length - Math.abs(pivot);
				}
				for (i = pivot; i < length; i++){
					if (this[i] === searchElement) {
						return i;
					}
				}
				return -1;
			}
		}
		
		$.extend(exports,{_type:'brand',
			_rule:{budget:[],nation:[],use:[],level:[]},
			_letter:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			_viewCount:4,
			_ltExist:{},
			_existOption:{nation:{},level:{},use:{},budget:{}},
			addRule:function(key,value){
				this._rule[key]=new Array(value);
			},
			removeRule:function(key,value){
				this._rule[key]=new Array();
			},
			ruleURLPStr:function(){
				var hash=this.rule2Hash();
				return this._type+'#'+hash;
			},
			rule2Hash:function(){
				var rl=this._rule;
				var hs=rl["budget"].join("-")+"_"+rl["nation"].join("-")+"_"+rl["use"].join("-")+"_"+rl["level"].join("-");
				return encodeURI(hs);
			},
			clear:function(key){
				this._rule[key]=new Array();
			},
			clearAll:function(){
				var key="budget,nation,use,level",_rule=this._rule;
				$.each(key.split(","),function(a,b){
					_rule[b]=new Array();
				})
			},
			switchRule:function(key,value){
				var rl=this._rule;
				rl[key]&&((rl[key].indexOf(value)+1)?this.removeRule(key,value):this.addRule(key,value));
			},
			cmd:function(cmd){
				cmd=typeof cmd =="string" ? cmd.split("."):"";
				var fn=this[cmd.shift()];
				typeof fn=="function" && fn.apply(this,cmd)
			},
			regSearch:function(){
				var value=location.search.substr(1)||"brand";
				value&&(this._type=value)
			},
			setSearch:function(value){
				value=value||"brand";
				this._type=value;
			},
			insertContainer:function(arr){
				var div=$("<div/>"),container=$(this.container),cb=this.callback;
				var html=arr.join("");
				arr=null;
				jQuery.browser.ie67&&(html=html.replace(/eventForIE6/g,' onmouseover=\'javascript:jQuery(this).addClass("hover").parents(".listAll").addClass("hover");\' onmouseout=\'javascript:jQuery(this).removeClass("hover").parents(".listAll").removeClass("hover");\' '));
				html = $(html);
				div.append(html);
				container.append(div);
				cb&&cb(div[0]);
				div=null,html=null,container=null,cb=null;
			},
			batchProcess:function(arr,fn){
				if(!arr.length)return;
				fn.call(this,arr.splice(0,5));
				var _this=this,_arg=arguments;
				setTimeout(function(){_this.batchProcess.apply(_this,_arg)},100);
			},
			searchSerial:function(){
				var letter=this._letter.split("").reverse(),items={};
				var sTpl=_getTpl(),ltExist=this._ltExist={},existOption={};
				var vReg=/\{(\w+)\}/g;
				
				var letterType=this._type=='brand'?'BLetter':'FirstLetter';
				
				var rl=this._rule;
				var budget=rl["budget"].join(""),nation=rl["nation"].join("-"),level=rl["level"].join("-"),use=rl["use"].join("-");
				
				
				var result=[];
				db.search("serial",function(serial){
					var option=serial.option;
					if((!budget||option.indexOf(budget)+1)&&(!level||option.indexOf(level)+1)&&(!use||option.indexOf(use)+1)){
						result.push(serial);
						$.each(serial["option"].split("|"),function(a,b){existOption[$.trim(b)]=true})
					}
				});						
				// debugger;
				var count=0;
				this._existOption=existOption;
				this.beMark();
				existOption={};
				db.search(result,function(serial){
					var option=serial.option;
					if((!nation||serial.option.indexOf(nation)+1)&&serial.ProducingState!='\u505c\u4ea7'){
						var index=serial[letterType];
						ltExist[index]=true;
						!items[index]&&(items[index]=[]);
						count++;
						items[index].push(sTpl.replace(vReg,function($1,$2){
							return serial[$2]||""
						}));
						$.each(serial['option'].split('|'),function(a,b){existOption[$.trim(b)]=true})
					
					}
				})						
				this._existOption=existOption;
				this._count=count;
				var i=letter.length,larr=[]; 
				var _viewCount=this._viewCount;
				var tpArr=[];
				//debugger;
				while(i--){
					var index=letter[i];
					if(items[index]){
						_viewCount&&(_viewCount--,larr.push(items[index].shift()));
						tpArr=tpArr.concat(items[index]);
					}
				}
				var fillStr=tpArr.splice(0,_viewCount).join('');
				fillStr&&larr.push(fillStr);
				this.batchProcess(larr,this.insertContainer);
			},
			beAnchor:function(){
				var ltArr=[],ltExist=this._ltExist,widgetName=jQuery.widgetName;
				var ruleURLPStr=this.ruleURLPStr();
				$.each(this._letter.split(""),function(i,l){
					var anchor=ltExist[l]?('<a target="_blank" href="http://data.auto.qq.com/car_brand/index.shtml?'+ruleURLPStr+'_container_'+l+'">'+l+'</a>'):('<a href="javascript:;" class="disable">'+l+'</a>');
					ltArr.push(anchor);
				});
				$(".letter",this.selector).html(ltArr.join(""));
			},
			beMark:function(_breakName){
				var keys=["budget","nation","use","level"],rl=this._rule,tSelector="#select4"+this._type;
				var existOption=this._existOption;
				$(tSelector).length && ($(tSelector)[0].checked=true);
				$(".quickOption li",this.selector).each(function(i,b){
					var key=keys[i];
					if(key==_breakName){return}
					var r=rl[key];
					$("a",b).each(function(n,el){
						el=$(el);
						var rStr=r?r.join("-"):"";
						var rReg=el.attr("value");
						rReg=rReg.substr(rReg.lastIndexOf(".")+1);
							if(!existOption[rReg]&&!el.hasClass("clear")){
								el.addClass("disable");return;									
							}else{										
								el.removeClass("disable")
							}
						(rStr.indexOf(rReg)+1)&&(el.addClass("select").siblings().removeClass("select"));
					})
					!r.length&&$(".clear",b).addClass("select").siblings().removeClass("select");
				});
			},
			selectedOption:function(){
				var txt='<h3>\u5f53\u524d\u9009\u62e9\u8f66\u8f86\u6761\u4ef6</h3>',keys=['budget','nation','use','level'],rule=this._rule,rs=[];
					$.each(keys,function(n,key){
						var item=rule[key].join('');
						item&&rs.push('<a href="javascript:;" value="clear.'+key+'.'+item+'" class="selected">'+item+'</a>')
					});
					rs=rs.length?'<li>'+txt+rs.join('')+'<a href="javascript:;" value="clearAll" class="clearAllBtn" >\u6e05\u7a7a</a></li>':' ';
					$(".selectedOption",this.selector).html(rs)
			},
			query:function(){
				this.container.empty();
				this.searchSerial();
				this.beAnchor();
				this.beMark("nation");
				this.selectedOption();
			}
		})
		 
		exports.searchCar=function(selector){
			var qs=this;
			qs.container=$("#model_list").empty();
			qs.selector=selector;
			qs.callback=function(div){
				if(qs._count<=qs._viewCount)return;
				var link='http://data.auto.qq.com/car_brand/index.shtml?'+qs.ruleURLPStr();
				var readMore='<li class="last"><a href="'+link+'" target="_blank" class="pic">\
									<b style="display:block;">\u70b9\u51fb\u67e5\u770b\u66f4\u591a\u7ed3\u679c<br>\u8f66\u578b('+qs._count+'\u6b3e)</b>\
								</a>\
								<a href="'+link+'" target="_blank" class="txt">\u67e5\u770b\u66f4\u591a</a>\
							</li>';
					$(div).append(readMore.replace(/\s+/,' '));
			}
			
			// 按 品牌|车系 切换
			$("input[type=radio]",selector).unbind().bind("click",function(){
				qs.setSearch(this.value);
				qs.query();
				return;
			});
			
			// 多关键字组合检索
			$(".quicklyBody",selector).unbind().bind("click",function(e){
				var el=$(e.target),cmd=el.attr("value");							
				if(!el.is("a")||el.is(".disable"))return;
				if(el.hasClass("clear")&&el.hasClass("select"))return;
				$(selector).addClass("disable");
				cmd&&qs.cmd(cmd);
				qs.query();
				setTimeout(function(){$(selector).removeClass("disable")},1000);
				return;
			});
			qs.query();
		}
		
		exports.getVisit=function(){
			var C_Visit=$.cookie("wz_autoapp_ReviewSerials");
			var visitLink=[],competition=[],serialId=[],competitionLink=[];
			if(C_Visit){
				C_Visit=C_Visit.split("|").reverse();
				$.each(C_Visit,function(a,b){
					var item;
					b&&(item=b.split(","));
					if(item.length==3){
						var id=item[1];
						visitLink.push('<a target="_blank"  href="http://data.auto.qq.com/car_serial/'+id+'">'+item[0]+'</a>');
						serialId.push(+id)				
					}				
				});
				serialId=serialId.splice(0,2);
				db.search("serial",function(serial){
					var sid=serial.ID,serialCompetion=serial.Competionserial;
					((sid==serialId[0]||sid==serialId[1])&&serialCompetion)&&(competition.push(serialCompetion))				
				});
				$.each(competition,function(a,b){
					$.each(b.split(";"),function(c,d){
						var item=d.split("|");
						(item.length==2)&&competitionLink.push('<a target="_blank" href="http://data.auto.qq.com/car_serial/'+item[0]+'">'+item[1]+'</a>')
					});
				});
			}
			var domHistory=$("#search .history");
			var domLike=$("#search .like");
			visitLink.length?domHistory.show().children("p").html(visitLink.join("")):domHistory.remove();
			competitionLink.length?domLike.show().children("p").html(competitionLink.join("")):domLike.remove();
		}
		
		exports.init=function(selector){
			if(!$(selector).length){return;}
			var self=this;
			$.getScript(api,function(){
				if(window.oBrandSerialData){
					db=moduleDb(oBrandSerialData.list);
					self.searchCar(selector);
					self.getVisit();
				}			
			})
			
		}
	});
	
	require.registar('quotation',function(exports){

		var dom;
		var requireData ={};
		requireData.local = {};
		requireData.picList = {};
		requireData.newsList ={};
		requireData.recommend = {};
		function getApi(key,id){
			var api={
				'localQuotation':'http://wecar.qq.com/api/recomm/index',
				'1':{
					'picurl':'/c/2014/hq/homemarket.htm',//'picurl':'/buycar/homemarket/cshq.htm',
					'newsurl':'/c/2014/hq/homemarket_a.htm',//'newsurl':'/buycar/homemarket/cshq_a.htm',
					'recomurl':'/index_inc/2014/tuijian_qg.htm'
				},
				'54':{
					'picurl':'/c/2014/hq/beijing.htm',//'picurl':'/buycar/homemarket/hq_beijing/cshq_bj.htm',
					'newsurl':'/c/2014/hq/beijing_a.htm',//'newsurl':'/buycar/homemarket/hq_beijing/cshq_bj_a.htm',
					'recomurl':'/index_inc/2014/tuijian_bj.htm'
				}
			}
			return api[key]||'';
		}
		//创建iframe
		function createPostContainer(_url,func,container,errFunc){
			var self      = this;
			var oArea     = (container && container.length) ? container : $(document.body);
			var oFrame    = $('#_messagepost').size() ? $('#_messagepost') : $('<iframe id="_messagepost" name="_messagepost" style="display:none"></iframe>').appendTo(oArea);
			oFrame.unbind().bind('load',function(result){
				try{
					if(this.contentWindow.data){
						var oData = this.contentWindow.data;
						if(oData && oData.ret == 0){
							typeof func === 'function' && func(oData);
						}else{
							if(typeof errFunc === 'function'){
								return errFunc(oData);
							}
						}
					}
					oFrame.remove();
				}catch(err){}
				
			});
			var _form     = $('#_messageform');
				(_form && _form.size()) ?(function(){
					_form.attr('action',_url);
					_form.get(0).reset();
				})() : _form = $('<form action="'+ _url +'" method="post" target="_messagepost" id="_messageform" style="display:none;"></form>').appendTo(oArea);
			return _form;
		}
		//拉取接口数据
		function setQuotationPrice(dom,id){
			var local   = dom.find('.local');
			var tab_con = local.find('.price_box');
			var _li     = local.find('.tab_menu li');
			tab_con.find('.tab_con').remove();
			$('<div class="tab_con"><table><tbody><tr><td>loading...</td></tr></tbody></table></div>').appendTo(tab_con);
			if(requireData.local[id] == undefined){
				var _form   = createPostContainer(getApi('localQuotation',''),function(_data){
					if (_data.ret == 0){
						requireData.local[id] = _data.data;
						setLiClick(_li,tab_con,_data.data);						
					}else{
						//console.log(_data.info)
					}
				});
				if(_form && _form.size()){
					var form   = _form.empty().append($('<input name="site" type="hidden" value="dwhome"/>'))
										 .append($('<input name="provinceid" type="hidden" value="'+id+'"/>'))
										 .append($('<input name="num" type="hidden" value="12"/>'));
					_form.submit();
				}
				_form.remove();
			}else{
				setLiClick(_li,tab_con,requireData.local[id]);
			}
		}
		//设置li初始点击
		function setLiClick(el,dom,data){
			el.hover(function(){
				var _this = $(this);
				_this.siblings('li').removeClass('active');
				_this.addClass('active');
				dom.find('.tab_con').hide();
				dom.find('.tab_con').eq(_this.index()).show();
			});
			getLocalList(dom,data);
			el.removeClass('active');
			el.eq(0).addClass('active');
		}
		//dom列表渲染
		function getLocalList(dom,data){		
			var list = [];
			$.each(data,function(n){
				if(n>=1 && n<7){
					if(n==1){
						list.push('<div class="tab_con">');
					}else{
						list.push('<div class="tab_con" style="display:none;">');
					}
					list.push('<table cellspacing="0" cellpadding="0"><thead><tr><th class="th1">车系</th><th class="th2">车型</th><th class="th3">指导价</th><th class="th4">经销商报价</th><th class="th5">经销商</th><th></th></tr></thead><tbody>')
					if(data[n].length == 0){
						list.push('<tr><td colspan="6">暂无相关信息</td></tr>');
					}else{
						$.each(data[n],function(){
							list.push('<tr><td><a href="'+this.model_url+'" target="_blank">'+this.serial_name+'</a></td><td><a href="'+this.model_url+'" target="_blank">'+this.model_name+'</a></td><td>'+this.guide_price+'万</td><td>'+this.shop_price+'万</td><td><a href="'+this.dealer_url+'" target="_blank">'+this.short_name+'</a></td><td><a href="'+this.model_url+'" target="_blank" class="ask_price_btn">询价</a></td></tr>');
						})
					}
					list.push('</tbody></table></div>');
				}
			})
			dom.find('.tab_con').remove();
			$(list.join('')).appendTo(dom);
		}
		function localInfo(_url,_dom,_id,name,bossName){
			var _data = requireData[name];
			if(_data[_id])
				{
					_dom.replaceWith($(_data[_id]));
				}
			else
				{
					$.ajax({
						url: _url,
						data: {id:_id},
						dataType: 'html',
						success:function(data){
							if(data.length){
								var newdom = $(data).attr('bosszone',bossName);
								var _img = newdom.find('img');
								$.each(_img,function(){
									var _this = $(this);
									_this.attr('_src') && _this.attr('src',_this.attr('_src'));
								})
								_dom.replaceWith(newdom);
								_data[_id] = newdom.prop('outerHTML');
							}else{
								_dom.html('<p>暂无相关信息</p>');
							}
						}
					});
				}
		}	
		exports.init=function(el){
			dom=$(el);
			if(!dom.length){return false;}			
			var change    = dom.find('.changecity');
			var cityname  = dom.find('.city_name');
			var citybox   = dom.find('.city_options_box');
			var citybox_a = dom.find('.city_options_box a');
			var con = $('.cshq');
			change.unbind().click(function(){
				$(this).find('.down').toggleClass('up');
				citybox.toggle();
			})
			citybox_a.unbind().click(function(){
				var _this = $(this);
				var _id = _this.attr('id');
				var _picList  = con.find('.pics_list');
				var _newsList = con.find('.links_list');
				var _recommend   = con.find('.recommend');
				cityname.html(_this.html());
				change.find('.down').toggleClass('up');
				citybox.toggle();
				if(getApi(_id)){
					var _picListUrl   = getApi(_id).picurl;
					var _newsUrl      = getApi(_id).newsurl;
					var _recommentUrl = getApi(_id).recomurl;
				}else{
					var _prov = _this.attr('prov');
					var _city = _this.attr('city');
					var _abbr = _this.attr('abbr');
					var url1 = "/c/2014/hq/";//var url1 = "/buycar/homemarket/";
					var url2 = "/index_inc/2014/";
					var _picListUrl   = url1+ _city + '.htm';
					//var _picListUrl   = url1+ 'hq_'+ (_prov ? _prov + '/hq_' : '') + _city +  '/cshq_' + _abbr + '.htm';
					var _newsUrl      = url1+ _city + '_a.htm';
					//var _newsUrl      = url1+ 'hq_'+ (_prov ? _prov + '/hq_' : '') + _city +  '/cshq_' + _abbr + '_a.htm';
					var _recommentUrl = url2+ _city+ "auto/tuijian.htm" ;
				}
				localInfo(_picListUrl,_picList,_id,'picList','hqt');//本地图文
				localInfo(_newsUrl,_newsList,_id,'newsList','hqw');//本地新闻
				localInfo(_recommentUrl,_recommend,_id,'recommend','');//推荐经销商
				setQuotationPrice(con,_id);//本地行情
				
			})
			setQuotationPrice(con,1);//初始全国本地行情
			
		}
	
	});
	
	// 
	$(function(){
		require('selectCarCenter').init(); //选车中心
		$('#cp_cxdq').length && require('visitHistory').init('#cp_cxdq'); //浏览历史
		$('.search_ipt').length && $.getScript('http://mat1.gtimg.com/auto/2014/js/auto.dev.js'); //顶部搜索
		$('.depreciate').length && require('getTopList').init('.depreciate'); //top排行榜
		$('#evaluationCenter').length && require('evaluationCenter').init('#evaluationCenter'); //评测中心
		$('#quickly').length && require('selectAndBuyCar').init('#quickly'); //选车|买车
		$('.cshy_top').length && require('quotation').init('.cshy_top');//车市行情
		$('.brand_rank').length && require('serialTop').init('.brand_rank');//车系排行榜
	})
	
})(window.jQuery)/*  |xGv00|872b4a831ef567d3810022f80f1d1be8 */
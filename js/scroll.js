// JavaScript Document
var x = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};


var Scroller = Class.create();
Scroller.prototype = {
  initialize: function(idScroller, idScrollMid, options) {
    var oScroll = this, oScroller = x(idScroller), oScrollMid = x(idScrollMid);
    
    this.heightScroller = oScroller.offsetHeight;
    this.heightList = oScrollMid.offsetHeight;
    
    if(this.heightList <= this.heightScroller) return;
    
    oScroller.style.overflow = "hidden";
    oScrollMid.appendChild(oScrollMid.cloneNode(true));
    
    this.oScroller = oScroller;    
    this.timer = null;
    
    this.SetOptions(options);
    
    this.side = 1;//1���� -1����
    switch (this.options.Side) {
        case "down" :
            this.side = -1;
            break;
        case "up" :
        default :
            this.side = 1;
    }
    
    addEventHandler(oScrollMid , "mouseover", function() { oScroll.Stop(); });
    addEventHandler(oScrollMid , "mouseout", function() { oScroll.Start(); });
    
    if(this.options.PauseStep <= 0 || this.options.PauseHeight <= 0) this.options.PauseStep = this.options.PauseHeight = 0;
    this.Pause = 0;
    
    this.Start();
  },
  //����Ĭ������
  SetOptions: function(options) {
    this.options = {//Ĭ��ֵ
      Step:            1,//ÿ�α仯��px��
      Time:            2,//�ٶ�(Խ��Խ��)
      Side:            "up",//��������:"up"���ϣ�"down"����
      PauseHeight:    0,//�����ͣһ��
      PauseStep:    5000//ͣ��ʱ��(PauseHeight����0�ò�������Ч)
    };
    Object.extend(this.options, options || {});
  },
  //����
  Scroll: function() {
    var iScroll = this.oScroller.scrollTop, iHeight = this.heightList, time = this.options.Time, oScroll = this, iStep = this.options.Step * this.side;
    
    if(this.side > 0){
        if(iScroll >= (iHeight * 2 - this.heightScroller)){ iScroll -= iHeight; }
    } else {
        if(iScroll <= 0){ iScroll += iHeight; }
    }
    
    if(this.options.PauseHeight > 0){
        if(this.Pause >= this.options.PauseHeight){
            time = this.options.PauseStep;
            this.Pause = 0;
        } else {
            this.Pause += Math.abs(iStep);
            this.oScroller.scrollTop = iScroll + iStep;
        }
    } else { this.oScroller.scrollTop = iScroll + iStep; }
    
    this.timer = window.setTimeout(function(){ oScroll.Scroll(); }, time);
  },
  //��ʼ
  Start: function() {
    this.Scroll();
  },
  //ֹͣ
  Stop: function() {
    clearTimeout(this.timer);
  }
};

window.onload = function(){
    new Scroller("idScroller", "idScrollMid",{ PauseHeight:57 });
}

//iScroll
(function(){function j(n,l){var o=this,m;o.element=typeof n=="object"?n:document.getElementById(n);o.wrapper=o.element.parentNode;o.element.style.webkitTransitionProperty="-webkit-transform";o.element.style.webkitTransitionTimingFunction="cubic-bezier(0,0,0.25,1)";o.element.style.webkitTransitionDuration="0";o.element.style.webkitTransform=h+"0,0"+b;o.options={bounce:d,momentum:d,checkDOMChanges:true,topOnDOMChanges:false,hScrollbar:d,vScrollbar:d,fadeScrollbar:g||!a,shrinkScrollbar:g||!a,desktopCompatibility:false,overflow:"auto",snap:false,bounceLock:false,scrollbarColor:"rgba(0,0,0,0.5)",onScrollEnd:function(){}};if(typeof l=="object"){for(m in l){o.options[m]=l[m]}}if(o.options.desktopCompatibility){o.options.overflow="hidden"}o.onScrollEnd=o.options.onScrollEnd;delete o.options.onScrollEnd;o.wrapper.style.overflow=o.options.overflow;o.refresh();window.addEventListener("onorientationchange" in window?"orientationchange":"resize",o,false);if(a||o.options.desktopCompatibility){o.element.addEventListener(f,o,false);o.element.addEventListener(i,o,false);o.element.addEventListener(e,o,false)}if(o.options.checkDOMChanges){o.element.addEventListener("DOMSubtreeModified",o,false)}}j.prototype={x:0,y:0,enabled:true,handleEvent:function(m){var l=this;switch(m.type){case f:l.touchStart(m);break;case i:l.touchMove(m);break;case e:l.touchEnd(m);break;case"webkitTransitionEnd":l.transitionEnd();break;case"orientationchange":case"resize":l.refresh();break;case"DOMSubtreeModified":l.onDOMModified(m);break}},onDOMModified:function(m){var l=this;if(m.target.parentNode!=l.element){return}setTimeout(function(){l.refresh()},0);if(l.options.topOnDOMChanges&&(l.x!=0||l.y!=0)){l.scrollTo(0,0,"0")}},refresh:function(){var m=this,o=m.x,n=m.y,l;m.scrollWidth=m.wrapper.clientWidth;m.scrollHeight=m.wrapper.clientHeight;m.scrollerWidth=m.element.offsetWidth;m.scrollerHeight=m.element.offsetHeight;m.maxScrollX=m.scrollWidth-m.scrollerWidth;m.maxScrollY=m.scrollHeight-m.scrollerHeight;m.directionX=0;m.directionY=0;if(m.scrollX){if(m.maxScrollX>=0){o=0}else{if(m.x<m.maxScrollX){o=m.maxScrollX}}}if(m.scrollY){if(m.maxScrollY>=0){n=0}else{if(m.y<m.maxScrollY){n=m.maxScrollY}}}if(m.options.snap){m.maxPageX=-Math.floor(m.maxScrollX/m.scrollWidth);m.maxPageY=-Math.floor(m.maxScrollY/m.scrollHeight);l=m.snap(o,n);o=l.x;n=l.y}if(o!=m.x||n!=m.y){m.setTransitionTime("0");m.setPosition(o,n,true)}m.scrollX=m.scrollerWidth>m.scrollWidth;m.scrollY=!m.options.bounceLock&&!m.scrollX||m.scrollerHeight>m.scrollHeight;if(m.options.hScrollbar&&m.scrollX){m.scrollBarX=m.scrollBarX||new k("horizontal",m.wrapper,m.options.fadeScrollbar,m.options.shrinkScrollbar,m.options.scrollbarColor);m.scrollBarX.init(m.scrollWidth,m.scrollerWidth)}else{if(m.scrollBarX){m.scrollBarX=m.scrollBarX.remove()}}if(m.options.vScrollbar&&m.scrollY&&m.scrollerHeight>m.scrollHeight){m.scrollBarY=m.scrollBarY||new k("vertical",m.wrapper,m.options.fadeScrollbar,m.options.shrinkScrollbar,m.options.scrollbarColor);m.scrollBarY.init(m.scrollHeight,m.scrollerHeight)}else{if(m.scrollBarY){m.scrollBarY=m.scrollBarY.remove()}}},setPosition:function(l,o,n){var m=this;m.x=l;m.y=o;m.element.style.webkitTransform=h+m.x+"px,"+m.y+"px"+b;if(!n){if(m.scrollBarX){m.scrollBarX.setPosition(m.x)}if(m.scrollBarY){m.scrollBarY.setPosition(m.y)}}},setTransitionTime:function(m){var l=this;m=m||"0";l.element.style.webkitTransitionDuration=m;if(l.scrollBarX){l.scrollBarX.bar.style.webkitTransitionDuration=m;l.scrollBarX.wrapper.style.webkitTransitionDuration=d&&l.options.fadeScrollbar?"300ms":"0"}if(l.scrollBarY){l.scrollBarY.bar.style.webkitTransitionDuration=m;l.scrollBarY.wrapper.style.webkitTransitionDuration=d&&l.options.fadeScrollbar?"300ms":"0"}},touchStart:function(n){var m=this,l;if(!m.enabled){return}n.preventDefault();n.stopPropagation();m.scrolling=true;m.moved=false;m.distX=0;m.distY=0;m.setTransitionTime("0");if(m.options.momentum||m.options.snap){l=new WebKitCSSMatrix(window.getComputedStyle(m.element).webkitTransform);if(l.e!=m.x||l.f!=m.y){document.removeEventListener("webkitTransitionEnd",m,false);m.setPosition(l.e,l.f);m.moved=true}}m.touchStartX=a?n.changedTouches[0].pageX:n.pageX;m.scrollStartX=m.x;m.touchStartY=a?n.changedTouches[0].pageY:n.pageY;m.scrollStartY=m.y;m.scrollStartTime=n.timeStamp;m.directionX=0;m.directionY=0},touchMove:function(r){if(!this.scrolling){return}var p=this,o=a?r.changedTouches[0].pageX:r.pageX,n=a?r.changedTouches[0].pageY:r.pageY,m=p.scrollX?o-p.touchStartX:0,l=p.scrollY?n-p.touchStartY:0,s=p.x+m,q=p.y+l;r.stopPropagation();p.touchStartX=o;p.touchStartY=n;if(s>=0||s<p.maxScrollX){s=p.options.bounce?Math.round(p.x+m/3):(s>=0||p.maxScrollX>=0)?0:p.maxScrollX}if(q>=0||q<p.maxScrollY){q=p.options.bounce?Math.round(p.y+l/3):(q>=0||p.maxScrollY>=0)?0:p.maxScrollY}if(p.distX+p.distY>5){if(p.distX-3>p.distY){q=p.y;l=0}else{if(p.distY-3>p.distX){s=p.x;m=0}}p.setPosition(s,q);p.moved=true;p.directionX=m>0?-1:1;p.directionY=l>0?-1:1}else{p.distX+=Math.abs(m);p.distY+=Math.abs(l)}},touchEnd:function(t){if(!this.scrolling){return}var s=this,o=t.timeStamp-s.scrollStartTime,w=a?t.changedTouches[0]:t,u,v,n,l,m=0,r=s.x,q=s.y,p;s.scrolling=false;if(!s.moved){s.resetPosition();if(a){u=w.target;while(u.nodeType!=1){u=u.parentNode}v=document.createEvent("MouseEvents");v.initMouseEvent("click",true,true,t.view,1,w.screenX,w.screenY,w.clientX,w.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,0,null);v._fake=true;u.dispatchEvent(v)}return}if(!s.options.snap&&o>250){s.resetPosition();return}if(s.options.momentum){n=s.scrollX===true?s.momentum(s.x-s.scrollStartX,o,s.options.bounce?-s.x+s.scrollWidth/5:-s.x,s.options.bounce?s.x+s.scrollerWidth-s.scrollWidth+s.scrollWidth/5:s.x+s.scrollerWidth-s.scrollWidth):{dist:0,time:0};l=s.scrollY===true?s.momentum(s.y-s.scrollStartY,o,s.options.bounce?-s.y+s.scrollHeight/5:-s.y,s.options.bounce?(s.maxScrollY<0?s.y+s.scrollerHeight-s.scrollHeight:0)+s.scrollHeight/5:s.y+s.scrollerHeight-s.scrollHeight):{dist:0,time:0};m=Math.max(Math.max(n.time,l.time),1);r=s.x+n.dist;q=s.y+l.dist}if(s.options.snap){p=s.snap(r,q);r=p.x;q=p.y;m=Math.max(p.time,m)}s.scrollTo(r,q,m+"ms")},transitionEnd:function(){var l=this;document.removeEventListener("webkitTransitionEnd",l,false);l.resetPosition()},resetPosition:function(){var l=this,n=l.x,m=l.y;if(l.x>=0){n=0}else{if(l.x<l.maxScrollX){n=l.maxScrollX}}if(l.y>=0||l.maxScrollY>0){m=0}else{if(l.y<l.maxScrollY){m=l.maxScrollY}}if(n!=l.x||m!=l.y){l.scrollTo(n,m)}else{if(l.moved){l.onScrollEnd();l.moved=false}if(l.scrollBarX){l.scrollBarX.hide()}if(l.scrollBarY){l.scrollBarY.hide()}}},snap:function(l,o){var m=this,n;if(m.directionX>0){l=Math.floor(l/m.scrollWidth)}else{if(m.directionX<0){l=Math.ceil(l/m.scrollWidth)}else{l=Math.round(l/m.scrollWidth)}}m.pageX=-l;l=l*m.scrollWidth;if(l>0){l=m.pageX=0}else{if(l<m.maxScrollX){m.pageX=m.maxPageX;l=m.maxScrollX}}if(m.directionY>0){o=Math.floor(o/m.scrollHeight)}else{if(m.directionY<0){o=Math.ceil(o/m.scrollHeight)}else{o=Math.round(o/m.scrollHeight)}}m.pageY=-o;o=o*m.scrollHeight;if(o>0){o=m.pageY=0}else{if(o<m.maxScrollY){m.pageY=m.maxPageY;o=m.maxScrollY}}n=Math.round(Math.max(Math.abs(m.x-l)/m.scrollWidth*500,Math.abs(m.y-o)/m.scrollHeight*500));return{x:l,y:o,time:n}},scrollTo:function(m,l,o){var n=this;if(n.x==m&&n.y==l){n.resetPosition();return}n.moved=true;n.setTransitionTime(o||"350ms");n.setPosition(m,l);if(o==="0"||o=="0s"||o=="0ms"){n.resetPosition()}else{document.addEventListener("webkitTransitionEnd",n,false)}},scrollToPage:function(n,m,p){var o=this,l;if(!o.options.snap){o.pageX=-Math.round(o.x/o.scrollWidth);o.pageY=-Math.round(o.y/o.scrollHeight)}if(n=="next"){n=++o.pageX}else{if(n=="prev"){n=--o.pageX}}if(m=="next"){m=++o.pageY}else{if(m=="prev"){m=--o.pageY}}n=-n*o.scrollWidth;m=-m*o.scrollHeight;l=o.snap(n,m);n=l.x;m=l.y;o.scrollTo(n,m,p||"500ms")},scrollToElement:function(m,o){m=typeof m=="object"?m:this.element.querySelector(m);if(!m){return}var n=this,l=n.scrollX?-m.offsetLeft:0,p=n.scrollY?-m.offsetTop:0;if(l>=0){l=0}else{if(l<n.maxScrollX){l=n.maxScrollX}}if(p>=0){p=0}else{if(p<n.maxScrollY){p=n.maxScrollY}}n.scrollTo(l,p,o)},momentum:function(s,m,q,l){var p=2.5,r=1.2,n=Math.abs(s)/m*1000,o=n*n/p/1000,t=0;if(s>0&&o>q){n=n*q/o/p;o=q}else{if(s<0&&o>l){n=n*l/o/p;o=l}}o=o*(s<0?-1:1);t=n/r;return{dist:Math.round(o),time:Math.round(t)}},destroy:function(l){var m=this;window.removeEventListener("onorientationchange" in window?"orientationchange":"resize",m,false);m.element.removeEventListener(f,m,false);m.element.removeEventListener(i,m,false);m.element.removeEventListener(e,m,false);document.removeEventListener("webkitTransitionEnd",m,false);if(m.options.checkDOMChanges){m.element.removeEventListener("DOMSubtreeModified",m,false)}if(m.scrollBarX){m.scrollBarX=m.scrollBarX.remove()}if(m.scrollBarY){m.scrollBarY=m.scrollBarY.remove()}if(l){m.wrapper.parentNode.removeChild(m.wrapper)}return null}};function k(m,r,q,n,l){var o=this,p=document;o.dir=m;o.fade=q;o.shrink=n;o.uid=++c;o.bar=p.createElement("div");o.bar.style.cssText="position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:10;background:"+l+";-webkit-transform:"+h+"0,0"+b+";"+(m=="horizontal"?"-webkit-border-radius:3px 2px;min-width:6px;min-height:5px":"-webkit-border-radius:2px 3px;min-width:5px;min-height:6px");o.wrapper=p.createElement("div");o.wrapper.style.cssText="-webkit-mask:-webkit-canvas(scrollbar"+o.uid+o.dir+");position:absolute;z-index:10;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:"+(q?"300ms":"0")+";-webkit-transition-delay:0;-webkit-transition-property:opacity;"+(o.dir=="horizontal"?"bottom:2px;left:2px;right:7px;height:5px":"top:2px;right:2px;bottom:7px;width:5px;");o.wrapper.appendChild(o.bar);r.appendChild(o.wrapper)}k.prototype={init:function(l,n){var o=this,q=document,p=Math.PI,m;if(o.dir=="horizontal"){if(o.maxSize!=o.wrapper.offsetWidth){o.maxSize=o.wrapper.offsetWidth;m=q.getCSSCanvasContext("2d","scrollbar"+o.uid+o.dir,o.maxSize,5);m.fillStyle="rgb(0,0,0)";m.beginPath();m.arc(2.5,2.5,2.5,p/2,-p/2,false);m.lineTo(o.maxSize-2.5,0);m.arc(o.maxSize-2.5,2.5,2.5,-p/2,p/2,false);m.closePath();m.fill()}}else{if(o.maxSize!=o.wrapper.offsetHeight){o.maxSize=o.wrapper.offsetHeight;m=q.getCSSCanvasContext("2d","scrollbar"+o.uid+o.dir,5,o.maxSize);m.fillStyle="rgb(0,0,0)";m.beginPath();m.arc(2.5,2.5,2.5,p,0,false);m.lineTo(5,o.maxSize-2.5);m.arc(2.5,o.maxSize-2.5,2.5,0,p,false);m.closePath();m.fill()}}o.size=Math.max(Math.round(o.maxSize*o.maxSize/n),6);o.maxScroll=o.maxSize-o.size;o.toWrapperProp=o.maxScroll/(l-n);o.bar.style[o.dir=="horizontal"?"width":"height"]=o.size+"px"},setPosition:function(m){var l=this;if(l.wrapper.style.opacity!="1"){l.show()}m=Math.round(l.toWrapperProp*m);if(m<0){m=l.shrink?m+m*3:0;if(l.size+m<7){m=-l.size+6}}else{if(m>l.maxScroll){m=l.shrink?m+(m-l.maxScroll)*3:l.maxScroll;if(l.size+l.maxScroll-m<7){m=l.size+l.maxScroll-6}}}m=l.dir=="horizontal"?h+m+"px,0"+b:h+"0,"+m+"px"+b;l.bar.style.webkitTransform=m},show:function(){if(d){this.wrapper.style.webkitTransitionDelay="0"}this.wrapper.style.opacity="1"},hide:function(){if(d){this.wrapper.style.webkitTransitionDelay="350ms"}this.wrapper.style.opacity="0"},remove:function(){this.wrapper.parentNode.removeChild(this.wrapper);return null}};var d=("WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix()),g=(/iphone|ipad/gi).test(navigator.appVersion),a=("ontouchstart" in window),f=a?"touchstart":"mousedown",i=a?"touchmove":"mousemove",e=a?"touchend":"mouseup",h="translate"+(d?"3d(":"("),b=d?",0)":")",c=0;window.iScroll=j})();


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);



/*! Copyright (c) 2012 Slava Balasanov (http://balasan.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 0.1.0
 * 
 */



;(function( $ ){

  var methods = {
      init : function( options ) { 
    var settings = $.extend( {
    
      selector: '.swipeSection',
      current: '',
      urls : null,
      easing: 'swing',
      callback : function(self, el, time){

        if(time == undefined)
          time = 600

        var scrollOffset = 0
        if(self.prop("tagName")!="BODY")
           scrollOffset = self.scrollTop()
        target = el.offset().top + scrollOffset
        self.stop().animate({scrollTop: target},time, settings.easing)

      }
    }, options);
    
    var regularScroll=false;
    var scrolling= false;
    var doCheck = false;
    var maxY = minY =0
    var checkTimeout=false;
    var lastY=0;
    
    var self=this;
    
    this.data('current', settings.current)
    
    return this.each(function(){
    
      var $this = $(this)
      
      settings.current=$this.data('current')

      if(settings.current==""){

        var closest = null;
        var closestId

        settings.current = $this.children(settings.selector + ":first");        

        $(window).scroll(function(){

          $(window).unbind('scroll')

          $this.find(settings.selector).each(function(){

            if(closest ==null || Math.abs($this.scrollTop() - $(this).position().top) < closest){
              closest = Math.abs($this.scrollTop() - $(this).position().top)
              settings.current = $(this);
            }
          })

          
          settings.callback($this, settings.current, 300)
          //target = settings.current.offset().top// + self.scrollTop()
          //self.stop().animate({scrollTop: target},600, settings.easing)

          //$this.scrollTo(settings.current, 300)

        })
      }

      var okToSwipe = true;
      var touchStartX;
      var touchStartY;
      var deltaX;
      var deltaY;

      // document.addEventListener('touchmove', function(e){ e.preventDefault(); });

      // var totalH = 0;
      // $(settings.selector).css({'minHeight': $(window).height()}).each(function(){

      //   totalH += $(this).height()

      // })
      // $(this).css({'height': totalH})


      // var myScroll = new iScroll($(this).attr('id'), {snap:true});



      // TOUCH EVENTS
      $this.bind('touchstart', function(touch){
        touchStartX = touch.originalEvent.targetTouches[0].pageX
        touchStartY = touch.originalEvent.targetTouches[0].pageY
      })


      // var checkInertia = function(){

      //     console.log('scrolling')

      //     var wh = $(window).height()
      //     var ret=false;
      //     var rettop=false;

      //     if(!$(settings.current).height()>wh)
      //       regularScroll = false;

      //     var scrollOffset = $('body').scrollTop()-$(settings.current).offset().top 

      //     console.log(scrollOffset)

      //     if(regularScroll && scrollOffset + wh > $(settings.current)[0].scrollHeight){
      //         ret=true
      //         // $this.css({'webkitOverflowScrolling':'auto'})

      //     }
      //     else if (regularScroll && scrollOffset < 0){
      //         rettop=true;
      //         // $this.css({'webkitOverflowScrolling':'auto'})
      //     }
      //     // else
      //         // $this.css({'webkitOverflowScrolling':'touch'})
      

      //     if(ret && regularScroll){
          
      //       dist = -scrollOffset + settings.current[0].scrollHeight - wh
            
      //       var target = $this.scrollTop() - Math.abs(dist)
      //       $this.stop().animate({scrollTop : target}, 300)
      //       regularScroll=false;

      //     }
      //     if(rettop && regularScroll){
      //       // $this.stop().scrollTo(settings.current, 300)
      //       settings.callback($this,settings.current, 300)
      //       regularScroll=false;
      //     }  

      //     if(regularScroll)
      //       setTimeout(checkInertia, 300)
      // }

      
      $this.bind('touchmove', function(touch){

        deltaX = touchStartX - touch.originalEvent.targetTouches[0].pageX;
        deltaY = touchStartY - touch.originalEvent.targetTouches[0].pageY;
        
        var wh = $(window).height()
        var ret=false;
        var rettop=false;

        var scrollOffset
        if($(settings.current).css('overflow') == 'auto' || $(settings.current).css('overflow') == 'scroll')
          scrollOffset = $(settings.current).scrollTop()
        else {        
          scrollOffset = $('body').scrollTop()-$(settings.current).offset().top 

          if(regularScroll && deltaY>20 && scrollOffset + wh > $(settings.current)[0].scrollHeight){
              ret=true
          }
          else if (regularScroll && deltaY<-20 && scrollOffset < 0){
              rettop=true;
          }
        }


        if(!okToSwipe){
          touch.preventDefault()
          return;
        }
        
        regularScroll = true;
        if(deltaY>20){
          if( scrollOffset + wh >= settings.current[0].scrollHeight){

            if(settings.current.next(settings.selector)[0]!=undefined){
              scrolling=true;

              settings.current = $(settings.current).next(settings.selector)
              if(settings.urls!=null && settings.urls[settings.current.attr('id')]!=undefined)
                  History.pushState(null, null, settings.urls[settings.current.attr('id')]);
              settings.callback($this, settings.current) 
              rettop=false;
              ret=false;  
              regularScroll=false;
 
            }
          }
          else
            if(!$(settings.current).height()>wh)
              regularScroll=true;
        }
        if(deltaY<20){
          if(scrollOffset <= 0){
            if(settings.current.prev(settings.selector)[0]!=undefined){
              scrolling=true;

              settings.current = $(settings.current).prev(settings.selector)
              if(settings.urls!=null && settings.urls[settings.current.attr('id')]!=undefined)
                History.pushState(null, null, settings.urls[settings.current.attr('id')]);
              settings.callback($this, settings.current)      
              rettop=false;
              ret=false; 
              regularScroll=false;

            }
          }
          else
            if(!$(settings.current).height()>wh)
              regularScroll=true;
        }


        if(!regularScroll)
          touch.preventDefault()
        // else 
          // checkInertia()

        if(ret && regularScroll){
        
          dist = -scrollOffset + settings.current[0].scrollHeight - wh
          
          var target = $this.scrollTop() - Math.abs(dist)
          $this.stop().animate({scrollTop : target}, 300)
          regularScroll=false;

        }
        if(rettop && regularScroll){
          // $this.stop().scrollTo(settings.current, 300)
          settings.callback($this,settings.current, 300)
          regularScroll=false;
        }
       
      
      })
      
      $this.bind('touchend', function(touch){
        okToSwipe = true;
      })
      



      //BROWSER

      $this.mousewheel(function(event, delta, deltaX, deltaY){
        
        if($(window).scrollTop() == 0)
          $(window).unbind('scroll')

        wh = $(window).height()
        var ret=false;
        var rettop=false;

        var scrollOffset
        if($(settings.current).css('overflow') == 'auto' || $(settings.current).css('overflow') == 'scroll')
          scrollOffset = $(settings.current).scrollTop()
        else {        
          scrollOffset = $('body').scrollTop()-$(settings.current).offset().top 



          if(regularScroll && deltaY<0 && scrollOffset + wh > $(settings.current)[0].scrollHeight){
              ret=true
          }
          else if (regularScroll && deltaY>0 && scrollOffset < 0){
              rettop=true;
          }
        }
        if(doCheck){
          if( Math.abs(lastY)+.4<Math.abs(deltaY) || (lastY<0 && deltaY>0) || (lastY>0 && deltaY<0) ){
            
            scrolling=false;
            doCheck = false;
            maxY = minY = 0;
            regularScroll=false;
  
             if(settings.current[0].scrollHeight>wh)
              regularScroll=true;
          }         
        }
        
        lastY = deltaY;

        if(!scrolling){
          if(deltaY<0){
            if( scrollOffset + wh >= settings.current[0].scrollHeight){

              if(settings.current.next(settings.selector)[0]!=undefined){
                scrolling=true;

                settings.current = $(settings.current).next(settings.selector)
                if(settings.urls!=null && settings.urls[settings.current.attr('id')]!=undefined)
                    History.pushState(null, null, settings.urls[settings.current.attr('id')]);
                settings.callback($this, settings.current) 
                rettop=false;
                ret=false;  
                regularScroll=false;
   
              }
            }
            else
              regularScroll=true;
          }
          if(deltaY>0){
            if(scrollOffset <= 0){
              if(settings.current.prev(settings.selector)[0]!=undefined){
                scrolling=true;

                settings.current = $(settings.current).prev(settings.selector)
                if(settings.urls!=null && settings.urls[settings.current.attr('id')]!=undefined)
                  History.pushState(null, null, settings.urls[settings.current.attr('id')]);
                settings.callback($this, settings.current)      
                rettop=false;
                ret=false; 
                regularScroll=false;

              }
            }
            else
              regularScroll=true;
  
          }
  

          clearTimeout(checkTimeout);
    
          checkTimeout = setTimeout(function(){
            
            doCheck = true;
            
          }, 700)
    
          }
          scrolling=true;
          


          clearTimeout($.data($this, 'timer'));
          
          $.data($this, 'timer', setTimeout(function() {
            scrolling=false;
            doCheck = false;
            maxY = minY = 0;
            regularScroll=false;
    
            if(settings.current[0].scrollHeight>wh)
              regularScroll=true;
            
          }, 250));

            if(ret && regularScroll){
            
              dist = -scrollOffset + settings.current[0].scrollHeight - wh
              
              var target = $this.scrollTop() - Math.abs(dist)
              $this.stop().animate({scrollTop : target}, 300)
              regularScroll=false;

            }
            if(rettop && regularScroll){
              // $this.stop().scrollTo(settings.current, 300)
              settings.callback($this,settings.current, 300)
              regularScroll=false;
            }
          
          if(scrolling && !regularScroll){
            event.preventDefault();

          }
        })
      })
      },
      current : function(page) {

        this.data('current',page)     
        
      }
  };
  
   $.fn.swipeScroll = function( method ) {
      
      // Method calling logic
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
      } 
    
   }
      
})( jQuery );

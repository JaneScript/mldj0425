// Create scrolling variable if it doesn't exist
if (!Scrolling) var Scrolling = {};

//Scrollbar constructor
Scrolling.Scrollbar = function (o, s, t) {
	//private variables
	var self = this;
	var _components = {};
	var _dimensions = {};
	var _temporary  = {};
	var _hasTween   = t ? true : false;
	var _timer, _ratio;
	
	//public variables
	this.onMouseDown   = function (){};
	this.onMouseUp     = function (){};
	this.onScroll      = function (){};
	this.scrollAmount  = 5;
	this.scrollSpeed   = 30;
	this.disabled      = false;
	
	//private functions
	function initialize () {
		var c = _components;
		var d = _dimensions;
		var g = s.getDimensions();
		
		c.up     = findComponent("Scrollbar-Up", o);
		c.down   = findComponent("Scrollbar-Down", o);
		c.track  = findComponent("Scrollbar-Track", o);
		c.handle = findComponent("Scrollbar-Handle", c.track);
		
		d.trackTop     = findOffsetTop(c.track);
		d.trackHeight  = c.track.offsetHeight;
		d.handleHeight = c.handle.offsetHeight;
		d.x = 0;
		d.y = 0
		
		if (_hasTween) t.apply(self);
		
		addEvent(s.getContent(), "mousewheel", scrollbarWheel);
		addEvent(o, "mousedown", scrollbarClickPrimer);
		
		self.reset();
	};
	
	function findOffsetTop (o) {
		var t = 0;
		if (o.offsetParent) {
			while (o.offsetParent) {
				t += o.offsetTop;
				o  = o.offsetParent;
			}
		}
		return t;
	};
	
	function addEvent (o, t, f) {
		if (o.attachEvent) o.attachEvent('on'+ t, f);
		else o.addEventListener(t, f, false);
	};
	
	function removeEvent (o, t, f) {
		if (o.detachEvent) o.detachEvent('on'+ t, f);
		else o.removeEventListener(t, f, false);
	};
	
	function findComponent (c, o) {
		var kids = o.childNodes;
		for (var i = 0; i < kids.length; i++) {
			if (kids[i].className && kids[i].className.indexOf(c) >= 0) {
				return kids[i];
			}
		}
	};
	
	function scroll (y) {
		if (y < 0) y = 0;
		if (y > _dimensions.trackHeight - _dimensions.handleHeight)
			y = _dimensions.trackHeight - _dimensions.handleHeight;

		_components.handle.style.top = y +"px";
		_dimensions.y = y;
		
		s.scrollTo(0, Math.round(_dimensions.y * _ratio));
		self.onScroll();
	};
	
	function scrollbarClickPrimer (e) {
		if (self.disabled) return false;
		
		e = e?e:event;
		if (!e.target) e.target = e.srcElement;
		
		scrollbarClick(e.target.className, e);
	};
	
	function scrollbarClick (c, e) {
		var d  = _dimensions;
		var t  = _temporary;
		var cy = e.clientY + document.body.scrollTop;
		
		if (c.indexOf("Scrollbar-Up") >= 0)
			startScroll(-self.scrollAmount);
		
		if (c.indexOf("Scrollbar-Down") >= 0) 
			startScroll(self.scrollAmount);
			
		if (c.indexOf("Scrollbar-Track") >= 0)
			if (_hasTween) self.tweenTo((cy - d.trackTop - d.handleHeight / 2) * _ratio);
			else scroll(cy - d.trackTop - d.handleHeight / 2);	
		
		if (c.indexOf("Scrollbar-Handle") >= 0) {
			t.grabPoint = cy - findOffsetTop(_components.handle);
			addEvent(document, "mousemove", scrollbarDrag, false);	
		}
		
		t.target = e.target;
		t.select = document.onselectstart;
		
		document.onselectstart = function (){ return false; };
		self.onMouseDown(e.target, c, e);
		
		addEvent(document, "mouseup", stopScroll);
	};
	
	function scrollbarDrag (e) {
		e = e?e:event;
		var d = _dimensions;
		var t = parseInt(_components.handle.style.top);
		var v = e.clientY + document.body.scrollTop - d.trackTop;
		
		if (v >= d.trackHeight - d.handleHeight + _temporary.grabPoint)
			v = d.trackHeight - d.handleHeight;
			
		else if (v <= _temporary.grabPoint)
			v = 0;
			
		else v = v - _temporary.grabPoint;
			
		scroll(v);
	};
	
	function scrollbarWheel (e) {
		if (self.disabled) return false;
		
		e = e ? e : event;
		var dir = 0;
		if (e.wheelDelta >= 120) dir = -1;
		if (e.wheelDelta <= -120) dir = 1;

		self.scrollBy(dir * 20);
		e.returnValue = false;
	};
	
	function startScroll (y) {
		_temporary.disty = y;
		_timer = window.setInterval(function () {
			self.scrollBy(_temporary.disty);
		}, self.scrollSpeed);
	};
	
	function stopScroll (e) {
		e = e?e:event;
		
		removeEvent(document, "mousemove", scrollbarDrag);
		removeEvent(document, "mouseup", stopScroll);
		
		document.onselectstart = _temporary.select;
		if (_timer) window.clearInterval(_timer);
		
		self.onMouseUp(_temporary.target, _temporary.target.className, e);
	};
	
	//public functions
	this.reset = function () {
		var d = _dimensions;
		var c = _components;
		var g = s.getDimensions();
		
		_ratio = (g.theight - g.vheight) / (d.trackHeight - d.handleHeight);
		
		c.handle.ondragstart = function (){ return false; };
		c.handle.onmousedown = function (){ return false; };
		c.handle.style.top   = "0px";
		d.y = 0;
		
		s.reset();
		scroll(0);
		
		if (g.theight < g.vheight) {
			this.disabled = true;
			o.className  += " Scrollbar-Disabled";
		}
	};
	
	this.scrollTo = function (y) {
		scroll(y / _ratio);
	};
	
	this.scrollBy = function (y) {
		scroll((s.getDimensions().y + y) / _ratio);
	};
	
	this.swapContent = function (n, w, h) {
		o = n;
		s.swapContent(o, w, h);
		initialize();
	};
	
	this.disable = function () {
		this.disabled = true;
		o.className  += "Scrollbar-Disabled";
	};
	
	this.enable = function () {
		this.disabled = false;
		o.className = o.className.replace(/Scrollbar\-Disabled/, "");
	};
	
	this.getContent = function () {
		return s.getContent();
	};
	
	this.getComponents = function () {
		return _components;
	};
	
	this.getDimensions = function () {
		var d = s.getDimensions();
		d.trackHeight  = _dimensions.trackHeight;
		d.handleHeight = _dimensions.handleHeight;
		
		return d;
	};
	
	initialize();
};
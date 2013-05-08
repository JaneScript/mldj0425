// Create scrolling variable if it doesn't exist
if (!Scrolling) var Scrolling = {};

//ScrollTween constructor
Scrolling.ScrollTween = function () {
	//private variables
	var self    = this;
	var _steps  = [0,25,50,70,85,95,97,99,100];
	var _values = [];
	var _idle   = true;
	var o, _inc, _timer;
	
	//private functions
	function tweenTo (y) {
		if (!_idle) return false;
		
		var d = o.getDimensions();
		if (y < 0) y = 0;
		if (y > d.theight - d.vheight)
			y = d.theight - d.vheight;
			
		var dist = y - d.y;
		_inc     = 0;
		_timer   = null;
		_values  = [];
		_idle    = false;
		
		for (var i = 0; i < _steps.length; i++) {
			_values[i] = Math.round(d.y + dist * (_steps[i] / 100));
		}

		_timer = window.setInterval(function () {
			o.scrollTo(_values[_inc]); 
			if (_inc == _steps.length - 1) {
				window.clearInterval(_timer);
				_idle = true;
			} else _inc++;
		}, o.stepSpeed);
	};
	
	function tweenBy (y) {
		o.tweenTo(o.getDimensions().y + y);
	};
	
	function setSteps (s) {
		_steps = s;
	};
	
	//public functions
	this.apply = function (p) {
		o = p;
		o.tweenTo   = tweenTo;
		o.tweenBy   = tweenBy;
		o.setSteps  = setSteps;
		o.stepSpeed = 30;
	};
};
/*
 * Absolutely Positioned Sprites
 *
 * Should in theory be portable to any semi-modern browser but I've
 * only tested Firefox 2, Safari, and IE6.
 *
 * TODO:
 *	Fade is broken in Opera
 *	Test IE6, IE7, FF2, FF3, Safari, Opera, NS4, NS4, IE4, IE5
 *	Z level/order
 */
function getElement(name) {
	var ret;

	if (document.getElementById)
		ret = document.getElementById(name);
	else if (document.all)
		ret = document.all[name];
	else if (document.layers)
		ret = document.layers[name];
	else
		ret = null;
	if (ret == null)
		alert(name);
	return ret;
}


function Sprite(name) {
	this.element = getElement(name);

	// Member Functions
	this.setImage = SpriteSetImage;
	this.Move = SpriteMove;
	this.Resize = SpriteResize;
	this.Fade = SpriteFade;
	this.getFade = SpriteGetFade;
	this.getWidth = SpriteGetWidth;
	this.getHeight = SpriteGetHeight;
	this.getX = SpriteGetX;
	this.getY = SpriteGetY;
}

function SpriteSetImage (image) {
	var element = this.element;

	if (!element || !image)
		return;

	// TODO: This is likely a problem for older browsers
	if (element.firstChild.src)
		element.firstChild.src = image;
	else if (element.childNodes[1].src)
		element.childNodes[1].src = image;
}

function SpriteMove(x, y) {
	var element = this.element;

	if (!element)
		return;

	if (element.style) {
		element.style.left = x + "px";
		element.style.top = y + "px";
	} else {
		element.left = x;
		element.top = y;
	}
}

function SpriteResize(width, height) {
	var element = this.element;

	if (!element)
		return;

	if (element.style) {
		element.style.width = width + "px";
		element.style.height = height + "px";
	} else {
		element.width = width;
		element.height = height;
	}
}

function SpriteFade (opacity)
{
	var element = this.element;

	if (!element)
		return;

	if (opacity < 1) {
		if (element.style)
			element.style.visibility = "hidden";
		else
			element.visibility = "hidden";
	} else {
		if (element.style)
			element.style.visibility = "visible";
		else
			element.visibility = "visible";
	}

	// TODO: Clean-up and make correct for all browsers.
	// TODO: Is killing Opera
	var ie5  = (document.all && document.getElementById);
	var ns6 = (!document.all && document.getElementById);

	if(ie5) element.filters.alpha.opacity = opacity;
	if(ns6) element.style.MozOpacity = opacity/100;
	element.style.opacity = opacity/100;
}

function SpriteGetFade ()
{
	var element = this.element;

	if (!element)
		return 0;

	// TODO: Clean-up and make correct for all browsers.
	// TODO: Is killing Opera
	var ie5 = (document.all && document.getElementById);
	var ns6 = (!document.all && document.getElementById);

	if (ie5) return element.filters.alpha.opacity;
	if (ns6) return element.style.MozOpacity * 100;
	return element.style.opacity;
}

function SpriteGetWidth () {
	var element = this.element;

	if (!element)
		return;

	if (element.style) {
		return element.style.width.match("^[0-9]+");
	} else {
		return element.width;
	}

	return 0;
}

function SpriteGetHeight() {
	var element = this.element;

	if (!element)
		return;

	if (element.style) {
		return element.style.height.match("^[0-9]+");
	} else {
		return element.height;
	}

	return 0;
}

function SpriteGetX() {
	var element = this.element;

	if (!element)
		return;

	if (element.style) {
		return element.style.left.match("^[0-9]+");
	} else {
		return element.left;
	}

	return 0;
}

/*
 * NS4 can only report link positions
 * IE requires page to be loaded before properly reporting
 * Safari <1.3 adds 8-pixel body margin to fixed elements

function SpriteGetPos_Hack () {
	var element = this.element;

	if (!element)
		return;

	if (element.offsetParent) {
		var x, y, e = element;
		for (x = 0, y = 0; e; e = e.offsetParent) {
			x += e.offsetLeft;
			y += e.offsetRight;
		}
		return [ x, y ];
	} else {
		return [ element.x, element.y ];
	}
}
 */

function SpriteGetY() {
	var element = this.element;

	if (!element)
		return;

	if (element.style) {
		return element.style.top.match("^[0-9]+");
	} else {
		return element.top;
	}

	return 0;
}

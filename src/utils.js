function throttle(func, wait) {
	var context, args;
	var timeout = null;
	var previous = 0;
	var later = function () {
		previous = Date.now();
		timeout = null;
		func.apply(context, args);
	};

	return function () {
		var now = Date.now();
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;

		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}

		if (remaining <= 0) {
			previous = now;
			func.apply(context, args);
		} else {
			timeout = setTimeout(later, remaining);
		}
	};
}

 function getScrollTarget (el) {
	return el.closest('.scroll,.scroll-y,.overflow-auto') || window
  }
  
 function getScrollHeight (el) {
	return (el === window ? document.body : el).scrollHeight
  }
  
   function getScrollWidth (el) {
	return (el === window ? document.body : el).scrollWidth
  }
  
 function getScrollPosition (scrollTarget) {
	if (scrollTarget === window) {
	  return window.pageYOffset || window.scrollY || document.body.scrollTop || 0
	}
	return scrollTarget.scrollTop
  }
  
   function getHorizontalScrollPosition (scrollTarget) {
	if (scrollTarget === window) {
	  return window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
	}
	return scrollTarget.scrollLeft
  }

export function animScrollTo(el, to, duration) {
	const pos = getScrollPosition(el)

	if (duration <= 0) {
		if (pos !== to) {
			setScroll(el, to)
		}
		return
	}

	requestAnimationFrame(() => {
		const newPos = pos + (to - pos) / Math.max(16, duration) * 16
		setScroll(el, newPos)
		if (newPos !== to) {
			animScrollTo(el, to, duration - 16)
		}
	})
}

function animHorizontalScrollTo(el, to, duration) {
	const pos = getHorizontalScrollPosition(el)

	if (duration <= 0) {
		if (pos !== to) {
			setHorizontalScroll(el, to)
		}
		return
	}

	requestAnimationFrame(() => {
		const newPos = pos + (to - pos) / Math.max(16, duration) * 16
		setHorizontalScroll(el, newPos)
		if (newPos !== to) {
			animHorizontalScrollTo(el, to, duration - 16)
		}
	})
}

function setScroll(scrollTarget, offset) {
	if (scrollTarget === window) {
		window.scrollTo(0, offset)
		return
	}
	scrollTarget.scrollTop = offset
}

function setHorizontalScroll(scrollTarget, offset) {
	if (scrollTarget === window) {
		window.scrollTo(offset, 0)
		return
	}
	scrollTarget.scrollLeft = offset
}

function setScrollPosition(scrollTarget, offset, duration) {
	if (duration) {
		animScrollTo(scrollTarget, offset, duration)
		return
	}
	setScroll(scrollTarget, offset)
}

function setHorizontalScrollPosition(scrollTarget, offset, duration) {
	if (duration) {
		animHorizontalScrollTo(scrollTarget, offset, duration)
		return
	}
	setHorizontalScroll(scrollTarget, offset)
}

export {
	setHorizontalScrollPosition,
	setScrollPosition,
	animHorizontalScrollTo,
	throttle
};
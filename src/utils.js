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

function format(input) {
	if (typeof input === 'number') {
		input = input.toFixed(fixed(2))
	}

	var negative = input.indexOf('-') >= 0 ? '-' : ''

	var numbers = onlyNumbers(input)
	var currency = numbersToCurrency(numbers, 2)
	var parts = toStr(currency).split('.')
	var integer = parts[0]
	var decimal = parts[1]
	integer = addThousandSeparator(integer, '.')
	return negative + joinIntegerAndDecimal(integer, decimal, ',');
}

function unformat(input, precision) {
	var negative = input.indexOf('-') >= 0 ? -1 : 1
	var numbers = onlyNumbers(input)
	var currency = numbersToCurrency(numbers, precision)
	return parseFloat(currency) * negative
}

function onlyNumbers(input) {
	return toStr(input).replace(/\D+/g, '') || '0'
}

function fixed(precision) {
	return between(0, precision, 20)
}

function between(min, n, max) {
	return Math.max(min, Math.min(n, max))
}

function numbersToCurrency(numbers, precision) {
	var exp = Math.pow(10, precision)
	var float = parseFloat(numbers) / exp
	return float.toFixed(fixed(precision))
}

function addThousandSeparator(integer, separator) {
	return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

function currencyToIntegerAndDecimal(float) {
	return toStr(float).split('.')
}

function joinIntegerAndDecimal(integer, decimal, separator) {
	return decimal ? integer + separator + decimal : integer
}

function toStr(value) {
	return value ? value.toString() : ''
}

function setCursor(el, position) {
	let setSelectionRange = function () {
		el.setSelectionRange(position, position)
	}

	if (el === document.activeElement) {
		setSelectionRange()
		setTimeout(setSelectionRange, 1) // Android Fix
	}
}

function select(el, start, end) {
	let setSelectionRange = function () {
		el.setSelectionRange(start, end)
	}

	if (el === document.activeElement) {
		setSelectionRange()
		setTimeout(setSelectionRange, 1) // Android Fix
	}
}


function event(name) {
	var evt = document.createEvent('Event')
	evt.initEvent(name, true, true)
	return evt
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
	throttle,
	format,
	unformat,
	setCursor,
	event,
	between,
	select
};
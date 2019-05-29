
import {format, setCursor, event, defaults, select} from './utils'

function install (Vue) {
   function VMoney(el, opt) {
     opt = {
      ... defaults,
       ...opt
     };

    if (el.tagName !== 'INPUT') {
      var els = el.getElementsByTagName('INPUT');

      if (els.length !== 1) {
           throw new Error("v-money requires 1 input, found " + els.length)
      } else {
        el = els[0]
      }
    }
  
    el.oninput = function () {
      var positionFromEnd = el.value.length - el.selectionEnd
      el.value = format(el.value)
      positionFromEnd = Math.max(positionFromEnd, opt.suffix.length)
      positionFromEnd = el.value.length - positionFromEnd
      positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1)
      setCursor(el, positionFromEnd)
      el.dispatchEvent(event('change'))
    }
  
    
    el.onfocus = function () {
      select(el, 0, el.value.length)
    }
  
    el.oninput()
    el.dispatchEvent(event('input'))
  }

  Vue.directive('money', VMoney)
}

export default install


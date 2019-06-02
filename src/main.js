import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import Notifications from './plugins/Notifications';
import Forms from './plugins/Forms';

import "normalize.css";
import './app.css';
import './date-utils.js';

import Button from "./components/Button.vue";
import Popover from "./components/Popover.vue";
import DatePicker from "./components/DatePicker.vue";
import DateInput from "./components/DateInput.vue";
import DateRangeInput from "./components/DateRangeInput.vue";
import Suggest from "./components/Suggest.vue";
import Dropdown from "./components/Dropdown.vue";
import TextInput from "./components/TextInput.vue";
import Tabs from "./components/Tabs.vue";
import DataTable from "./components/DataTable.vue";
import SlideTransition from "./components/SlideTransition.vue";
import CollapsibleList from "./components/CollapsibleList.vue";
import MultipleSuggest from "./components/MultipleSuggest.vue";
import ResizeDirective from "./ResizeDirective.js";
import Overlay from "./components/Overlay.vue"
import Checkbox from "./components/Checkbox.vue"
import Radio from "./components/Radio.vue"
import TagInput from "./components/TagInput.vue";
import InputTable from "./components/InputTable.vue"
import Spinner from './components/Spinner.vue';
import EditableText from './components/EditableText.vue';
import EditableTextArea from './components/EditableTextArea.vue';
import FilterBuilder from './components/FilterBuilder.vue';

Vue.component('Overlay', Overlay);
Vue.component('Button', Button);
Vue.component('Popover', Popover);
Vue.component('DatePicker', DatePicker);
Vue.component('DateInput', DateInput);
Vue.component('DateRangeInput', DateRangeInput);
Vue.component('Suggest', Suggest);
Vue.component('MultipleSuggest', MultipleSuggest);
Vue.component('Dropdown', Dropdown);
Vue.component('TextInput', TextInput);
Vue.component('Tabs', Tabs);
Vue.component('DataTable', DataTable);
Vue.component('SlideTransition', SlideTransition);
Vue.component('CollapsibleList', CollapsibleList);
Vue.component('Checkbox', Checkbox);
Vue.component('Radio', Radio);
Vue.component('TagInput', TagInput);
Vue.component('InputTable', InputTable);
Vue.component('Spinner', Spinner);
Vue.component('EditableText', EditableText);
Vue.component('EditableTextArea', EditableTextArea);
Vue.component('FilterBuilder', FilterBuilder);


Vue.directive('resize', ResizeDirective);

Vue.use(VueTheMask);
Vue.use(Notifications);
Vue.use(Forms);

Vue.config.productionTip = false

import './registerServiceWorker'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

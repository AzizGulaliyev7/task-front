import Vue from 'vue'
/**
 * Element UI
 */
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{locale});
/**
 * end element ui
 */

/**
 * For alert
 */
 import { notify } from './index'
 Vue.prototype.$alert = notify;